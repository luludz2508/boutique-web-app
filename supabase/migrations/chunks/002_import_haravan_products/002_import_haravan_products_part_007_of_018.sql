-- 002_import_haravan_products.sql - Part 7/18
-- Generated: 2025-10-25T04:17:01.376Z
-- Contains 12 complete product records
-- Each product includes: INSERT product + variants + images

BEGIN;

-- Product: ĐẾ CẮM NHANG CÂY ĐÀI SEN 3 TẦNG
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1043954687',
  'ĐẾ CẮM NHANG CÂY ĐÀI SEN 3 TẦNG',
  'de-cam-nhang-cay-dai-hoa-sen-nho',
  '<h1 style="text-align: center;"><span style="color:#f39c12"><strong>ĐẾ CẮM NHANG CÂY ĐÀI HOA SEN 3 TẦNG</strong></span></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN CHI TIẾT</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:500px"><tbody><tr><td style="width:151px">CHẤT LIỆU</td><td style="width:335px">Đồng</td></tr><tr><td style="width:151px">KHỐI LƯỢNG</td><td style="width:335px">165</td></tr><tr><td style="width:151px">LOẠI TRẦM SỬ DUNG</td><td style="width:335px">Nhang tăm, nhang không tăm</td></tr><tr><td style="width:151px">BẢO HÀNH</td><td style="width:335px">1 Đổi 1 trong vòng 1 tháng nếu có lỗi kỹ thuật</td></tr><tr><td style="width:151px">SỬ DỤNG</td><td style="width:335px">Phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM ĐẾ CẮM NHANG CÂY ĐÀI HOA SEN NHỎ</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/lu_hoa_sen_thap_2_f7981bdcb76a4c7e96230473adbfbf1f_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Đế cắm nhang cây trầm hương</strong> đài sen 3 tầng nhỏ có thiết kế nhỏ gọn, hoạ tiết mô phỏng đài sen nở rộ vô cùng tinh tế và đẹp mắt.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Đế cắm nhang cây Trầm Hương Sơn Hồng rất phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA ĐẾ CẮM NHANG CÂY TRẦM HƯƠNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">- Dùng để cắm nhang trầm hương giúp thư giãn tinh thần.</p><p style="text-align: justify;">- Dùng để trang trí nhà cửa, nơi làm việc hoặc thờ cúng.</p><p style="text-align: justify;">- Tạo sự phong thuỷ cho nơi làm việc và mang đến may mắn cho người sử dụng.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÁCH DÙNG CỦA ĐẾ CẮM NHANG CÂY</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Bước 1:</strong> Cắm nhang cây (không tăm hoặc có tăm) vào đĩa, có thể đệm thêm miếng giấy mỏng nếu lỗ cắm to hơn tăm nhang.</p><p style="text-align: justify;"><strong>Bước 2:</strong> Châm lửa đốt phần chóp của nhang&nbsp;</p><p style="text-align: justify;"><strong>Bước 3:</strong> Bắt đầu thưởng thức hương thơm của nhang trầm hương.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;"><br>&nbsp;</p>',
  NULL,
  'ĐẾ CẮM NHANG CÂY ĐÀI HOA SEN NHỎ',
  'Đế cắm nhang cây trầm hương đài hoa sen nhỏ có thiết kế nhỏ gọn, hoạ tiết mô phỏng đài sen nở rộ vô cùng tinh tế và đẹp mắt.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Phụ kiện đốt trầm',
  ARRAY['Đế cắm nhang', 'Lư đồng'],
  'published',
  '2022-12-23T01:06:52+07:00'::timestamp,
  '2022-12-27T17:41:00+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043954687'),
  '1096805171',
  'Title', 'Đĩa sen 3 tầng',
  NULL, NULL,
  NULL, NULL,
  240000, NULL,
  NULL, NULL,
  165, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043954687'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_thap_1_09aa7226cd5f4329a09e2d590312ac78.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043954687'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_thap_2_d33f3e159d8240dc868f1e293fbb05ad.jpg',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043954687'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_thap_3_2c3b80a1b00e4d709036cdd08013fb4a.jpg',
  NULL,
  3,
  false
);


-- Product: LƯ ĐỒNG XÔNG TRẦM NHƯ Ý CAO CẤP
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1043985629',
  'LƯ ĐỒNG XÔNG TRẦM NHƯ Ý CAO CẤP',
  'lu-dong-xong-tram-nhu-y-cao-cap',
  '<h1 style="text-align: center;"><span style="color:#f39c12"><strong>LƯ ĐỒNG XÔNG TRẦM NHƯ Ý</strong></span></h1><p style="text-align: justify;"><strong>THÔNG TIN CHI TIẾT</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:167px">CHẤT LIỆU</td><td style="width:419px">Đồng đỏ</td></tr><tr><td style="width:167px">KHỐI LƯỢNG</td><td style="width:419px">338g</td></tr><tr><td style="width:167px">LOẠI TRẦM SỬ DỤNG</td><td style="width:419px">Nhang nụ, nhang vòng, bột trầm...</td></tr><tr><td style="width:167px">BẢO HÀNH</td><td style="width:419px">1 đổi 1 trong vòng 1 tháng nếu có lỗi kỹ thuật</td></tr><tr><td style="width:167px">SỬ DỤNG</td><td style="width:419px">Phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM LƯ ĐỒNG XÔNG TRẦM NHƯ Ý</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/lu_may_cao_2_e70a7d3d33d84d10ab759d694176fff2_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Lư đồng xông trầm Như ý</strong> có thiết kế vô cùng sang trọng và cổ điển. Lư trầm đồng Như Ý không chỉ giúp lan tỏa hương trầm, xông tẩy uế ngôi nhà, tạo không gian thư thái, mà con mang ý nghĩa độc đáo giúp cho gia chủ được thăng tiến công danh sự nghiệp từ quyền trượng Như Ý - bảo vật tượng trưng cho quyền lực của hoàng gia.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Lư đồng xông trầm Sơn Hồng</em> rất phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong><span style="color:#f39c12">CÔNG DỤNG CỦA LƯ ĐỒNG XÔNG TRẦM</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em><strong>Lư đồng xông trầm hương Như ý có kiểu dáng cổ điển, hoàng gia&nbsp;rất thích hợp để:</strong></em></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">- Dùng để đốt trầm, đốt nhang vòng,... thư giãn tinh thần.</p><p style="text-align: justify;">- Dùng để trang trí nhà cửa, nơi làm việc hoặc thờ cúng.</p><p style="text-align: justify;">- Dùng làm quà tặng ý nghĩa cho người thân hay bạn bè.</p><p style="text-align: justify;">- Tạo sự phong thuỷ cho nơi làm việc và mang đến may mắn cho người sử dụng.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÁCH DÙNG CỦA LƯ ĐỒNG XÔNG TRẦM NHƯ Ý</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Bước 1: </strong>Mở nắp của lư và để 1 nụ trầm hoặc nhang vòng có kích thước vừa vặn vào trong.&nbsp;</p><p style="text-align: justify;"><strong>Bước 2:</strong> Châm lửa đốt phần chóp của nhang nụ trầm hương, nhang vòng/khoanh trầm hương. Khi nhang trầm hương đã cháy thổi tắt lửa và đặt vào lư và đậy nắp lư lại.</p><p style="text-align: justify;"><strong>Bước 3:</strong> Bắt đầu thưởng thức hương thơm của nhang trầm hương.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;"><br>&nbsp;</p>',
  NULL,
  'LƯ ĐỒNG XÔNG TRẦM NHƯ Ý CAO CẤP',
  'Lư đồng xông trầm Như Ý không chỉ giúp lan tỏa hương trầm, xông tẩy uế ngôi nhà, tạo không gian thư thái, mà con mang ý nghĩa độc đáo giúp cho gia chủ được thăng tiến công danh sự nghiệp từ quyền trượng Như Ý - bảo vật tượng trưng cho quyền lực của hoàng gia.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Phụ kiện đốt trầm',
  ARRAY['Lư đồng'],
  'published',
  '2022-12-24T09:50:18+07:00'::timestamp,
  '2022-12-27T17:25:31+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043985629'),
  '1096859417',
  'Title', 'Lư đồng như ý',
  NULL, NULL,
  NULL, NULL,
  274000, NULL,
  NULL, NULL,
  NULL, 2,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043985629'),
  'https://product.hstatic.net/200000591825/product/lu_may_cao_1_6cce33ea2d2a49c0b78244faef0f15b3.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043985629'),
  'https://product.hstatic.net/200000591825/product/lu_may_cao_2_078813b91f424fa99f70142fa35dae5e.jpg',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043985629'),
  'https://product.hstatic.net/200000591825/product/lu_may_cao_3_11912ea731664456a3f55ce6a0a29b33.jpg',
  NULL,
  3,
  false
);


