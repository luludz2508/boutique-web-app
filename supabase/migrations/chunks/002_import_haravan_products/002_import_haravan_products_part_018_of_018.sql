-- 002_import_haravan_products.sql - Part 18/18
-- Generated: 2025-10-25T04:17:01.390Z
-- Contains 6 complete product records
-- Each product includes: INSERT product + variants + images

BEGIN;

-- Product: TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 1
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704470',
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 1',
  'tuong-tram-huong-ma-dao-thanh-cong-mau-1',
  '<h1 style="text-align: center;"><span style="color:#f39c12"><strong>TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 1</strong></span></h1><p>&nbsp;</p><p><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:566px"><tbody><tr><td style="width:139px">KÍCH THƯỚC</td><td style="width:414px">&nbsp;</td></tr><tr><td style="width:139px">TRỌNG LƯỢNG</td><td style="width:414px">&nbsp;</td></tr><tr><td style="width:139px">LOẠI TRẦM</td><td style="width:414px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="width:139px">ĐẶC TÍNH</td><td style="width:414px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="width:139px">BẢO HÀNH</td><td style="width:414px">Theo nhà sản xuất</td></tr></tbody></table>&nbsp;<div>&nbsp;</div><h2><strong><span style="color:#f39c12">MÔ TẢ CHI TIẾT SẢN PHẨM</span></strong></h2><div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242049135_2c651656ae66c509b61ee1e23f140782_4f3b16b2718a4f9e80ccc5e7e56d0e49_grande.jpg"></p><p>&nbsp;</p></div><div><p><strong>Tượng Trầm hương Mã Đáo Thành Công</strong> là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được làm hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề, nên mỗi bức tượng là một nét chấm phá riêng biệt.</p>&nbsp;<p>Những bức tượng Mã Đáo Thành Công được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.</p>&nbsp;<p>Hình ảnh những chú ngựa trong tư thế chạy về phía trước luôn là biểu tượng "Mã Đáo Thành Công" mang ý nghĩa về sự thành công, may mắn và phát đạt trong kinh doanh, buôn bán; thể hiện sự nhanh nhạy và hỗ trợ thăng tiến trong sự nghiệp.</p><p>&nbsp;</p><p><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p>Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p>&nbsp;</p><p><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p>Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p>&nbsp;</p><p><strong>CHÚNG TÔI CAM KẾT</strong></p><p>- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p>- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p>- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p></div><div><em>* Sản phẩm được chụp thật 100% tại showroom Trầm Hương Sơn Hồng</em></div>',
  NULL,
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 1',
  'Những bức tượng Mã Đáo Thành Công được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm hương cảnh', 'trầm cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:14:43+07:00'::timestamp,
  '2023-03-24T23:15:10+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704470'),
  '1101069790',
  'Title', 'Tượng Trầm Mã Đáo Thành Công',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  5000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704470'),
  'https://product.hstatic.net/200000591825/product/z4209337534451_ed12dd2265340bbf2771af1617210277_a0226435b4ca46a295dd38d8bca954d7.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704470'),
  'https://product.hstatic.net/200000591825/product/z4173242049135_2c651656ae66c509b61ee1e23f140782_34c9e39e99e140efbf4c24cdc28ac0e8.jpg',
  NULL,
  2,
  false
);


