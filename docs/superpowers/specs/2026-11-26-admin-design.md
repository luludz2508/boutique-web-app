# Trang quản trị /admin — Thiết kế

Ngày: 2026-11-26

## Mục đích

Gia đình tự quản lý dữ liệu sản phẩm trên web mới mà không phải nhờ người viết code. Web mới là nơi **sửa dữ liệu chính**; Haravan chỉ là nguồn nhập (giai đoạn 2 đồng bộ không được ghi đè những gì đã sửa ở đây).

Việc làm thường xuyên nhất, theo thứ tự: **sửa giá và tồn kho** → thêm sản phẩm → cập nhật ảnh → sửa mô tả. Bài viết (posts) là dự án riêng, làm sau.

Người dùng: 1–3 người trong gia đình, quen điện thoại hơn máy tính, nên **mọi màn hình phải dùng tốt trên điện thoại**.

## Hiện trạng (2026-11-26)

- Supabase project `tramhuong-sonhong`: 192 sản phẩm (đều `published`), 328 biến thể (đều `track_inventory = true`), 689 ảnh — **đã nằm trong Storage** bucket public `product-images` (giai đoạn sao lưu ảnh đã xong).
- Bảng: `products`, `product_variants`, `product_images`, `categories` (chưa dùng), `product_attributes`, `product_certificates` (chưa dùng). Trigger `updated_at` có sẵn.
- `product_type` là chuỗi tự do lấy từ Haravan; có loại gần trùng ("Trầm hương xông đốt" / "Trầm hương đốt").
- Web đọc bằng anon key (`lib/supabase.ts`). Migration trong repo **không có RLS policy nào**; trạng thái RLS trên Supabase chưa kiểm tra được từ code → xem "Bảo mật".
- Chưa có đăng nhập. `.env.local` có `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Mục tiêu

1. Đăng nhập bằng email, chỉ email trong danh sách cho phép mới vào được.
2. Danh sách sản phẩm: tìm, lọc theo loại / trạng thái, **sửa giá và tồn kho ngay trên dòng** (không mở form).
3. Thêm / sửa sản phẩm: tên, loại, mô tả ngắn, mô tả chi tiết (có định dạng), bảng thông số, biến thể, ảnh.
4. Ảnh: tải lên từ điện thoại/máy tính, tự nén, kéo để đổi thứ tự, ảnh đầu tiên là ảnh chính.
5. Ẩn / hiện sản phẩm; **lưu trữ thay vì xoá**.
6. Lưu xong là site cập nhật ngay (không chờ deploy).
7. Quản lý loại sản phẩm: đổi tên, gộp hai loại.

## Không làm (lần này)

- Bài viết, trang tĩnh, nội dung trang chủ.
- Đơn hàng, khách hàng, giỏ hàng.
- Tiếng Anh (`*_en`), bảng `categories`, `product_attributes`, `product_certificates`.
- Phân quyền nhiều cấp (mọi admin có cùng quyền).
- Đồng bộ Haravan (giai đoạn 2, nhưng thiết kế ở đây chừa chỗ cho nó).

## Điều không được xảy ra

- Người ngoài sửa được dữ liệu — kể cả bằng anon key lộ trong trình duyệt.
- Mất sản phẩm vì bấm nhầm (không có nút xoá vĩnh viễn trong admin).
- HTML độc trong mô tả chạy trên trang khách.
- Service role key xuất hiện trong bundle trình duyệt, log hay commit.
- Hai người sửa cùng sản phẩm và một người âm thầm ghi đè người kia.

## Các cách đã cân nhắc

| Cách | Ưu | Nhược |
|---|---|---|
| **A. /admin trong chính app Next.js** (đã chọn) | Một codebase, dùng lại kiểu dữ liệu và helper hiện có, revalidate trang ngay khi lưu, cùng deploy Vercel | Phải tự làm form và upload |
| B. Dùng Supabase Dashboard để sửa bảng | Không phải code | Giao diện bảng thô, dễ sửa nhầm, không nén ảnh, không dùng được trên điện thoại |
| C. CMS headless (Sanity, Payload…) | Có sẵn editor | Thêm một hệ thống và nguồn dữ liệu thứ hai, phải đồng bộ với Supabase |

Gia đình đã chọn A.

## Thiết kế

### Đăng nhập

- Supabase Auth, **mã đăng nhập gửi qua email (OTP 6 số)** — không mật khẩu để quên. Trang `/admin/login`: nhập email → nhập mã.
- Biến môi trường `ADMIN_EMAILS` (danh sách email, phân cách bằng dấu phẩy), chỉ nằm trong `.env.local` và Vercel env — **không** trong code hay commit.
- Email không có trong danh sách: không gửi mã (trả lời chung chung "Nếu email hợp lệ, mã đã được gửi" để không lộ danh sách).
- Phiên lưu bằng cookie qua `@supabase/ssr`. `middleware.ts` chặn mọi đường dẫn `/admin/*` (trừ `/admin/login`) khi chưa đăng nhập hoặc email không trong danh sách.
- Phiên kéo dài 30 ngày trên thiết bị đã đăng nhập; có nút Đăng xuất.

### Bảo mật dữ liệu

- **Mọi thao tác ghi đi qua server** (Server Actions). Mỗi action tự kiểm tra lại phiên + email trong `ADMIN_EMAILS` (không tin vào middleware), rồi mới dùng service-role client.
- Migration mới bật RLS trên các bảng sản phẩm, idempotent:
  - anon: chỉ `SELECT` (sản phẩm `published`; biến thể/ảnh của sản phẩm `published`).
  - Không có policy ghi cho anon/authenticated → mọi ghi trực tiếp từ trình duyệt bị từ chối. Service role bỏ qua RLS.
- Trước khi chạy migration: kiểm tra trạng thái RLS hiện tại trên dashboard và ghi vào tài liệu triển khai.
- Bucket `product-images`: public đọc; upload chỉ bằng **signed upload URL** do server cấp cho admin đã xác thực.

### Màn hình

Phong cách giấy–mực như site nhưng tiết chế: nền giấy, chữ mực, một màu nhấn vàng, không hiệu ứng loang. Ưu tiên dày thông tin và dễ bấm.

**1. Danh sách sản phẩm `/admin`**
- Thanh trên: ô tìm (tên, SKU), lọc loại, lọc trạng thái (Đang bán / Ẩn / Lưu trữ), nút "+ Thêm sản phẩm".
- Mỗi sản phẩm một khối: ảnh nhỏ, tên, loại, trạng thái; bên dưới là **từng biến thể một dòng** với ô **Giá** và ô **Tồn kho** sửa trực tiếp.
- Sửa ô → tự lưu khi rời ô (hoặc Enter), hiện "Đã lưu" bên cạnh; lỗi thì ô viền đỏ + giữ giá trị đang gõ.
- Giá hiển thị có dấu chấm ngăn nghìn khi đọc, nhập số thô khi sửa. Giá 0 = "Liên hệ".
- Bấm tên → mở form sửa.
- Trên điện thoại: khối xếp dọc, ô nhập đủ lớn để bấm.

**2. Form sản phẩm `/admin/products/new`, `/admin/products/[id]`**

Các phần, từ trên xuống:

- **Thông tin**: Tên (bắt buộc), Loại (chọn loại có sẵn hoặc gõ loại mới), Trạng thái, Nổi bật (hiện ở trang chủ), Mô tả ngắn.
- **Đường dẫn (slug)**: tự sinh từ tên khi tạo mới (bỏ dấu, gạch nối, thêm `-2` nếu trùng); khi sửa thì giữ nguyên, chỉ đổi khi bấm "Đổi đường dẫn".
- **Ảnh**: lưới ảnh; kéo để đổi thứ tự (ảnh đầu = ảnh chính); nút xoá từng ảnh (chỉ gỡ khỏi sản phẩm, file vẫn còn trong Storage); vùng "Thêm ảnh" nhận nhiều file, chụp trực tiếp trên điện thoại.
- **Biến thể**: bảng — Tên phiên bản (ví dụ "8 li"), Giá, Giá gốc (tuỳ chọn), SKU, Tồn kho, Theo dõi tồn kho. Thêm/bớt dòng. Sản phẩm luôn có ít nhất 1 biến thể.
- **Thông số**: danh sách cặp Nhãn – Giá trị (Kích thước, Trọng lượng, Loại trầm…), thêm/bớt/kéo thứ tự.
- **Mô tả chi tiết**: trình soạn thảo đơn giản — đoạn văn, tiêu đề, đậm, nghiêng, danh sách, liên kết, chèn ảnh.
- Thanh dưới cố định: **Lưu** · Xem trên site · (khi sửa) Lưu trữ.

**3. Loại sản phẩm `/admin/types`**
- Bảng: tên loại, số sản phẩm. Đổi tên (đổi trên mọi sản phẩm thuộc loại đó). Gộp: chọn loại nguồn → loại đích.

### Thông số và mô tả — dữ liệu

- Hiện thông số nằm trong bảng HTML của mô tả Haravan; trang khách đang tách ra bằng `splitDescription`.
- Thêm cột `products.specs jsonb` (mảng `{label, value}`). Khi mở form sản phẩm cũ mà `specs` trống: điền sẵn từ `splitDescription(description_vi)` và phần mô tả còn lại vào trình soạn thảo. Lưu lần đầu sẽ ghi cả `specs` lẫn mô tả đã tách.
- Trang khách: dùng `specs` nếu có, ngược lại rơi về `splitDescription` như hiện tại.
- Mô tả lưu dạng HTML, **lọc bằng allowlist trên server** khi lưu (thẻ: p, h2, h3, strong, em, ul, ol, li, a[href], img[src, alt], br; bỏ mọi `style`, `on*`, `script`, `iframe`). `href`/`src` chỉ cho `http(s)`.

### Ảnh

- Trình duyệt nén trước khi tải: cạnh dài tối đa 2000px, WebP chất lượng ~0.82 (canvas). Ảnh > 20MB hoặc không phải ảnh → từ chối với thông báo rõ.
- Server action cấp signed upload URL cho `products/{product_id}/{uuid}.webp` → trình duyệt upload thẳng lên Storage (tránh giới hạn 4.5MB body của Vercel) → server action ghi dòng `product_images`.
- Thứ tự = `position`; `is_primary` = ảnh ở vị trí đầu (server đặt lại khi lưu thứ tự).
- Gỡ ảnh chỉ xoá dòng `product_images`; file trong Storage giữ lại (dọn sau nếu cần).

### Lưu, đồng thời và cập nhật site

- Mỗi lần lưu gửi kèm `updated_at` lúc mở form. Nếu trên DB đã mới hơn → không ghi, báo "Sản phẩm vừa được người khác sửa lúc …, tải lại để xem" (không âm thầm ghi đè). Ô sửa nhanh giá/tồn kho cũng kiểm tra theo `updated_at` của biến thể.
- Lưu form là một giao dịch: sản phẩm + biến thể (thêm/sửa/bớt) + thứ tự ảnh (dùng một hàm Postgres `admin_save_product(payload jsonb)` để tất cả cùng thành công hoặc cùng thất bại).
- Sau khi lưu: `revalidatePath` cho `/`, `/products`, `/products/[slug]` (cả slug cũ nếu đổi), `/collection`, `/gallery`, và layout (menu danh mục).
- Đổi slug: lưu slug cũ vào `product_slug_redirects(old_slug, product_id)`; trang `/products/[slug]` không tìm thấy thì tra bảng này và chuyển hướng 308.

### Không ghi đè khi đồng bộ Haravan (chừa cho giai đoạn 2)

- Thêm cột `products.admin_edited_at timestamptz` và `product_variants.admin_edited_at`. Admin lưu → đặt `now()`.
- Quy ước cho giai đoạn 2: bản ghi có `admin_edited_at` thì sync **chỉ thêm biến thể/ảnh mới**, không sửa trường đã có. Sản phẩm admin tạo (không có `haravan_product_id`) sync không đụng tới.

### Nhật ký thay đổi

- Bảng `admin_audit(id, at, email, action, product_id, changes jsonb)`. Mỗi action ghi một dòng (ví dụ: `price` 480000 → 520000).
- Lần này chỉ ghi, chưa có màn hình xem (xem bằng Supabase dashboard khi cần).

### Thay đổi database (một migration)

- `products`: thêm `specs jsonb`, `admin_edited_at timestamptz`.
- `product_variants`: thêm `admin_edited_at timestamptz`.
- Bảng mới `product_slug_redirects`, `admin_audit`.
- Hàm `admin_save_product(jsonb)` (security definer, chỉ service role được gọi).
- Bật RLS + policy đọc cho anon như mục "Bảo mật dữ liệu".

### Gói thư viện mới

- `@supabase/ssr` — phiên đăng nhập bằng cookie cho App Router.
- `sanitize-html` — lọc HTML mô tả trên server.
- Trình soạn thảo: `@tiptap/react` + starter-kit + link + image (chỉ tải trong trang admin).
- Kéo thả ảnh: `@dnd-kit/core` + `@dnd-kit/sortable`.

## Kiểm thử

- Unit (Vitest): sinh slug (dấu tiếng Việt, trùng), lọc HTML (giữ/bỏ đúng thẻ, chặn `javascript:`), chuẩn hoá giá nhập ("520.000", "520000", "" → 0), kiểm tra danh sách email admin (hoa/thường, khoảng trắng), tách thông số cho form.
- Kiểm tra trên trình duyệt (bản build): đăng nhập bằng email thử nghiệm trên localhost, sửa giá trên dòng, tạo sản phẩm có ảnh, đổi thứ tự ảnh, lưu trữ, xung đột hai tab, trang khách cập nhật sau khi lưu; trên điện thoại 375px.
- Bảo mật: gọi ghi bằng anon key trực tiếp lên REST phải bị từ chối sau migration; server action gọi khi chưa đăng nhập phải trả lỗi.

## Quyết định khi soát thiết kế (mình tự chốt, gia đình xem lại)

- **Biến thể = một tuỳ chọn.** Cả 328 biến thể hiện có chỉ dùng `option1`. Form chỉ có cột "Tên phiên bản" ↔ `option1_value`; giữ nguyên `option1_name` cũ, sản phẩm mới đặt `option1_name = 'Phiên bản'`. `option2/3` không hiện, không xoá.
- **Trạng thái:** "Đang bán" = `published`, "Ẩn" = `draft`, "Lưu trữ" = `archived`. Trang khách chỉ đọc `published` (đã đúng: `getProductBySlug` lọc `status = published`). Sản phẩm lưu trữ khôi phục được bằng cách đổi trạng thái.
- **Email đăng nhập:** Supabase phải gửi được mã 6 số → trong Supabase Dashboard sửa mẫu email "Magic Link" có `{{ .Token }}`. Mail mặc định của Supabase giới hạn vài email mỗi giờ — đủ cho 1–3 người; nếu thiếu sẽ gắn SMTP riêng sau. Đây là bước gia đình làm trên dashboard (mình ghi hướng dẫn từng bước).
- **Sản phẩm mới tạo ra ở trạng thái "Ẩn"** cho tới khi bấm "Đang bán", để không lộ sản phẩm thiếu ảnh/giá.

## Để người xây dựng tự quyết

- Bố cục chi tiết, khoảng cách, chữ trong admin (theo nguyên tắc ở trên).
- Cách hiện thông báo lưu / lỗi.
- Tên file, chia component.