-- Product: LƯ ĐỒNG XÔNG TRẦM HOA SEN ĐỒNG ĐEN LỚN
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1043989119',
  'LƯ ĐỒNG XÔNG TRẦM HOA SEN ĐỒNG ĐEN LỚN',
  'lu-dong-xong-tram-hoa-sen-lon',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">LƯ ĐỒNG XÔNG TRẦM HOA SEN LỚN</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN CHI TIẾT</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:172px">CHẤT LIỆU</td><td style="width:414px">Đồng&nbsp;</td></tr><tr><td style="width:172px">KHỐI LƯỢNG</td><td style="width:414px">615g</td></tr><tr><td style="width:172px">LOẠI TRẦM SỬ DỤNG</td><td style="width:414px">Nhang nụ, nhang vòng</td></tr><tr><td style="width:172px">BẢO HÀNH</td><td style="width:414px">1 đổi 1 trong vòng 1 tháng nếu có lỗi kỹ thuật</td></tr><tr><td style="width:172px">SỬ DỤNG</td><td style="width:414px">Phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM LƯ ĐỒNG XÔNG TRẦM HOA SEN LỚN</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/lu_hoa_sen_dong_2_a8615294cc654d30b0495c6fc5d81e14_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Lư xông trầm hoa sen Sơn Hồng</strong>, hay còn gọi là đỉnh đồng đốt trầm được đúc bằng đồng vàng nguyên chất cao cấp với họa tiết hoa sen tinh xảo được chế tác thủ công từ bàn tay của người nghệ nhân lành nghề. Lư đốt trầm hoa sen thường được đặt trên ban thờ hoặc phòng khách để xông trầm hương vừa có tác dụng về sức khỏe, vừa có tác dụng phong thủy.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Thiết kế sản phẩm lư đốt trầm hoa sen với cấu tạo bao gồm nắp, thân và đế sở hữu nét đẹp mềm mại và truyền cảm.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Bên trong lư xông trầm có một miếng lót chống cháy để bỏ trầm hương vào. Hương trầm sẽ bay lên dần dần từ bên trong bát, chui qua những khe hở bên trên nắp bát và dần dần lan tỏa vào không khí.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong><span style="color:#f39c12">CÔNG DỤNG CỦA LƯ ĐỒNG XÔNG TRẦM</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em><strong>Lư đồng xông trầm hương hoa sen thích hợp để:</strong></em></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">- Dùng để đốt trầm, đốt nhang vòng,... thư giãn tinh thần.</p><p style="text-align: justify;">- Dùng để trang trí nhà cửa, nơi làm việc hoặc thờ cúng.</p><p style="text-align: justify;">- Dùng làm quà tặng ý nghĩa cho người thân hay bạn bè.</p><p style="text-align: justify;">- Tạo sự phong thuỷ cho nơi làm việc và mang đến may mắn cho người sử dụng.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÁCH DÙNG CỦA LƯ ĐỒNG XÔNG TRẦM HOA SEN LỚN</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Bước 1: </strong>Mở nắp của lư và để 1 nụ trầm hoặc nhang vòng có kích thước vừa vặn vào trong.&nbsp;</p><p style="text-align: justify;"><strong>Bước 2: </strong>Châm lửa đốt phần chóp của nhang nụ trầm hương, nhang vòng/khoanh trầm hương. Khi nhang trầm hương đã cháy thổi tắt lửa và đặt vào lư và đậy nắp lư lại.</p><p style="text-align: justify;"><strong>Bước 3:</strong> Bắt đầu thưởng thức hương thơm của nhang trầm hương.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></span></h2><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p>',
  NULL,
  'LƯ ĐỒNG XÔNG TRẦM HOA SEN LỚN',
  'Lư xông trầm hoa sen Sơn Hồng, hay còn gọi là đỉnh đồng đốt trầm được đúc bằng đồng vàng nguyên chất cao cấp với họa tiết hoa sen tinh xảo được chế tác thủ công từ bàn tay của người nghệ nhân lành nghề.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Phụ kiện đốt trầm',
  ARRAY['Lư đồng'],
  'published',
  '2022-12-24T12:37:45+07:00'::timestamp,
  '2023-01-13T12:47:09+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989119'),
  '1096871459',
  'Title', 'Lư đồng hoa sen lớn',
  NULL, NULL,
  NULL, NULL,
  1360000, NULL,
  NULL, NULL,
  615, 0,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989119'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_dong_1_1795c38a930147d9a2de7a511122e6e7.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989119'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_dong_2_7695f8b2d6d047c4ac9575916cacc888.jpg',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989119'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_dong_3_161c2eda9ecd4ef984bbc98a17e08c56.jpg',
  NULL,
  3,
  false
);


