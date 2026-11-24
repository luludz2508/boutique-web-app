# Giao diện thủy mặc — Thiết kế

Ngày: 2026-11-24 · Nhánh: `feat/ink-ui`

## Mục đích

Website Trầm Hương Sơn Hồng (Next.js) hiện trông cũ: nền tối, họa tiết "imperial", màu vàng hoàng gia, các màu cam/teal còn sót lại từ theme cũ. tramhuongsonhong.com (Haravan) thì "hơi sến". Gia đình muốn một giao diện **thủy mặc Á Đông, tiết chế, sang và gần gũi**, đẹp ở cả **trang chủ lẫn trang sản phẩm**. Web này đồng thời là bản dự phòng khi bỏ Haravan, nên trang sản phẩm phải dùng tốt mà không cần Haravan.

Thành công = khách vào thấy chất thủ công, tin tưởng, xem sản phẩm dễ, và liên hệ đặt mua bằng một chạm.

## Mục tiêu

- Bảng màu, font, nền giấy mới cho toàn site.
- Làm lại: trang chủ `/`, danh sách sản phẩm `/products`, chi tiết `/products/[slug]`, thanh điều hướng, footer.
- Hiệu ứng chuyển động tinh tế, lấy cảm hứng từ portfolio-v2 của chủ dự án nhưng mang chất thủy mặc.
- Nút đặt mua: **Zalo / Gọi / Facebook** (không dẫn sang Haravan).
- Dọn trang thử nghiệm và layout trùng.

## Không làm (lần này)

- Bố cục và màu của `/collection`, `/gallery`, `/atelier`, `/services`: giữ nguyên (xem "Token màu" — các thang màu cũ không bị đổi), chỉ nhận nav và footer mới.
- Trang bài viết (dữ liệu đã có trong `docs/posts/`), giỏ hàng, thanh toán, trang admin, tiếng Anh.
- Thay đổi dữ liệu, truy vấn Supabase, logic lọc/tìm kiếm/phân trang.

## Điều không được xảy ra

- Ảnh sản phẩm bị nhòe, méo hay bị bộ lọc làm mờ.
- Viền/ô chữ nhật lộ ra quanh tranh thủy mặc (lỗi blend).
- "Cyber": góc vuông sắc, đường chỉ thẳng cứng, chữ in hoa giãn rộng cho tên sản phẩm.
- Vàng đặt cạnh vàng (vệt cọ vàng cạnh chữ vàng) làm chìm nhau.
- Trông "Trung Hoa" hoặc sến: không rồng phượng, không chữ Hán, không họa tiết dày đặc.
- Chữ tiếng Việt viết dọc.
- Hiệu ứng làm chậm trang hoặc gây khó chịu; phải tắt khi người dùng bật "giảm chuyển động".

## Các cách đã cân nhắc

| Cách | Ưu | Nhược |
|---|---|---|
| **Bộ thành phần thủy mặc mới `components/ink/` + ghép trang (đã chọn)** | Sạch, nhất quán, dễ bảo trì; giữ nguyên dữ liệu và logic | Viết mới nhiều component trình bày |
| Sửa dần component cũ | Ít file mới | Component cũ thiết kế cho nền tối + họa tiết imperial, sửa từng chỗ sẽ lẫn lộn kiểu cũ/mới |
| Chép thẳng HTML phác thảo | Nhanh lúc đầu | JS thuần + CSS gộp, không hợp React/Next, khó bảo trì |

## Thiết kế đã chốt (từ các vòng phác thảo)

Bản phác tham chiếu, mở trực tiếp trong trình duyệt sẽ thiếu ảnh vì đường dẫn `/files/...` là của công cụ phác thảo — tương ứng với `public/ink/...` trong dự án:
- `docs/superpowers/specs/2026-11-24-ink-ui-mockups/home.html` — trang chủ, nav, ấn, câu chuyện. **Bỏ qua** mục "3 kiểu card" và mục "Ấn các cỡ" trong file này (chỉ để chọn).
- `docs/superpowers/specs/2026-11-24-ink-ui-mockups/product-card.html` — card sản phẩm đã chốt (mục C).

### Màu, font, nền

- Token màu **mới** (thêm vào `tailwind.config.ts` `theme.extend.colors`, tên riêng để không đụng thang cũ): `paper #F4EFE4`, `paper-2 #ECE4D3`, `ink #1C1B19`, `ink-2 #5A554C`, `gold #B8913A`, `gold-2 #E2C57C`, `seal #A8281F`. Các trang/khối mới chỉ dùng token này.
  - *Quyết định của người viết spec:* **không** đổi các thang hex cũ (`primary`, `accent`, `neutral`, `cyphr`) trong `tailwind.config.ts`, vì `/atelier`, `/services`… dùng chúng với nền tối cố định; đổi thang sẽ làm các trang đó vỡ. Các trang cũ giữ giao diện cũ giữa nav/footer mới cho đến khi được làm lại.
  - Biến shadcn trong `globals.css` (`--background`, `--foreground`…) đổi sang giấy/mực để các component shadcn dùng trong trang mới (input, select, dialog) khớp màu.