-- Product: TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 2
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704508',
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 2',
  'tuong-tram-huong-ma-dao-thanh-cong-mau-2',
  '<p>&nbsp;</p><h1><strong>TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 2</strong></h1><p>&nbsp;</p><p><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:645px"><tbody><tr><td style="width:167px">KÍCH THƯỚC</td><td style="width:465px">&nbsp;</td></tr><tr><td style="width:167px">TRỌNG LƯỢNG</td><td style="width:465px">&nbsp;</td></tr><tr><td style="width:167px">LOẠI TRẦM</td><td style="width:465px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="width:167px">ĐẶC TÍNH</td><td style="width:465px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="width:167px">BẢO HÀNH</td><td style="width:465px">Theo nhà sản xuất</td></tr><tr><td style="width:167px">CÁCH DÙNG</td><td style="width:465px">Dùng làm quà tặng khai trương, lễ tết,... giúp kinh doanh phát đạt, công thành danh toại.</td></tr></tbody></table>&nbsp;<p>&nbsp;</p><h2><strong>MÔ TẢ CHI TIẾT SẢN PHẨM</strong></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242049382_bc72cc4eca3fcca156b1ab2960327b6d_bd91131c5d8646428c97996bbb0cbff0_grande.jpg"></p><p>&nbsp;</p><p><strong>Tượng Trầm hương Mã Đáo Thành Công</strong>&nbsp;(mẫu 2) là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được làm hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề, nên mỗi bức tượng là một nét chấm phá riêng biệt.</p><p>&nbsp;</p><p>Những bức tượng Mã Đáo Thành Công được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.</p><p>&nbsp;</p><p>Hình ảnh những chú ngựa trong tư thế chạy về phía trước luôn là biểu tượng "Mã Đáo Thành Công" mang ý nghĩa về sự thành công, may mắn và phát đạt trong kinh doanh, buôn bán; thể hiện sự nhanh nhạy và hỗ trợ thăng tiến trong sự nghiệp.</p><p>&nbsp;</p><p><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p>Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p>&nbsp;</p><p><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p>Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p>&nbsp;</p><p><strong>CHÚNG TÔI CAM KẾT</strong></p><p>- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p>- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p>- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p>&nbsp;</p><p><em>* Sản phẩm được chụp thật 100% tại showroom Trầm Hương Sơn Hồng</em></p><br>',
  NULL,
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 2',
  'Tượng Trầm hương Mã Đáo Thành Công (mẫu 2) là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được làm hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề, nên mỗi bức tượng là một nét chấm phá riêng biệt.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm hương cảnh', 'trầm cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:22:28+07:00'::timestamp,
  '2023-03-24T23:22:53+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704508'),
  '1101069908',
  'Title', 'Tượng Trầm Mã Đáo Thành Công mẫu 2',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  5000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704508'),
  'https://product.hstatic.net/200000591825/product/z4173242049382_bc72cc4eca3fcca156b1ab2960327b6d_1fbe8bd14802495aa9d7c678409e2a0c.jpg',
  NULL,
  1,
  true
);


-- Product: TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 3
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704564',
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 3',
  'tuong-tram-huong-ma-dao-thanh-cong-mau-3',
  '<h1 style="text-align: justify;"><span style="color:#f39c12"><strong>TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 3</strong></span></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><p style="text-align: justify;">&nbsp;</p><table border="1" cellspacing="1" cellpadding="1" style="width:639px"><tbody><tr><td style="text-align:justify; width:150px">KÍCH THƯỚC</td><td style="text-align:justify; width:476px">&nbsp;</td></tr><tr><td style="text-align:justify; width:150px">TRỌNG LƯỢNG</td><td style="text-align:justify; width:476px">&nbsp;</td></tr><tr><td style="text-align:justify; width:150px">LOẠI TRẦM</td><td style="text-align:justify; width:476px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="text-align:justify; width:150px">ĐẶC TÍNH</td><td style="text-align:justify; width:476px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="text-align:justify; width:150px">BẢO HÀNH</td><td style="text-align:justify; width:476px">Theo nhà sản xuất</td></tr><tr><td style="text-align:justify; width:150px">CÁCH DÙNG</td><td style="text-align:justify; width:476px">Dùng làm quà tặng khai trương, lễ tết,... giúp kinh doanh phát đạt, công thành danh toại.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ CHI TIẾT SẢN PHẨM</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242049512_3f05d7e40ab0607b1c29cbbaec146322_e25ae7a8672f40578cdc7a58846d6cd6_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Tượng Trầm hương Mã Đáo Thành Công</strong>&nbsp;(mẫu 2) là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được làm hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề, nên mỗi bức tượng là một nét chấm phá riêng biệt.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Những bức tượng Mã Đáo Thành Công được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Hình ảnh những chú ngựa trong tư thế chạy về phía trước luôn là biểu tượng "Mã Đáo Thành Công" mang ý nghĩa về sự thành công, may mắn và phát đạt trong kinh doanh, buôn bán; thể hiện sự nhanh nhạy và hỗ trợ thăng tiến trong sự nghiệp.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>* Sản phẩm được chụp thật 100% tại showroom Trầm Hương Sơn Hồng</em></p><p style="text-align: justify;">&nbsp;</p>',
  NULL,
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 3',
  'Bức tượng Mã Đáo Thành Công của Trầm Hương Sơn Hồng được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm cảnh', 'trầm hương cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:27:24+07:00'::timestamp,
  '2023-03-24T23:27:48+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704564'),
  '1101070004',
  'Title', 'Tượng Trầm Mã Đáo Thành Công mẫu 3',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  5000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704564'),
  'https://product.hstatic.net/200000591825/product/z4173242049512_3f05d7e40ab0607b1c29cbbaec146322_055eb48d6a1c47648bebfe5974d651b5.jpg',
  NULL,
  1,
  true
);