-- Product: LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1043989188',
  'LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ',
  'lu-dong-xong-tram-hoa-sen-nho',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN CHI TIẾT</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:177px">CHẤT LIỆU</td><td style="width:409px">Đồng đen</td></tr><tr><td style="width:177px">KHỐI LƯỢNG</td><td style="width:409px">615g</td></tr><tr><td style="width:177px">LOẠI TRẦM SỬ DỤNG</td><td style="width:409px">Nhang nụ, nhang vòng</td></tr><tr><td style="width:177px">BẢO HÀNH</td><td style="width:409px">1 đổi 1 trong vòng 1 tháng nếu có lỗi kỹ thuật</td></tr><tr><td style="width:177px">SỬ DỤNG</td><td style="width:409px">Phù hợp với những người yêu thích phong thuỷ, thờ cúng, thưởng trà hay thiền tịnh tâm.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/lu_hoa_sen_1_87e71b3b01bb4361ac71726c898e7dd7_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Lư xông trầm hoa sen nhỏ Sơn Hồng</strong>, hay còn gọi là đỉnh đồng đốt trầm được đúc bằng đồng vàng nguyên chất cao cấp với họa tiết hoa sen tinh xảo được chế tác thủ công từ bàn tay của người nghệ nhân lành nghề. Lư đốt trầm hoa sen thường được đặt trên ban thờ hoặc phòng khách để xông trầm hương vừa có tác dụng về sức khỏe, vừa có tác dụng phong thủy.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Lư xông trầm hoa sen của thương hiệu Sơn Hồng</em> được ưa chuộng vì có thiết kế sang trọng, nhỏ gọn, giá cả phù hợp, hoa văn tinh xảo toát lên từ chất liệu.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Bên trong lư xông trầm có một miếng lót chống cháy để bỏ trầm hương vào. Hương trầm sẽ bay lên dần dần từ bên trong bát, chui qua những khe hở bên trên nắp bát và dần dần lan tỏa vào không khí.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA LƯ ĐỒNG XÔNG TRẦM</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em><strong>Lư đồng xông trầm hương hoa sen nhỏ thích hợp để:</strong></em></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">- Dùng để đốt trầm, đốt nhang vòng,... thư giãn tinh thần.</p><p style="text-align: justify;">- Dùng để trang trí nhà cửa, nơi làm việc hoặc thờ cúng.</p><p style="text-align: justify;">- Dùng làm quà tặng ý nghĩa cho người thân hay bạn bè.</p><p style="text-align: justify;">- Tạo sự phong thuỷ cho nơi làm việc và mang đến may mắn cho người sử dụng.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÁCH DÙNG CỦA LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Bước 1:</strong> Mở nắp của lư và để 1 nụ trầm hoặc nhang vòng có kích thước vừa vặn vào trong.&nbsp;</p><p style="text-align: justify;"><strong>Bước 2:</strong> Châm lửa đốt phần chóp của nhang nụ trầm hương, nhang vòng/khoanh trầm hương. Khi nhang trầm hương đã cháy thổi tắt lửa và đặt vào lư và đậy nắp lư lại.</p><p style="text-align: justify;"><strong>Bước 3: </strong>Bắt đầu thưởng thức hương thơm của nhang trầm hương.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.<br>&nbsp;</p>',
  NULL,
  'LƯ ĐỒNG XÔNG TRẦM HOA SEN NHỎ',
  'Lư xông trầm hoa sen của thương hiệu Sơn Hồng được ưa chuộng vì có thiết kế sang trọng, nhỏ gọn, giá cả phù hợp, hoa văn tinh xảo toát lên từ chất liệu.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Phụ kiện đốt trầm',
  ARRAY['Lư đồng'],
  'published',
  '2022-12-24T12:46:13+07:00'::timestamp,
  '2022-12-28T21:42:36+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989188'),
  '1096871708',
  'Title', 'Lư đồng hoa sen nhỏ',
  NULL, NULL,
  NULL, NULL,
  360000, NULL,
  NULL, NULL,
  315, 2,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989188'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_1_e982f947977c444881c00e438d509b96.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989188'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_2_291d3bfd84e94ca0a8f79a2e981eef50.jpg',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043989188'),
  'https://product.hstatic.net/200000591825/product/lu_hoa_sen_3_ec42ef2af04a4438a7d5bc13cc3ebab3.jpg',
  NULL,
  3,
  false
);


-- Product: VÒNG TRẦM HƯƠNG TỲ HƯU VÀNG 24K - TRẦM HƯƠNG CHÌM LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1043990248',
  'VÒNG TRẦM HƯƠNG TỲ HƯU VÀNG 24K - TRẦM HƯƠNG CHÌM LOẠI 1',
  'vong-tram-huong-ty-huu-vang-24k',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">TRẦM HƯƠNG TỲ HƯU VÀNG CAO CẤP</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong><br>&nbsp;</p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:180px">SỐ HẠT</td><td style="width:406px">18 hạt trầm + 1 charm tì hưu vàng 24K</td></tr><tr><td style="width:180px">KÍCH THƯỚC</td><td style="width:406px">10mm</td></tr><tr><td style="width:180px">LOẠI TRẦM</td><td style="width:406px">Trầm hương chìm loại 1 cao cấp</td></tr><tr><td style="width:180px">ĐẶC TÍNH</td><td style="width:406px">Mùi thơm nồng</td></tr><tr><td style="width:180px">LOẠI CHARM</td><td style="width:406px">Charm hình tỳ hưu bằng vàng 24K</td></tr><tr><td style="width:180px">BỘ SẢN PHẨM GỒM</td><td style="width:406px">- Vòng Trầm hương chìm cao cấp mix charm tỳ hưu bằng vàng 24K<br>- 01 Hộp gấm bảo quản vòng<br>- 01 Thẻ Bảo Hành</td></tr><tr><td style="width:180px">BẢO HÀNH</td><td style="width:406px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr><tr><td style="width:180px">SỬ DỤNG</td><td style="width:406px">Quà tặng bạn bè, người thân, đối tác làm ăn,.. mang lại may mắn, bình an, tài lộc và thịnh vượng, phát đạt</td></tr><tr><td style="width:180px">CÁCH BẢO QUẢN VÒNG</td><td style="width:406px">Nên để vòng vào lọ thuỷ tinh (tốt nhất là có sẵn một ít bột trầm để hút ẩm và giữ hương thơm bền). Sau khi đeo một thời gian dây sẽ giảm mùi thơm, khi bỏ lại vào hũ thuỷ tinh để dưỡng hương thì vòng sẽ thơm lại một cách tự nhiên</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM VÒNG TRẦM HƯƠNG TỲ HƯU VÀNG CAO CẤP</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/toc_mix_ty_huu_3_3eecc58cc122416fa9d4e91e42ef83e7_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Vòng trầm hương mix Tỳ hưu vàng</strong> của Sơn Hồng mang vẻ đẹp thời thượng, sang trọng và cực kỳ tinh tế kết hợp với charm Tỳ Hưu Vàng làm tôn thêm vẻ sang trọng, phú quý.&nbsp;Mẫu thiết kế vô cùng thích hợp cho những ai theo đuổi sự tối giản, cổ điển nhưng cũng mang nét tinh tế, đẳng cấp.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Không chỉ vậy, chiếc vòng còn là một báu vật được hình thành nhờ sự kết tinh độc đáo từ Trầm hương – Linh khí của trời đất&nbsp; và Tỳ Hưu Thiên Lộc – Linh Thú bảo vệ của cải, mang lại sự giàu sang.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Vòng tay Trầm Hương Tỳ Hưu Vàng Sơn Hồng</em>&nbsp;được làm từ trầm hương chìm loại 1,&nbsp;sở hữu mùi hương nồng, đậm...&nbsp;giúp người đeo xua tan cảm giác mệt mỏi, u sầu, giải tỏa stress cũng như xoa dịu những nỗi buồn trong cuộc sống.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>Ý NGHĨA CỦA BIỂU TƯỢNG CỦA TỲ HƯU VÀNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Trong phong thủy, linh vật Tỳ hưu mang ý nghĩa lớn lao, có tác dụng xua đuổi tà khí và mang lại sự may mắn, tài lộc và bình an cho gia chủ. Đeo trang sức Tỳ hưu là một lựa chọn khôn khéo để giúp bản thân chiêu tài đắc lộc hơn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong><span style="color:#f39c12">CÔNG DỤNG CỦA VÒNG TRẦM HƯƠNG TỲ HƯU</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Chiếc vòng trầm hương tỳ hưu vàng 24k mang đến cho người đeo vẻ đẹp quyền lực và vô cùng đẳng cấp. Không chỉ vậy, khi đeo chúng còn mang lại sự thanh thản, trí tuệ về cảm xúc cho nơi làm việc và trong cuộc sống. Một chiếc vòng tay đơn giản với trầm hương Tỳ hưu&nbsp;sẽ khiến bạn trông thành đạt&nbsp;và quyền lực hơn.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng trầm hương mix tỳ hưu giúp thu hút may mắn, tài lộc và thuận lợi trong làm ăn, đàm phán. Đồng thời giúp giữ tài, giữ lộc cho chủ sở hữu của mình.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br><strong>QUY TRÌNH SẢN XUẤT VÒNG TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/qtct-5_b4fc5c3526894490bde30264cf1ee3ae_1024x1024.jpg"></p><p>&nbsp;</p>',
  NULL,
  'VÒNG TRẦM HƯƠNG TỲ HƯU VÀNG 24K',
  'Vòng trầm hương mix Tỳ hưu vàng của Sơn Hồng mang vẻ đẹp thời thượng, sang trọng và cực kỳ tinh tế kết hợp với charm Tỳ Hưu Vàng làm tôn thêm vẻ sang trọng, phú quý.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['CAO CẤP', 'NAM', 'chìm'],
  'published',
  '2022-12-24T14:51:10+07:00'::timestamp,
  '2023-02-03T22:52:10+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043990248'),
  '1096874670',
  'Title', 'Vòng trầm hương tỳ hưu vàng',
  NULL, NULL,
  NULL, NULL,
  90000000, NULL,
  NULL, NULL,
  100, 5,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043990248'),
  'https://product.hstatic.net/200000591825/product/toc_mix_ty_huu_3_b1f2017f7dd241d4a49fee660d8fecb7.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043990248'),
  'https://product.hstatic.net/200000591825/product/toc_mix_ty_huu_1_4f6d756dd6de4a07bea8e576fceca858.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1043990248'),
  'https://product.hstatic.net/200000591825/product/toc_mix_ty_huu_2_2fae8efa2f5d4b70b3762e0448642a09.png',
  NULL,
  3,
  false
);