- Font qua `next/font/google`, subset `vietnamese`: **Cormorant Garamond** (300/400/500, có italic) cho tiêu đề, tên sản phẩm, giá lớn; **Be Vietnam Pro** (300/400/500) cho chữ thường. Bỏ Hahmlet, Source Sans 3, JetBrains Mono nếu không còn dùng.
- Nền trang: màu `paper` + `public/ink/paper-tile.webp` lặp, kích thước 512px.

### Ảnh thủy mặc (đã có trong `public/ink/`)

| File | Dùng ở | Cách hiển thị |
|---|---|---|
| `hero-mountains-far.webp`, `mist.webp`, `hero-mountains-near.webp` | 3 lớp núi đầu trang chủ | nền trắng → `mix-blend-mode: multiply` |
| `agarwood-branch.webp` | góc phải trên đầu trang, đung đưa nhẹ | multiply |
| `smoke.webp` | khói trầm bay lên trong hero | multiply, mờ mép |
| `moon-hills.webp` | mục Câu chuyện | multiply, mờ mép |
| `brush-gold.webp` | vệt cọ vàng **chỉ dưới chữ đen** (vd. "núi rừng") | PNG trong suốt, blend thường |
| `brush-ink.webp` | ngăn mục, gạch chân tên sản phẩm | PNG trong suốt |
| `seal-full.webp` | ấn lớn (≥ 100px): hero, câu chuyện, footer | trong suốt |
| `seal-blank.webp` + `seal-texture.webp` | ấn nhỏ (< 100px): nav, favicon, nút — ô son + chữ "SƠN/HỒNG" màu giấy, chữ phủ mặt nạ vân mực | trong suốt |

**Quy tắc blend (đã gặp lỗi trong phác thảo):** `multiply` chỉ "thấy" giấy nếu không có lớp cha tạo nhóm cô lập. Phần tử có `will-change`/`transform`/`z-index`/`filter` sẽ cô lập con của nó → đặt `mix-blend-mode` lên chính wrapper đó, hoặc dùng ảnh trong suốt (như vệt cọ, ấn). Kiểm tra bằng mắt: không được thấy ô chữ nhật nào quanh tranh.

Ảnh nguồn do chủ dự án gen; một số có dấu ✦ mờ của công cụ gen ở góc — để nguyên (không tự xóa).

### Thanh điều hướng

Ấn nhỏ + "TRẦM HƯƠNG SƠN HỒNG" (Cormorant, giãn chữ) bên trái, bấm về `/`; mục: **Câu chuyện · Sản phẩm · Liên hệ** bên phải, gạch vàng chạy từ giữa ra khi hover.
- *Quyết định của người viết spec:* Câu chuyện → `/#story` (từ mọi trang); Sản phẩm → `/products`; Liên hệ → cuộn tới footer `#contact` của trang hiện tại (mọi trang đều có footer). Bỏ logic cuộn-theo-mục cũ dựa trên `content.navigation`.
- Các trang cũ (`/collection`, `/gallery`, `/atelier`, `/services`) không còn trên nav; liên kết tới chúng nằm trong footer, cột "Khám phá". Nền giấy mờ dần xuống dưới (gradient), không viền cứng. Mobile: nút menu mở danh sách toàn màn hình nền giấy. Giữ hành vi ẩn/hiện khi cuộn của Navbar hiện tại nếu có.

### Trang chủ `/` (theo `home.html`)