-- Product: TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 4
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704570',
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 4',
  'tuong-tram-huong-ma-dao-thanh-cong-mau-4',
  '<h1 style="text-align: justify;"><strong>TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 2</strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:615px"><tbody><tr><td style="text-align:justify; width:137px">KÍCH THƯỚC</td><td style="text-align:justify; width:465px">&nbsp;</td></tr><tr><td style="text-align:justify; width:137px">TRỌNG LƯỢNG</td><td style="text-align:justify; width:465px">&nbsp;</td></tr><tr><td style="text-align:justify; width:137px">LOẠI TRẦM</td><td style="text-align:justify; width:465px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="text-align:justify; width:137px">ĐẶC TÍNH</td><td style="text-align:justify; width:465px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="text-align:justify; width:137px">BẢO HÀNH</td><td style="text-align:justify; width:465px">Theo nhà sản xuất</td></tr><tr><td style="text-align:justify; width:137px">CÁCH DÙNG</td><td style="text-align:justify; width:465px">Dùng làm quà tặng khai trương, lễ tết,... giúp kinh doanh phát đạt, công thành danh toại.</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><strong>MÔ TẢ CHI TIẾT SẢN PHẨM</strong></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242049518_1bfce35573ce71aaa3651520ae5b2a14_e1cc531b4c0340698def0f45d2d4d4a9_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Tượng Trầm hương Mã Đáo Thành Công</strong>&nbsp;(mẫu 2) là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được làm hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề, nên mỗi bức tượng là một nét chấm phá riêng biệt.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Những bức tượng Mã Đáo Thành Công được điêu khắc từ 100% Trầm hương tự nhiên và đế tượng được mạ vàng vô cùng sang trọng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Hình ảnh những chú ngựa trong tư thế chạy về phía trước luôn là biểu tượng "Mã Đáo Thành Công" mang ý nghĩa về sự thành công, may mắn và phát đạt trong kinh doanh, buôn bán; thể hiện sự nhanh nhạy và hỗ trợ thăng tiến trong sự nghiệp.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Bức tượng rất thích hợp để làm món quà cho ngày khai trương hay tặng bạn bè, người thân, đồng nghiệp, đối tác,... những dịp lễ tết, thăng chức hoặc hội họp, đàm phán quan trọng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><em>* Sản phẩm được chụp thật 100% tại showroom Trầm Hương Sơn Hồng</em></p><p style="text-align: justify;">&nbsp;</p>',
  NULL,
  'TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 4',
  'Tượng Trầm hương Mã Đáo Thành Công (mẫu 4) mang ý nghĩa về sự thành công, may mắn và phát đạt trong kinh doanh, buôn bán; thể hiện sự nhanh nhạy và hỗ trợ thăng tiến trong sự nghiệp.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm cảnh', 'trầm hương cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:31:33+07:00'::timestamp,
  '2023-03-24T23:31:59+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704570'),
  '1101070018',
  'Title', 'Tượng Trầm Mã Đáo Thành Công mẫu 4',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  5000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704570'),
  'https://product.hstatic.net/200000591825/product/z4173242049518_1bfce35573ce71aaa3651520ae5b2a14_4a7c96ec42834281bf0fbb17ae4ec288.jpg',
  NULL,
  1,
  true
);