-- Product: VÒNG TRẦM HƯƠNG CHÌM 9 TRỤ ĐỐT TRÚC CAO CẤP - TRẦM HƯƠNG LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044029229',
  'VÒNG TRẦM HƯƠNG CHÌM 9 TRỤ ĐỐT TRÚC CAO CẤP - TRẦM HƯƠNG LOẠI 1',
  'vong-tram-huong-chim-9-tru-dot-truc-cao-cap-tram-huong-loai-1',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">VÒNG TRẦM HƯƠNG&nbsp;9 TRỤ ĐỐT TRÚC&nbsp;</span></strong></h1><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:661px"><tbody><tr><td style="width:177px">SỐ HẠT</td><td style="width:470px">9 đốt và 9 hạt</td></tr><tr><td style="width:177px">KÍCH THƯỚC</td><td style="width:470px">11mm</td></tr><tr><td style="width:177px">LOẠI TRẦM</td><td style="width:470px">Trầm hương chìm loại 1, cao cấp, quý hiếm</td></tr><tr><td style="width:177px">ĐẶC TÍNH</td><td style="width:470px">Thơm nồng, màu trầm sẫm, vân trầm nổi bật,&nbsp;nặng hơn các loại khác, khi thả xuống nước chìm hoàn toàn</td></tr><tr><td style="width:177px">BỘ SẢN PHẨM GỒM</td><td style="width:470px">- 01 Vòng Trầm hương 9 đốt, 9 hạt cao cấp<br>- 01 Hộp gấm bảo quản vòng<br>- 01 Thẻ Bảo Hành</td></tr><tr><td style="width:177px">BẢO HÀNH</td><td style="width:470px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr><tr><td style="width:177px">SỬ DỤNG</td><td style="width:470px">Quà tặng bạn bè, người thân, đối tác làm ăn,.. mang lại may mắn, bình an, tài lộc và thịnh vượng, phát đạt</td></tr><tr><td style="width:177px">CÁCH BẢO QUẢN VÒNG</td><td style="width:470px">Nên để vòng vào lọ thuỷ tinh (tốt nhất là có sẵn một ít bột trầm để hút ẩm và giữ hương thơm bền). Sau khi đeo một thời gian dây sẽ giảm mùi thơm, khi bỏ lại vào hũ thuỷ tinh để dưỡng hương thì vòng sẽ thơm lại một cách tự nhiên</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM VÒNG TRẦM HƯƠNG 9 TRỤ ĐỐT TRÚC CAO CẤP</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/vong_dot_truc_9_khuc_5_8d0c57eaeb92465e8ca8e2ed0040ecd9_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Vòng trầm hương chìm 9 trụ 9 hạt cao cấp</strong> mang vẻ đẹp cổ điển và sang trọng. Không giống như những chiếc vòng được mài, đẽo bằng máy thủ công. Chiếc vòng 9 đốt 9 hạt cao cấp nhà Sơn Hồng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng tay Trầm Hương 9 trụ cao cấp Sơn Hồng được làm từ gỗ trầm hương chìm loại 1 vô cùng quý hiếm, vì là trầm loại 1 nên tinh dầu trong vòng nhiều, mùi hương nồng giúp người đeo xua tan cảm giác mệt mỏi, u sầu, giải tỏa stress cũng như xoa dịu những nỗi buồn trong cuộc sống.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>Ý NGHĨA CỦA BIỂU TƯỢNG CỦA 9 TRỤ 9 HẠT</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Thường vòng tay được kết từ 9 trụ 9 hạt, thường được gọi là “cửu cửu”. Theo quan niệm phương Đông, số 9 là số lớn nhất trong dãy số tự nhiên, mang cực dương và chứa đựng rất nhiều ý nghĩa tốt lành. Số 9 còn là biểu tượng cho sự bền vững, mang ý nghĩa tiền tài kéo dài, phát tài phát lộc.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong><span style="color:#f39c12">CÔNG DỤNG CỦA VÒNG TRẦM HƯƠNG 9 TRỤ ĐỐT TRÚC</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Chiếc vòng trầm hương 9 trụ 9 hạt mang đến cho người đeo vẻ đẹp nguyên sơ và vô cùng đẳng cấp. Không chỉ vậy, khi đeo chúng còn mang lại sự thanh thản, trí tuệ về cảm xúc cho nơi làm việc và trong cuộc sống. Một chiếc vòng tay đơn giản với trầm hương Đồng Tiền Tài Lộc sẽ khiến bạn trông hấp dẫn và quyền lực hơn.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng tay gỗ Trầm Hương Trụ Trúc Sơn Hồng tôn lên sự mạnh mẽ, quyết đoán, dẻo dai, vững bền và rắn rỏi của người đàn ông. Đeo một chiếc vòng tay bên tay trái trong các buổi họp, buổi đấu thầu, hội nghị quan trọng sẽ giúp gia chủ gặp rủi hóa may, đạt được sự thuận lợi.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br><strong>QUY TRÌNH SẢN XUẤT VÒNG TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/qtct-5_b4fc5c3526894490bde30264cf1ee3ae_1024x1024.jpg"></p><p>&nbsp;</p>',
  NULL,
  'VÒNG TRẦM HƯƠNG CHÌM 9 TRỤ ĐỐT TRÚC CAO CẤP - TRẦM HƯƠNG LOẠI 1',
  'Vòng trầm hương chìm 9 trụ 9 hạt cao cấp mang vẻ đẹp cổ điển và sang trọng. Không giống như những chiếc vòng được mài, đẽo bằng máy thủ công. Chiếc vòng 9 đốt 9 hạt cao cấp nhà Sơn Hồng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['CAO CẤP', 'NAM', 'đốt trúc', 'chìm', 'trơn'],
  'published',
  '2022-12-25T23:02:49+07:00'::timestamp,
  '2022-12-29T10:01:38+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  '1096977884',
  'Title', 'vòng trầm 9 trụ đốt trúc',
  NULL, NULL,
  NULL, NULL,
  48000000, NULL,
  NULL, NULL,
  100, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_9_khuc_2_41b84d821f8b48ce9cab4847b91c738c.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_9_khuc_3_6c49a82799bd43509e1f030d3b0212b1.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_9_khuc_4_d78da7dda317460d98ce7b7b104f4fc7.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_9_khuc_5_055162eae2294c48b79d023ea6bd20d5.png',
  NULL,
  4,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029229'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_9_khuc_6_ea64dcbc1a994e1f8af861508cb9bc59.png',
  NULL,
  5,
  false
);