1. **Hero** (100vh): 3 lớp núi parallax (tốc độ ~.12/.22/.38), sương trôi ngang chậm, cành trầm đung đưa, khói bay lên. Chữ: dòng nhỏ vàng "Trầm hương tự nhiên · Từ 1985"; tiêu đề "Hương của / núi rừng" chữ mực, từng chữ hiện "thấm mực" (mờ → rõ); vệt cọ vàng quét dưới "núi rừng"; một câu dẫn; nút **Xem sản phẩm** (đen, góc hồi văn vàng nhỏ) và **Câu chuyện** (viền, vệt cọ vàng quét qua khi hover). Ấn lớn "đóng dấu" xuống cạnh tiêu đề sau khi chữ hiện xong. Mực loang theo con trỏ (canvas), thỉnh thoảng có đốm vàng.
2. **Dải chữ chạy**: "Trầm tự nhiên ◆ Khánh Hòa ◆ Từ năm 1985 ◆ Vòng trầm ◆ Nhang nụ ◆ Tượng trầm", viền trên/dưới hoa văn hồi văn vàng; dừng khi hover.
3. **Câu chuyện**: nhãn "Di sản", tiêu đề, nét cọ mực ngăn, đoạn văn + trích dẫn nghệ nhân (lấy từ nội dung hiện có trong `app/page.tsx` / `config/content.ts`), tranh trăng bên phải; **giữ video nghệ nhân** hiện có (đặt trong khung card giấy dó, dưới hoặc cạnh đoạn văn).
4. **Sản phẩm nổi bật**: 6–8 sản phẩm (`featured = true`, nếu không đủ thì mới nhất), card giấy dó, nút "Xem tất cả sản phẩm".
5. **Khoảnh khắc Sơn Hồng**: dải ảnh thật cuộn ngang (kéo được, tự trôi chậm, dừng khi hover) từ `public/tramhuong-sonhong/`: `gallery-1..3.jpg`, `customers-1..2.jpg`, `customer-3..4.jpg`, `caexpo-1.jpg`. Mỗi ảnh trong card giấy dó, chú thích ngắn trung tính (vd. "Showroom Đà Nẵng", "Khách ghé thăm", "Hội chợ CAEXPO") — không bịa lời khách.
6. **Ghé showroom**: khối ngắn trên nền giấy — địa chỉ 680 Võ Nguyên Giáp, giờ mở cửa, và 3 nút Zalo / Gọi / Chỉ đường (Google Maps). Đây là điểm kết của luồng trang chủ.
7. **Footer** (xem dưới).

Bỏ: ảnh `hero.png` cũ, `BackgroundImage` nền cũ, khối đánh giá gradient vàng; hai mục **Bộ sưu tập** (`CollectionContent`) và **Hình ảnh** (`GalleryContent`) khỏi trang chủ (trang riêng vẫn còn, link ở footer); **3 đánh giá mẫu** ("Nguyễn Văn A"… là nội dung giả) — không hiển thị nữa. Khi gia đình có đánh giá thật (có sự đồng ý của khách), thêm lại thành một mục trích dẫn trên nền giấy.

**Luồng trang (quyết định bố cục):** Trang chủ kể chuyện rồi dẫn tới sản phẩm: Hero → Câu chuyện → Sản phẩm nổi bật → Khoảnh khắc (bằng chứng thật) → Ghé showroom / liên hệ. Danh sách → Chi tiết → Zalo/Gọi. Mọi trang kết bằng footer có liên hệ; nút "Liên hệ" trên nav luôn cuộn tới đó.

### Card sản phẩm (theo `product-card.html`, mục C)

- Ảnh vuông `object-fit: cover`, phóng 112% để giấu khung có sẵn trong ảnh Haravan (phóng 117% khi hover).
- Ảnh đặt trên **tờ giấy dó** viền 6px; mép giấy xơ bằng SVG filter (turbulence + displacement, scale ≈ 4) **chỉ áp lên lớp giấy phía sau** (`::before`), đổ bóng mềm.
- Mép ảnh gợn rất nhẹ bằng **mask** SVG (displacement scale ≈ 0.5, baseFrequency ≈ .22) — **không bao giờ áp `filter` lên ảnh**.
- Hover: tờ giấy nhấc lên 4px và nghiêng −0.4°; viền vàng mép xơ (border 1.5px gold, cùng filter giấy) hiện quanh tờ giấy.
- Dưới ảnh: tên sản phẩm **chữ thường kiểu câu** (Cormorant 20px; dữ liệu đang IN HOA → hạ chữ thường rồi viết hoa chữ cái đầu bằng một hàm hiển thị, không sửa dữ liệu); gạch chân nét cọ mực dài ra khi hover; giá Be Vietnam Pro 14px màu `ink-2`. Giá 0/trống hiển thị "Liên hệ".
- Không góc hồi văn, không trống đồng, không mây cuộn trên card (đã thử, bị loại).

### Trang danh sách `/products`

Nền giấy (bỏ nền tối). Tiêu đề "Sản phẩm" + nét cọ mực; ô tìm kiếm và 2 ô chọn (loại, sắp xếp) kiểu tối giản: viền dưới mảnh, không hộp tối. Lưới card giấy dó: 4 cột desktop, 2 cột tablet/mobile. Phân trang: số trang Cormorant, trang hiện tại có ấn nhỏ phía sau. Skeleton/loading/error theo màu giấy. **Thêm Footer** (hiện trang này chưa có).

### Trang chi tiết `/products/[slug]`

