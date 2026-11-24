# Sao lưu sản phẩm từ Haravan — Thiết kế

Ngày: 2026-11-24

## Mục đích

Web Next.js mới (Trầm Hương Sơn Hồng) vừa là giao diện đẹp hơn tramhuongsonhong.com, vừa là **bản dự phòng**: nếu gia đình ngừng gia hạn Haravan, web vẫn có đủ sản phẩm, giá và ảnh. Dữ liệu phải nằm trong Supabase của mình, không phụ thuộc Haravan.

Hiện trạng (kiểm tra chỉ đọc ngày 2026-11-24, project `tramhuong-sonhong`):

- 192 sản phẩm, 328 biến thể, 689 ảnh, nhập **một lần** từ CSV xuất tay.
- **Cả 689 ảnh trỏ về `product.hstatic.net`** (CDN Haravan). Chưa có Storage bucket nào.
- 52 biến thể có giá 0/trống (khớp với "0đ" trên tramhuongsonhong.com).

## Chia giai đoạn

Chưa có quyền truy cập Haravan (đang xin token). Vì vậy:

- **Giai đoạn 1 — làm ngay, không cần Haravan:** sao lưu 689 ảnh hiện có (link hstatic công khai) vào Supabase Storage. Xem mục "Giai đoạn 1" bên dưới.
- **Giai đoạn 2 — khi có token:** đồng bộ qua API + GitHub Actions, như phần "Thiết kế" (giai đoạn 2).

## Giai đoạn 1: Sao lưu ảnh hiện có

Script `scripts/backup-images.ts` (lệnh `pnpm backup:images`), chạy trên máy với `.env.local`.

1. Tạo bucket public `product-images` qua Storage API nếu chưa có. **Không cần sửa schema database ở giai đoạn này.**
2. Đọc toàn bộ `product_images` (id, product_id, url). Chỉ xử lý dòng có url thuộc `hstatic.net`.
3. Mỗi ảnh lưu vào `haravan/{tên file gốc}` (tên file hstatic đã có mã hash duy nhất, vd `28_435793d5…jpg`). File đã có trong bucket → bỏ qua (chạy lại an toàn).
4. Tải và upload song song vừa phải (~5 cùng lúc), thử lại 3 lần; giữ nguyên content-type.
5. Ghi **manifest** `{image_id, product_id, old_url, new_url}` vào bucket (`backups/images-manifest-YYYY-MM-DD.json`) và một bản trong máy, **trước khi** đổi link.
6. Chỉ đổi `product_images.url` sang link Storage cho những ảnh đã upload và kiểm tra mở được. Ảnh lỗi giữ nguyên link cũ và được liệt kê trong báo cáo.
7. `--dry-run`: chỉ kiểm tra từng link hstatic còn mở được, đếm, không upload, không ghi.
8. `--rollback <manifest>`: trả `url` về link cũ từ manifest.
9. Xuất danh sách biến thể giá 0/trống ra `docs/reports/zero-price-variants-YYYY-MM-DD.csv` (tên sản phẩm, biến thể, SKU, giá) để gia đình rà lại.
10. Thêm hostname Supabase vào `images.remotePatterns` trong `next.config` để `next/image` hiển thị ảnh mới. Giữ hstatic trong danh sách cho đến khi giai đoạn 2 xong.

Thứ tự chạy: `--dry-run` → người dùng xem báo cáo → chạy thật → mở web kiểm tra ảnh hiển thị.

Giai đoạn 2 sẽ thêm cột `haravan_image_id`/`source_url` và dùng lại đúng đường dẫn `haravan/{tên file}`, nên ảnh đã sao lưu không bị tải lại.

## Mục tiêu (giai đoạn 2)

- Kéo sản phẩm, biến thể, giá, tồn kho, ảnh từ Haravan về Supabase.
- Tải ảnh về Supabase Storage và đổi `product_images.url` sang link của mình.
- Tự chạy mỗi đêm; chạy tay được bất cứ lúc nào.
- Báo cáo sau mỗi lần chạy.

## Không làm (lần này)

- Đơn hàng, khách hàng, vận chuyển.
- Đồng bộ hai chiều (web → Haravan).
- Trang admin, giao diện thủy mặc (là hai phần việc sau).

## Điều không được xảy ra