-- Product: VÒNG TAY TRẦM HƯƠNG CHÌM ĐƠN CAO CẤP - TRẦM HƯƠNG LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044029343',
  'VÒNG TAY TRẦM HƯƠNG CHÌM ĐƠN CAO CẤP - TRẦM HƯƠNG LOẠI 1',
  'vong-tay-tram-huong-chim-don-cao-cap-tram-huong-loai-1',
  '<h2 style="text-align: center;"><strong><span style="color:#f39c12">VÒNG TAY TRẦM HƯƠNG CHÌM ĐƠN CAO CẤP</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:166px">SỐ HẠT</td><td style="width:420px">23 hạt trầm hương chìm loại 1</td></tr><tr><td style="width:166px">KÍCH THƯỚC</td><td style="width:420px">8mm</td></tr><tr><td style="width:166px">LOẠI TRẦM</td><td style="width:420px">Trầm hương chìm loại 1, cao cấp, quý hiếm</td></tr><tr><td style="width:166px">ĐẶC TÍNH</td><td style="width:420px">Thơm nồng, màu trầm sẫm, vân trầm nổi bật</td></tr><tr><td style="width:166px">BỘ SẢN PHẨM GỒM</td><td style="width:420px">- 01 Vòng Trầm hương chìm đơn hạt tròn<br>- 01 Hộp gấm bảo quản vòng<br>- 01 Thẻ Bảo Hành</td></tr><tr><td style="width:166px">BẢO HÀNH</td><td style="width:420px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr><tr><td style="width:166px">SỬ DỤNG</td><td style="width:420px">Quà tặng bạn bè, người thân, đối tác làm ăn,.. mang lại may mắn, bình an, tài lộc và thịnh vượng, phát đạt</td></tr><tr><td style="width:166px">CÁCH BẢO QUẢN VÒNG</td><td style="width:420px">Nên để vòng vào lọ thuỷ tinh (tốt nhất là có sẵn một ít bột trầm để hút ẩm và giữ hương thơm bền). Sau khi đeo một thời gian dây sẽ giảm mùi thơm, khi bỏ lại vào hũ thuỷ tinh để dưỡng hương thì vòng sẽ thơm lại một cách tự nhiên</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM VÒNG TRẦM HƯƠNG CHÌM ĐƠN CAO CẤP</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/toc_tron_23_hat_7_dffd8f680763424d9e5b3d9ba188af5b_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Vòng trầm hương chìm đơn cao cấp</strong> mang vẻ đẹp cổ điển và sang trọng. Không giống như những chiếc vòng được mài, đẽo bằng máy thủ công. Chiếc vòng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Vòng tay Trầm Hương đơn tròn</em>&nbsp;Sơn Hồng được làm từ gỗ trầm hương chìm loại 1 vô cùng quý hiếm, vì là trầm loại 1 nên tinh dầu trong vòng nhiều, mùi hương nồng đặc biệt giúp người đeo xua tan cảm giác mệt mỏi, u sầu, giải tỏa stress cũng như xoa dịu những nỗi buồn trong cuộc sống.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>Ý NGHĨA CỦA HẠT TRẦM HƯƠNG TRÒN&nbsp;</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Được làm thủ công tinh xảo, Hạt trầm hương Tròn đơn tượng trưng cho sự giản dị, truyền thống, thích hợp cho những người ưa chuộng phong cách cổ điển, nhẹ nhàng. Hạt tròn đơn giản, không cầu kỳ nhưng vẫn giữ được sự đẳng cấp riêng và mang nhiều ý nghĩa trong phong thủy.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA VÒNG TRẦM HƯƠNG ĐƠN</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng tay trầm hương đơn cao cấp Sơn Hồng mang đến sự bình an, thành công, thịnh vượng, cho những người đeo nó. Bên cạnh đó, đây còn là chiếc bùa hộ mệnh của chủ nhân, giúp họ vượt qua nhiều sóng gió, khó khăn của cuộc sống</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br><strong>QUY TRÌNH SẢN XUẤT VÒNG TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/qtct-5_b4fc5c3526894490bde30264cf1ee3ae_1024x1024.jpg"></p><p>&nbsp;</p>',
  NULL,
  'VÒNG TAY TRẦM HƯƠNG CHÌM ĐƠN CAO CẤP - TRẦM HƯƠNG LOẠI 1',
  'Vòng trầm hương chìm đơn cao cấp mang vẻ đẹp cổ điển và sang trọng. Không giống như những chiếc vòng được mài, đẽo bằng máy thủ công. Chiếc vòng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['CAO CẤP', 'NAM', 'chìm', 'TỐC ĐƠN', 'trơn'],
  'published',
  '2022-12-25T23:20:52+07:00'::timestamp,
  '2023-01-03T08:54:24+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  '1096978229',
  'Title', 'vòng trầm hương chìm đơn',
  NULL, NULL,
  NULL, NULL,
  90000000, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  'https://product.hstatic.net/200000591825/product/toc_tron_23_hat_4_c5fc71dadf1a451f863ed2d9bd7c1ed9.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  'https://product.hstatic.net/200000591825/product/toc_tron_23_hat_7_933e0d3b6d1a40feb11c78af6effa465.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  'https://product.hstatic.net/200000591825/product/toc_tron_23_hat_3_ff9b44784d28465da6a32b50b332b3ca.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  'https://product.hstatic.net/200000591825/product/toc_tron_23_hat_5_db5c3c52ea96468b99a03bba6580e5a5.png',
  NULL,
  4,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029343'),
  'https://product.hstatic.net/200000591825/product/toc_tron_23_hat_6_ab9f012f17a340baa6a9e5ad40e4d2dc.png',
  NULL,
  5,
  false
);