-- Product: BÌNH HOA PHÚ QUÝ TRẦM HƯƠNG TỰ NHIÊN
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704653',
  'BÌNH HOA PHÚ QUÝ TRẦM HƯƠNG TỰ NHIÊN',
  'binh-hoa-phu-quy-tram-huong-tu-nhien',
  '<h1 style="text-align: center;"><span style="color:#f39c12"><strong>BÌNH HOA PHÚ QUÝ TRẦM HƯƠNG TỰ NHIÊN</strong></span></h1><p>&nbsp;</p><p><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:585px"><tbody><tr><td style="width:176px">KÍCH THƯỚC</td><td style="width:396px">&nbsp;</td></tr><tr><td style="width:176px">TRỌNG LƯỢNG</td><td style="width:396px">&nbsp;</td></tr><tr><td style="width:176px">LOẠI TRẦM</td><td style="width:396px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="width:176px">ĐẶC TÍNH</td><td style="width:396px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="width:176px">BẢO HÀNH</td><td style="width:396px">Theo nhà sản xuất</td></tr><tr><td style="width:176px">CÁCH DÙNG</td><td style="width:396px">Thích hợp làm quà tặng trong các dịp khai trương, tân gia, lễ tết…</td></tr></tbody></table><p>&nbsp;</p><h2><span style="color:#f39c12"><strong>MÔ TẢ CHI TIẾT SẢN PHẨM</strong></span></h2><div>&nbsp;</div><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242049441_b895895a5e1f6afcc2fd5d7866492c60_25ccaf0b29ce4e33ab93690c0cad86d8_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Bình hoa Trầm hương Phú Quý</strong> của Trầm Hương Sơn Hồng được các nghệ nhân kinh nghiệm 30 năm điêu khắc hoàn toàn thủ công trong vòng 1 tháng.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Bình hoa Trầm hương Phú Quý được tạc từ 100% Trầm hương thiên nhiên cao cấp, mùi hương dịu nhẹ tựa như hương thơm của đại ngàn.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Từng đường nét của bình hoa được điêu khắc vô cùng tinh xảo với hàng trăm loài hoa thi nhau đua nở thể hiện sự sung túc, phú quý và khởi sắc. Bên dưới đế bình được dát vàng vô cùng đẳng cấp và sang trọng.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Bình hoa trầm hương này của Trầm Hương Sơn Hồng rất thích hợp làm quà tặng trong các dịp khai trương, tân gia, lễ tết…</p><p>&nbsp;</p><p><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p>Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p>&nbsp;</p><p><strong>GIỚI THIỆU VỀ&nbsp;TRẦM HƯƠNG SƠN HỒNG</strong></p><p>Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p>&nbsp;</p><p><strong>CHÚNG TÔI CAM KẾT</strong></p><p>- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p>- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p>- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p>&nbsp;</p><p><em>* Sản phẩm được chụp thật 100% tại showroom Trầm Hương Sơn Hồng</em></p><p>&nbsp;</p>',
  NULL,
  'BÌNH HOA PHÚ QUÝ TRẦM HƯƠNG TỰ NHIÊN',
  'Bình hoa Phú Quý của Trầm Hương Sơn Hồng được các nghệ nhân kinh nghiệm 30 năm điêu khắc hoàn toàn thủ công trong vòng 1 tháng.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm cảnh', 'trầm hương cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:44:49+07:00'::timestamp,
  '2023-03-24T23:45:15+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704653'),
  '1101070216',
  'Title', 'Bình hoa Phú quý Trầm hương tự nhiên',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  5000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704653'),
  'https://product.hstatic.net/200000591825/product/z4173242048687_0861550889f2e3609059e3ebaae8e173_67133953c2264514b58cc2ce9eb1f4e5.jpg',
  NULL,
  1,
  true
);

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704653'),
  'https://product.hstatic.net/200000591825/product/z4173242049441_b895895a5e1f6afcc2fd5d7866492c60_17fb34295ae44fee92c86a09994cf2f0.jpg',
  NULL,
  2,
  false
);