- Xóa dữ liệu trên web vì Haravan lỗi, trả rỗng hoặc đã hết hạn.
- Ghi đè các trường chỉ web mới có (xem "Ai sở hữu trường nào").
- Lộ token Haravan hoặc service role key (trong log, commit, hay client bundle).

## Các cách đã cân nhắc

| Cách | Ưu | Nhược |
|---|---|---|
| A. Script chạy tay | Đơn giản | Phải nhớ chạy |
| **B. GitHub Actions chạy mỗi đêm + chạy tay (đã chọn)** | Repo đã ở GitHub, không phụ thuộc nơi deploy, miễn phí, vẫn chạy tay được | Cần cấu hình GitHub Secrets |
| C. Vercel Cron | Gắn với web | Repo chưa liên kết Vercel |

Người dùng chọn **B**.

## Thiết kế

### Nguồn dữ liệu

Haravan private app, quyền `read_products`. Gọi `GET https://apis.haravan.com/com/products.json` với `Authorization: Bearer <HARAVAN_ACCESS_TOKEN>`, phân trang (`limit`, `page`) đến khi hết. Người dùng tự tạo app và token.

### Script `scripts/sync-haravan.ts` (chạy bằng `tsx`, lệnh `pnpm sync:haravan`)

1. Đọc toàn bộ sản phẩm từ Haravan. **Nếu lỗi mạng/401/trả về 0 sản phẩm → dừng, không ghi gì.**
2. Upsert `products` theo `haravan_product_id`, `product_variants` theo `haravan_variant_id`.
3. Ảnh: với mỗi ảnh Haravan, nếu chưa có trong Storage thì tải về và upload vào bucket public `product-images`, đường dẫn `{haravan_product_id}/{haravan_image_id}.{ext}`; upsert `product_images` theo `haravan_image_id`, `url` = link Storage.
4. Sản phẩm/biến thể/ảnh có trên web nhưng không còn trên Haravan → sản phẩm chuyển `status = 'archived'`; không xóa hàng nào, không xóa file ảnh.
5. Cờ `--dry-run`: chỉ đọc và in ra sẽ thay đổi gì.
6. Báo cáo: số sản phẩm mới / thay đổi / lưu trữ, số ảnh đã tải, danh sách biến thể giá 0. Trong Actions thì ghi vào Job Summary.

### Ai sở hữu trường nào

- **Haravan sở hữu** (bị ghi đè mỗi lần sync): `name_vi`, `description_vi`, `slug` (chỉ khi tạo mới), `product_type`, `tags`, `brand`, trạng thái published/archived; toàn bộ trường giá, tồn kho, SKU, option của biến thể; danh sách ảnh và thứ tự ảnh.
- **Web sở hữu** (sync không đụng tới): `featured`, các trường `_en`, `seo_*`, `excerpt_*`, `category_id`, `product_attributes`, `product_certificates`.

### Thay đổi database (migration `003_haravan_sync.sql`)

- `product_images`: thêm `haravan_image_id TEXT UNIQUE`, `source_url TEXT` (link hstatic gốc, để đối chiếu).
- Tạo bucket Storage public `product-images`.
- Bảng `sync_runs` (thời gian, kết quả, số liệu, lỗi) để biết lần sync cuối thành công khi nào.

### GitHub Actions `.github/workflows/sync-haravan.yml`

- Chạy lúc 02:00 giờ Việt Nam (`cron: '0 19 * * *'` UTC) và `workflow_dispatch` (bấm tay, có lựa chọn dry-run).
- Secrets: `HARAVAN_ACCESS_TOKEN`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Khi bỏ Haravan: tắt workflow. Dữ liệu đã nằm sẵn trong Supabase.

### Lần chạy đầu

Chạy `--dry-run` trên máy, người dùng xem báo cáo, rồi mới chạy thật. Lần chạy thật đầu tiên sẽ tải khoảng 689 ảnh.

## Để người làm tự quyết

- Map chi tiết trường JSON Haravan → cột (kiểm tra bằng response thật).
- Giới hạn tốc độ gọi API, số ảnh tải song song, retry.
- Dùng `@supabase/supabase-js` (đã có trong dependencies).

## Ghi chú ngoài phạm vi

Video trang chủ đang nằm ở một Supabase project khác (`pidgjpxc…`) không thuộc tài khoản hiện tại — nên chuyển về project chính trong một việc riêng.