-- Product: VÒNG TRẦM HƯƠNG 7 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044029423',
  'VÒNG TRẦM HƯƠNG 7 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1',
  'vong-tram-huong-7-tru-dot-truc-tram-huong-chim-loai-1',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">VÒNG TRẦM HƯƠNG 7 TRỤ ĐỐT TRÚC CAO CẤP</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:167px">SỐ HẠT</td><td style="width:419px">7 trụ lớn và 7 trụ nhỏ</td></tr><tr><td style="width:167px">KÍCH THƯỚC</td><td style="width:419px">10mm</td></tr><tr><td style="width:167px">LOẠI TRẦM</td><td style="width:419px">Trầm hương chìm loại 1, cao cấp, quý hiếm</td></tr><tr><td style="width:167px">ĐẶC TÍNH</td><td style="width:419px">Thơm nồng, màu trầm sẫm, vân trầm nổi bật</td></tr><tr><td style="width:167px">BỘ SẢN PHẨM GỒM</td><td style="width:419px">- 01 Vòng Trầm hương chìm 7 trụ đốt trúc cao cấp<br>- 01 Hộp gấm bảo quản vòng<br>- 01 Thẻ Bảo Hành</td></tr><tr><td style="width:167px">BẢO HÀNH</td><td style="width:419px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr><tr><td style="width:167px">SỬ DỤNG</td><td style="width:419px">Quà tặng bạn bè, người thân, đối tác làm ăn,.. mang lại may mắn, bình an, tài lộc và thịnh vượng, phát đạt</td></tr><tr><td style="width:167px">CÁCH BẢO QUẢN VÒNG</td><td style="width:419px">Nên để vòng vào lọ thuỷ tinh (tốt nhất là có sẵn một ít bột trầm để hút ẩm và giữ hương thơm bền). Sau khi đeo một thời gian dây sẽ giảm mùi thơm, khi bỏ lại vào hũ thuỷ tinh để dưỡng hương thì vòng sẽ thơm lại một cách tự nhiên</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong><span style="color:#f39c12">MÔ TẢ SẢN PHẨM VÒNG TRẦM HƯƠNG 7 TRỤ CAO CẤP</span></strong></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/vong_7_khuc_3_89900280dfb2436f890d1e5f57b378d1_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Vòng trầm hương chìm 7 trụ cao cấp</strong> mang vẻ đẹp cổ điển và sang trọng. Chiếc vòng&nbsp;được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Vòng tay Trầm Hương 7 trụ cao cấp Sơn Hồng </em>được làm từ gỗ trầm hương chìm loại 1 vô cùng quý hiếm, vì là trầm loại 1 nên tinh dầu trong vòng nhiều, mùi hương nồng giúp người đeo xua tan cảm giác mệt mỏi, u sầu, giải tỏa stress cũng như xoa dịu những nỗi buồn trong cuộc sống.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA VÒNG TRẦM HƯƠNG 7 TRỤ ĐỐT TRÚC</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Chiếc vòng trầm hương 7 trụ lớn và 7 trụ nhỏ mang đến cho người đeo vẻ đẹp nguyên sơ và vô cùng đẳng cấp. Không chỉ vậy, khi đeo chúng còn mang lại sự thanh thản, trí tuệ về cảm xúc cho nơi làm việc và trong cuộc sống. Một chiếc vòng tay đơn giản với trầm hương Đồng Tiền Tài Lộc sẽ khiến bạn trông hấp dẫn và quyền lực hơn.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng tay gỗ Trầm Hương Trụ Trúc Sơn Hồng tôn lên sự mạnh mẽ, quyết đoán, dẻo dai, vững bền và rắn rỏi của người đàn ông. Đeo một chiếc vòng tay bên tay trái trong các buổi họp, buổi đấu thầu, hội nghị quan trọng sẽ giúp gia chủ gặp rủi hóa may, đạt được sự thuận lợi.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>QUY TRÌNH SẢN XUẤT VÒNG TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/qtct-5_b4fc5c3526894490bde30264cf1ee3ae_1024x1024.jpg"></p><p style="text-align: justify;"><br>&nbsp;</p>',
  NULL,
  'VÒNG TRẦM HƯƠNG 7 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1',
  'Vòng trầm hương chìm 7 trụ cao cấp mang vẻ đẹp cổ điển và sang trọng. Không giống như những chiếc vòng được mài, đẽo bằng máy thủ công. Chiếc vòng 9 đốt 9 hạt cao cấp nhà Sơn Hồng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['CAO CẤP', 'NAM', 'đốt trúc', 'chìm', 'trơn'],
  'published',
  '2022-12-25T23:40:14+07:00'::timestamp,
  '2023-01-10T10:18:17+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029423'),
  '1096978408',
  'Title', 'Vòng trầm hương 7 trụ',
  NULL, NULL,
  NULL, NULL,
  48000000, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029423'),
  'https://product.hstatic.net/200000591825/product/vong_7_khuc_1_18dc10d0c9054c1fb54fd7f68774e77b.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029423'),
  'https://product.hstatic.net/200000591825/product/vong_7_khuc_2_59dbf407ed144a3788f58afa545e7c93.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029423'),
  'https://product.hstatic.net/200000591825/product/vong_7_khuc_3_6595febc9cc440e9bc2fbb42a41b1a26.png',
  NULL,
  3,
  false
);