-- Product: TƯỢNG TRẦM HƯƠNG PHƯỢNG HOÀNG QUAN ÂM - ĐẾ DÁT VÀNG
INSERT INTO products (
  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,
  seo_title_vi, seo_description_vi, brand, product_type, tags, status,
  haravan_created_at, haravan_updated_at
) VALUES (
  '1045704664',
  'TƯỢNG TRẦM HƯƠNG PHƯỢNG HOÀNG QUAN ÂM - ĐẾ DÁT VÀNG',
  'tuong-tram-huong-phuong-hoang-quan-am-de-dat-vang',
  '<h1 style="text-align: center;"><strong>TƯỢNG TRẦM HƯƠNG PHƯỢNG HOÀNG QUAN ÂM</strong></h1><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>THÔNG TIN SẢN PHẨM</strong></p><table border="1" cellspacing="1" cellpadding="1" style="width:525px"><tbody><tr><td style="text-align:justify; width:151px">KÍCH THƯỚC</td><td style="text-align:justify; width:361px">&nbsp;</td></tr><tr><td style="text-align:justify; width:151px">TRỌNG LƯỢNG</td><td style="text-align:justify; width:361px">&nbsp;</td></tr><tr><td style="text-align:justify; width:151px">LOẠI TRẦM</td><td style="text-align:justify; width:361px">Trầm hương tự nhiên cao cấp</td></tr><tr><td style="text-align:justify; width:151px">ĐẶC TÍNH</td><td style="text-align:justify; width:361px">Mùi hương dịu nhẹ, ngọt</td></tr><tr><td style="text-align:justify; width:151px">BẢO HÀNH</td><td style="text-align:justify; width:361px">Theo nhà sản xuất</td></tr></tbody></table><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>MÔ TẢ TƯỢNG PHƯỢNG HOÀNG QUAN ÂM TRẦM HƯƠNG</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: center"><img src="//file.hstatic.net/200000591825/file/z4173242044921_8bc583caf814b32db4cdd3ec87a2171e_d5e94d92ed564bf7a58ff6c945f474af_grande.jpg"></p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>Tượng Phượng hoàng Quan Âm Trầm hương</strong>&nbsp;là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được điêu khắc hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề với hơn 30 năm kinh nghiệm, nên mỗi bức tượng là một nét chấm phá riêng biệt.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Đế tượng&nbsp;được dát vàng vô cùng đẳng cấp và sang trọng.</p><p style="text-align: justify;">&nbsp;</p><h2 style="text-align: justify;"><span style="color:#f39c12"><strong>VỊ TRÍ ĐẶT TƯỢNG PHẬT TRẦM HƯƠNG ĐỂ HỢP PHONG THUỶ</strong></span></h2><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;">Đặt Tượng Phật Trầm Hương có tính phong thuỷ và ý nghĩa tâm linh cao, chính vì vậy mà chúng ta nên đặt tượng ở nơi cao ráo, trang nghiêm trong ngôi nhà của mình.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>VỀ TRẦM HƯƠNG VIỆT NAM</strong></p><p style="text-align: justify;">Gỗ trầm hương Việt Nam được giới chuyên gia về trầm đánh giá rất cao trên thế giới về mùi hương, cũng như chất lượng nhờ vào điều kiện khí hậu &amp; thổ nhưỡng đặc trưng của rừng rậm nhiệt đới, nơi mà cây trầm phát triển và tạo trầm tốt nhất. Trầm Hương Việt Nam thường sinh trưởng tại các khu rừng rậm nhiệt đới ở Quảng Nam, Tây Nguyên, Phú Quốc,.. nơi cho ra trầm tốt nhất thế giới.&nbsp;</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>GIỚI THIỆU VỀ&nbsp; TRẦM HƯƠNG SƠN HỒNG</strong></p><p style="text-align: justify;">Đối với bạn trầm hương là sự may mắn, đối với Sơn Hồng, trầm hương là tâm huyết của gia đình chúng tôi. Với hơn 30 năm làm trầm, chúng tôi hiểu giá trị của Trầm Hương và mong muốn mang trầm hương Việt đến với người Việt cùng với lời chúc về sự thịnh vượng và may mắn trong cuộc sống.</p><p style="text-align: justify;">&nbsp;</p><p style="text-align: justify;"><strong>CHÚNG TÔI CAM KẾT</strong></p><p style="text-align: justify;">- Nguồn gốc đúng: Trầm Hương Việt Nam được giới chuyên về trầm đánh giá tốt nhất thế giới về mùi thơm cũng như chất lượng.</p><p style="text-align: justify;">- Đúng &amp; đủ tuổi trầm như đã công bố: Chúng tôi cam kết sử dụng đúng loại trầm có số tuổi như đã công bố trên từng sản phẩm.&nbsp;</p><p style="text-align: justify;">- 100% sử dụng nguyên liệu tự nhiên: Chúng tôi không sử dụng bất kỳ hoá chất tạo màu hoặc tạo mùi nào trong tất cả các sản phẩm về trầm hương của Sơn Hồng.</p><p>&nbsp;</p>',
  NULL,
  'TƯỢNG TRẦM HƯƠNG PHƯỢNG HOÀNG QUAN ÂM - ĐẾ DÁT VÀNG',
  'Tượng Phượng hoàng Quan Âm Trầm hương là sản phẩm mỹ nghệ cao cấp của Trầm Hương Sơn Hồng, được điêu khắc hoàn toàn thủ công bởi những nghệ nhân trầm hương lành nghề với hơn 30 năm kinh nghiệm, nên mỗi bức tượng là một nét chấm phá riêng biệt.',
  'TRẦM HƯƠNG SƠN HỒNG',
  'Khác',
  ARRAY['trầm cảnh', 'trầm hương cảnh', 'điêu khắc'],
  'published',
  '2023-03-24T23:53:45+07:00'::timestamp,
  '2023-03-24T23:54:14+07:00'::timestamp
) ON CONFLICT (haravan_product_id) DO NOTHING;

INSERT INTO product_variants (
  product_id, haravan_variant_id, option1_name, option1_value,
  option2_name, option2_value, option3_name, option3_value,
  price, compare_at_price, sku, barcode, weight, inventory_quantity,
  inventory_policy, track_inventory, requires_shipping, taxable,
  unit, base_unit, conversion_rate, sell_by_unit
) VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704664'),
  '1101070238',
  'Title', 'Tượng Phượng hoàng Quan Âm',
  NULL, NULL,
  NULL, NULL,
  0, NULL,
  NULL, NULL,
  10000, 1,
  'deny', true,
  true, true,
  NULL, NULL,
  NULL, false
) ON CONFLICT (haravan_variant_id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)
VALUES (
  (SELECT id FROM products WHERE haravan_product_id = '1045704664'),
  'https://product.hstatic.net/200000591825/product/z4173242044921_8bc583caf814b32db4cdd3ec87a2171e_a9256c98331f49b09905405ab0e174b3.jpg',
  NULL,
  1,
  true
);

-- Commit transaction
COMMIT;


COMMIT;