- Breadcrumb nhỏ.
- Trái: bộ ảnh (ảnh lớn trên tờ giấy dó như card, thumbnails nhỏ phía dưới, ảnh đang chọn có viền vàng). Giữ chức năng `product-image-gallery` hiện có.
- Phải: tên (Cormorant lớn, chữ thường kiểu câu), giá (hoặc "Liên hệ"), chọn biến thể (nút dạng thẻ giấy, đang chọn có viền vàng), mô tả ngắn.
  - *Quyết định của người viết spec:* chọn biến thể **cập nhật giá hiển thị** và trạng thái (chỉ hiện "Hết hàng" khi tồn kho = 0 và có theo dõi tồn kho; không hiện số lượng, không hiện SKU — dữ liệu tồn kho có thể cũ cho đến khi có đồng bộ Haravan). Biến thể đầu tiên còn hàng được chọn sẵn. Không đổi ảnh theo biến thể (dữ liệu chưa gắn ảnh với biến thể). Link Zalo không điền sẵn tin nhắn (zalo.me không hỗ trợ); bên dưới nút có dòng nhỏ "Nhắn: tên sản phẩm – biến thể" kèm nút sao chép.
- **Nút liên hệ** (bỏ nút giỏ hàng "Sắp có"):
  - **Nhắn Zalo** — chính, nền mực: `https://zalo.me/0937033468`
  - **Gọi điện** — `tel:0937033468`
  - **Facebook** — `https://www.facebook.com/tramhuongsonhong.vn` (link hiện có)
  - Số điện thoại/Zalo lấy từ `config/content.ts` (`contactNumber`, thêm `zaloUrl`), không ghi cứng trong component.
- Mô tả đầy đủ (HTML từ Haravan) trong khối chữ đọc dễ, căn trái (bỏ căn giữa hiện tại), ảnh trong mô tả co theo chiều rộng.
- Sản phẩm liên quan (nếu dữ liệu có sẵn cách lấy): 4 card giấy dó.
- Footer.

### Footer

Nền mực `ink`, chữ giấy, `id="contact"`. Ấn lớn + tên. Cột: địa chỉ showroom, giờ mở cửa, điện thoại, email, Instagram, website (dữ liệu hiện có trong `content.ts`); cột "Khám phá" (Sản phẩm, Bộ sưu tập, Hình ảnh, Xưởng, Dịch vụ — các trang cũ); bản đồ giữ `MapComponent`. Footer dùng chung cho mọi trang (đặt trong layout hoặc từng trang, người làm chọn). Dòng pháp lý GPKD + trụ sở (đã có). Một mặt trống đồng SVG lớn, rất mờ (opacity ~.05), làm nền góc footer.

### Hoa văn SVG (vẽ tay, không dùng ảnh)

- Góc hồi văn nhỏ (chỉ dùng trên nút chính).
- Dải hồi văn lặp ngang (viền dải chữ chạy).
- Mặt trống đồng Đông Sơn đơn giản hóa (chỉ dùng cỡ lớn, rất mờ: footer).

### Chuyển động

Dùng CSS + một canvas nhỏ; `framer-motion` (đã có) chỉ cho reveal khi cuộn nếu tiện. Danh sách: chữ thấm mực, vệt cọ quét, ấn đóng dấu, parallax núi, sương trôi, cành đung đưa, khói bay, mực loang theo con trỏ, hiện dần khi cuộn (mờ + lên 28px), card nhấc giấy. Tất cả tắt dưới `prefers-reduced-motion: reduce` (nội dung hiện ngay). Mực loang chỉ chạy khi có chuột (không chạy trên cảm ứng).

### Dọn dẹp

Xóa `app/test-db`, `app/test-layout-v2`, `app/accordion-colors`, `app/ClientLayoutV2.tsx` và mọi import của chúng; xóa `components/ui/imperial-elements.tsx` nếu không còn dùng. Kiểm tra `ClientLayout.tsx` còn được dùng ở đâu; nếu không, xóa.

## Ràng buộc

- Next.js 15 App Router, Tailwind, shadcn/ui đang dùng; không thêm thư viện UI/animation mới.
- Không đổi schema, truy vấn, API.
- Ảnh từ `public/ink/` qua `next/image` hoặc `<img>`; ảnh sản phẩm từ Supabase Storage (host đã có trong `next.config.mjs`).
- Responsive: 375px → 1440px+; không cuộn ngang.
- CSP hiện có trong `next.config.mjs` đã cho phép ảnh https và Google Fonts.

## Để người làm tự quyết

- Cấu trúc file trong `components/ink/` và tên component.
- Cách nối token màu vào Tailwind (CSS variables hay giá trị trực tiếp).
- Cách lấy "sản phẩm liên quan" (cùng `product_type` là đủ); bỏ qua nếu tốn công.
- Kích thước/tốc độ hiệu ứng chi tiết, miễn giống bản phác.
