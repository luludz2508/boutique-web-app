# Cài đặt trang quản trị /admin

Các bước làm một lần trên Supabase Dashboard và Vercel. Làm theo thứ tự.

## 1. Ghi lại trạng thái bảo mật hiện tại

Supabase → **Table Editor**: với từng bảng `products`, `product_variants`, `product_images`, `categories`, `product_attributes`, `product_certificates`, xem nhãn **RLS enabled / disabled** và ghi lại vào cuối tài liệu này (mục "Nhật ký"). Mục đích: nếu có sự cố, biết được trạng thái trước khi đổi.

## 2. Chạy thay đổi database

Supabase → **SQL Editor** → New query → dán toàn bộ nội dung `supabase/migrations/003_admin.sql` → **Run**.

Chạy lại lần nữa cũng không sao (mọi lệnh đều an toàn khi chạy lặp).

Sau khi chạy, trình duyệt của khách **chỉ đọc được** sản phẩm "Đang bán"; mọi thao tác ghi phải đi qua trang admin.

## 3. Mẫu email gửi mã đăng nhập

Supabase → **Authentication → Email Templates → Magic Link**.

- Subject: `Mã đăng nhập Trầm Hương Sơn Hồng`
- Body (thay toàn bộ):

```html
<p>Mã đăng nhập trang quản trị:</p>
<h2>{{ .Token }}</h2>
<p>Mã có hiệu lực trong 1 giờ. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
```

Bắt buộc phải có `{{ .Token }}` — trang đăng nhập yêu cầu nhập mã 6 số, không dùng đường link.

## 4. Bật đăng nhập bằng email

Supabase → **Authentication → Providers → Email**:

- **Enable Email provider**: bật
- **Confirm email**: tắt (mã đăng nhập đã là bước xác nhận)

Supabase → **Authentication → Sessions** (nếu gói hiện tại có mục này): thời gian phiên 30 ngày.

Lưu ý: mail mặc định của Supabase chỉ gửi được vài email mỗi giờ — đủ cho 1–3 người. Nếu thiếu, gắn SMTP riêng ở **Authentication → SMTP Settings**.

## 5. Danh sách email được vào admin

Biến `ADMIN_EMAILS`: các email phân cách bằng dấu phẩy, ví dụ `nguoi1@gmail.com,nguoi2@gmail.com`.

- Máy tính: thêm một dòng vào `.env.local` → `ADMIN_EMAILS=...`
- Vercel → Project → **Settings → Environment Variables** → thêm `ADMIN_EMAILS` cho **Production** và **Preview** → Redeploy.

Không bao giờ ghi email vào code hay commit.

## 6. Kiểm tra sau khi cài

Chạy trong SQL Editor:

```sql
-- RLS đã bật trên các bảng sản phẩm (cột rowsecurity = true)
select tablename, rowsecurity from pg_tables
where schemaname = 'public'
  and tablename in ('products','product_variants','product_images','categories',
                    'product_attributes','product_certificates','product_slug_redirects','admin_audit');

-- Các policy chỉ có quyền đọc (cmd = SELECT)
select tablename, policyname, cmd from pg_policies where schemaname = 'public' order by tablename;

-- Hàm lưu chỉ service_role được gọi
select has_function_privilege('anon', 'public.admin_save_product(jsonb)', 'execute') as anon_can_call;  -- false
```

Rồi mở trang chủ và `/products` để chắc khách vẫn xem được sản phẩm.

## Nhật ký

| Ngày | Việc | Ghi chú |
|---|---|---|
| | Trạng thái RLS trước khi chạy 003 | |