-- Product: VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044029987',
  'VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1',
  'vong-tram-huong-10-tru-dot-truc-tram-huong-chim-loai-1',
  '<h2 style="text-align: center;"><strong><span style="color:#f39c12">VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC CAO CẤP</span></strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:172px">SỐ HẠT</td><td style="width:414px">10 trụ và 10 hạt</td></tr><tr><td style="width:172px">KÍCH THƯỚC</td><td style="width:414px">10mm</td></tr><tr><td style="width:172px">LOẠI TRẦM</td><td style="width:414px">Trầm hương chìm loại 1, cao cấp, quý hiếm</td></tr><tr><td style="width:172px">ĐẶC TÍNH</td><td style="width:414px">Thơm nồng, màu trầm sẫm, vân trầm nổi bật</td></tr><tr><td style="width:172px">BỘ SẢN PHẨM GỒM</td><td style="width:414px">- 01 Vòng Trầm hương chìm 10 trụ, 10 hạt cao cấp<br>- 01 Hộp gấm bảo quản vòng<br>- 01 Thẻ Bảo Hành</td></tr><tr><td style="width:172px">BẢO HÀNH</td><td style="width:414px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr><tr><td style="width:172px">SỬ DỤNG</td><td style="width:414px">Quà tặng bạn bè, người thân, đối tác làm ăn,.. mang lại may mắn, bình an, tài lộc và thịnh vượng, phát đạt</td></tr><tr><td style="width:172px">CÁCH BẢO QUẢN VÒNG:</td><td style="width:414px">Nên để vòng vào lọ thuỷ tinh (tốt nhất là có sẵn một ít bột trầm để hút ẩm và giữ hương thơm bền). Sau khi đeo một thời gian dây sẽ giảm mùi thơm, khi bỏ lại vào hũ thuỷ tinh để dưỡng hương thì vòng sẽ thơm lại một cách tự nhiên</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC CAO CẤP</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/vong_dot_truc_10_khuc_2_80ae019626f34db3bc6b5e9e682b7806_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Vòng trầm hương chìm 10 trụ cao cấp </strong>mang vẻ đẹp hoang sơ và vô cùng đẳng cấp, rất thích hợp với những người thích vẻ đẹp đơn sơ của Trầm hương. Chiếc vòng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Vòng tay Trầm Hương 10 trụ cao cấp Sơn Hồng được làm từ gỗ trầm hương chìm loại 1 vô cùng quý hiếm, vì là trầm loại 1 nên tinh dầu trong vòng nhiều, mùi hương nồng giúp người đeo xua tan cảm giác mệt mỏi, u sầu, giải tỏa stress cũng như xoa dịu những nỗi buồn trong cuộc sống.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>Ý NGHĨA CỦA VÒNG TAY&nbsp;ĐỐT TRÚC</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Trúc Đơn gắn liền với hình ảnh cây trúc – một loài cây quen thuộc với cuộc sống, đã trở thành một biểu tượng cho khí chất thanh cao của con người. Trúc là biểu tượng của người quân tử bởi loài cây này tuy cứng cáp mà vẫn dẻo dai, đổ mà không gãy, rỗng ruột tượng trưng cho sự rắn rỏi, kiên cường của con người trước bao nhiêu bão tố, phong ba, nhưng tâm hồn vẫn an nhiên, tự tại, không chạy theo quyền uy, vật chất.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Chiếc vòng trầm hương 10 trụ 10 hạt mang đến cho người đeo vẻ đẹp nguyên sơ và vô cùng đẳng cấp. Vòng tay trầm hương với hình dạng đốt trúc, mang đến cho người đeo nguồn năng lượng tích cực, sự tự tin, quyết tâm đến cùng, thúc đẩy việc kinh doanh buôn bán ngày càng thành công, tốt đẹp.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br><strong>QUY TRÌNH SẢN XUẤT VÒNG TAY TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/qtct-5_b4fc5c3526894490bde30264cf1ee3ae_1024x1024.jpg"></p><p>&nbsp;</p>',
  NULL,
  'VÒNG TRẦM HƯƠNG 10 TRỤ ĐỐT TRÚC - TRẦM HƯƠNG CHÌM LOẠI 1',
  'Vòng trầm hương chìm 10 trụ cao cấp mang vẻ đẹp hoang sơ và vô cùng đẳng cấp, rất thích hợp với những người thích vẻ đẹp đơn sơ của Trầm hương. Chiếc vòng được làm hoàn toàn thủ công, với những đường đẽo gọt tự nhiên làm nổi bật nên các vân trầm.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['CAO CẤP', 'NAM', 'đốt trúc', 'chìm', 'trơn'],
  'published',
  '2022-12-25T23:53:46+07:00'::timestamp,
  '2022-12-31T12:36:08+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029987'),
  '1096979154',
  'Title', 'Vòng trầm hương chìm 10 trụ',
  NULL, NULL,
  NULL, NULL,
  48000000, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029987'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_10_khuc_1_c8930d609f8c44b6bb215d255444c9d1.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029987'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_10_khuc_2_f8db6388a1bc4ff8a02d144cc7669f41.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029987'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_10_khuc_3_d167b2da056b4c53b7f7d477d87a5675.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044029987'),
  'https://product.hstatic.net/200000591825/product/vong_dot_truc_10_khuc_5_bbe8fe49d546491188d98d6b17f22cc6.png',
  NULL,
  4,
  false
);


-- Product: MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - MẪU 1 - TRẦM HƯƠNG CHÌM LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044060090',
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - MẪU 1 - TRẦM HƯƠNG CHÌM LOẠI 1',
  'mat-day-chuyen-tram-huong-boc-vang-tram-huong-chim-loai-1-mau-1',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:192px">KÍCH THƯỚC</td><td style="width:394px">&nbsp;</td></tr><tr><td style="width:192px">LOẠI TRẦM</td><td style="width:394px">Trầm hương tự nhiên loại 1</td></tr><tr><td style="width:192px">BẢO HÀNH</td><td style="width:394px">1 ĐÔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr></tbody></table><p style="text-align: justify;"><br>&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG&nbsp;</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/dc4-4_09433640d08b47ab9ab3ac33fc3a75a2_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Mặt dây chuyền trầm hương Sơn Hồng </strong>được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Là sản phẩm có ý nghĩa và giá trị cao, mặt dây chuyền trầm hương có thể dùng làm quà tặng cao cấp cho bạn bè, người thân, đối tác và đồng nghiệp để gia tăng mối quan hệ tốt hơn cho bạn.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA MẶT DÂY CHUYỀN GỖ TRẦM HƯƠNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Mặt dây chuyền gỗ trầm hương cao cấp</em> mix vàng giúp thu hút may mắn, tài lộc và thuận lợi trong làm ăn, đàm phán. Đồng thời giúp giữ tài, giữ lộc cho chủ sở hữu của mình.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;">&nbsp;</p>',
  NULL,
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - TRẦM HƯƠNG CHÌM LOẠI 1 - MẪU 1',
  'Mặt dây chuyền trầm hương Sơn Hồng được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['mặt dây chuyền'],
  'published',
  '2022-12-26T14:23:26+07:00'::timestamp,
  '2022-12-26T14:34:44+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044060090'),
  '1097048899',
  'Title', 'mặt dây chuyền mẫu 1',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044060090'),
  'https://product.hstatic.net/200000591825/product/dc4-2_835fd35958a84ded8d64b737aa2eec2d.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044060090'),
  'https://product.hstatic.net/200000591825/product/dc4-1_c1ee0fc36efe4d1795491b82da6c42a6.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044060090'),
  'https://product.hstatic.net/200000591825/product/dc4-3_d7b329626f254c97b687fc698dda1a20.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044060090'),
  'https://product.hstatic.net/200000591825/product/dc4-4_e6e700d2ba0f415fb47c4ff10a551396.png',
  NULL,
  4,
  false
);


-- Product: MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - MẪU 2 - TRẦM HƯƠNG CHÌM LOẠI 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044061543',
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - MẪU 2 - TRẦM HƯƠNG CHÌM LOẠI 1',
  'mat-day-chuyen-tram-huong-boc-vang-mau-2-tram-huong-chim-loai-1',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG</span></strong></h1><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:171px">KÍCH THƯỚC</td><td style="width:415px">&nbsp;</td></tr><tr><td style="width:171px">LOẠI TRẦM</td><td style="width:415px">Trầm hương tự nhiên loại 1</td></tr><tr><td style="width:171px">BẢO HÀNH</td><td style="width:415px">1 ĐỔI 1 trong vòng 1 THÁNG nếu có lỗi kỹ thuật</td></tr></tbody></table><p style="text-align: justify;"><br>&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/dc15-3_a67bb3a0d9a44878b6e22986d057fdf4_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Mặt dây chuyền trầm hương Sơn Hồng</strong> được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Là sản phẩm có ý nghĩa và giá trị cao, mặt dây chuyền trầm hương có thể dùng làm quà tặng cao cấp cho bạn bè, người thân, đối tác và đồng nghiệp để gia tăng mối quan hệ tốt hơn cho bạn.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA MẶT DÂY CHUYỀN GỖ TRẦM HƯƠNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Mặt dây chuyền gỗ trầm hương cao cấp mix vàng giúp thu hút may mắn, tài lộc và thuận lợi trong làm ăn, đàm phán. Đồng thời giúp giữ tài, giữ lộc cho chủ sở hữu của mình.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br>&nbsp;</p>',
  NULL,
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG BỌC VÀNG - MẪU 2 - TRẦM HƯƠNG CHÌM LOẠI 1',
  'Mặt dây chuyền trầm hương Sơn Hồng được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['mặt dây chuyền'],
  'published',
  '2022-12-26T14:39:07+07:00'::timestamp,
  '2023-01-10T10:14:23+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044061543'),
  '1097053744',
  'Title', 'mặt dây chuyền mẫu 2',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044061543'),
  'https://product.hstatic.net/200000591825/product/dc15-1_990262132e2e4e7d82bb920ac70cc55f.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044061543'),
  'https://product.hstatic.net/200000591825/product/dc15-2_dbb8655e6806425e890c700066fcf6b9.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044061543'),
  'https://product.hstatic.net/200000591825/product/dc15-3_7a5a5d97349849ef93e221a5576db522.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044061543'),
  'https://product.hstatic.net/200000591825/product/dc15-4_f8f4589efbdf48809be1f998bd527b22.png',
  NULL,
  4,
  false
);


-- Product: MẶT DÂY CHUYỀN TRẦM HƯƠNG TỰ NHIÊN LOẠI 1 - MẪU 3
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1044062329',
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG TỰ NHIÊN LOẠI 1 - MẪU 3',
  'mat-d-y-chuyen-tram-huong-tu-nhien-loai-1-mau-3',
  '<h1 style="text-align: center;"><strong><span style="color:#f39c12">DÂY CHUYỀN TRẦM HƯƠNG TỰ NHIÊN&nbsp;</span></strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:600px"><tbody><tr><td style="width:151px">KÍCH THƯỚC</td><td style="width:435px">&nbsp;</td></tr><tr><td style="width:151px">LOẠI TRẦM</td><td style="width:435px">Trầm hương tự nhiên loại 1</td></tr><tr><td style="width:151px">BẢO HÀNH</td><td style="width:435px">1 ĐỔI 1 trong vòng 1 tháng nếu có lỗi kỹ thuật</td></tr></tbody></table><p style="text-align: justify;"><br>&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ SẢN PHẨM MẶT DÂY CHUYỀN TRẦM HƯƠNG TỰ NHIÊN&nbsp;</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/dc1-5_6eaf4904fb2e4974942e99b7a7a36242_grande.png"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Mặt dây chuyền trầm hương loại 1 Sơn Hồng </strong>được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp,&nbsp;độ già dầu rất tốt, mùi hương ngọt rất hiếm và độc lạ.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Là sản phẩm có ý nghĩa và giá trị cao, mặt dây chuyền trầm hương có thể dùng làm quà tặng cao cấp cho bạn bè, người thân, đối tác và đồng nghiệp để gia tăng mối quan hệ tốt hơn cho bạn.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>CÔNG DỤNG CỦA MẶT DÂY CHUYỀN GỖ TRẦM HƯƠNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>Mặt dây chuyền gỗ trầm hương cao cấp</em>&nbsp;giúp thu hút may mắn, tài lộc và thuận lợi trong làm ăn, đàm phán. Đồng thời giúp giữ tài, giữ lộc cho chủ sở hữu của mình.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Khi đeo mặt dây chuyền&nbsp;trầm và tiếp xúc nhiệt cơ thể, hương thơm sẽ tỏa ra liên tục, tông mùi ngọt sâu và dày sẽ khiến cho người đeo rất sảng khoái, tâm trí nhanh chóng an lành nhờ vào hương thơm ngọt rất tốt này.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;"><br>&nbsp;</p>',
  NULL,
  'MẶT DÂY CHUYỀN TRẦM HƯƠNG TỰ NHIÊN LOẠI 1 - MẪU 3',
  'Mặt dây chuyền trầm hương loại 1 Sơn Hồng được thiết kế với nhiều hình dạng khác nhau và giữ được nguyên bản sơ khai của trầm hương - linh mộc đất trời. Mặt dây được làm bằng gỗ trầm hương chìm nước với các lớp vân trầm cao cấp, độ già dầu rất tốt, mùi hương ngọt rất hiếm và độc lạ.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'VÒNG TAY',
  ARRAY['mặt dây chuyền'],
  'published',
  '2022-12-26T14:47:15+07:00'::timestamp,
  '2023-01-10T10:14:32+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044062329'),
  '1097056270',
  'Title', 'Default Title',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  60, 10,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044062329'),
  'https://product.hstatic.net/200000591825/product/dc1-1_58d1b84c438e43d286f79ee7c4607ec1.png',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044062329'),
  'https://product.hstatic.net/200000591825/product/dc1-2_68a996674eeb45c3a98001c50951e6d3.png',
  NULL,
  2,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044062329'),
  'https://product.hstatic.net/200000591825/product/dc1-4_12b29928f8cd4a0cad459670fddb7ce1.png',
  NULL,
  3,
  false
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1044062329'),
  'https://product.hstatic.net/200000591825/product/dc1-5_2988c006eacc4895bc7bd8e023eb2abe.png',
  NULL,
  4,
  false
);


COMMIT;
