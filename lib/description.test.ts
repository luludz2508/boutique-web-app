import { expect, test } from 'vitest';
import { pickSpecs, splitDescription, splitProductName } from './description';

test('splitProductName keeps the first part as the title and the rest as a detail line', () => {
  expect(splitProductName('TƯỢNG TRẦM HƯƠNG MÃ ĐÁO THÀNH CÔNG - MẪU 1')).toEqual({
    title: 'Tượng trầm hương mã đáo thành công',
    detail: 'Mẫu 1',
  });
  expect(splitProductName('VÒNG TAY TRẦM HƯƠNG ĐỐT TRÚC CAO CẤP  - TRẦM HƯƠNG LOẠI 1 - MẪU 4')).toEqual({
    title: 'Vòng tay trầm hương đốt trúc cao cấp',
    detail: 'Trầm hương loại 1 · Mẫu 4',
  });
  expect(splitProductName('BÌNH HOA PHÚ QUÝ TRẦM HƯƠNG TỰ NHIÊN')).toEqual({
    title: 'Bình hoa phú quý trầm hương tự nhiên',
    detail: '',
  });
  // hyphens inside a word are not separators
  expect(splitProductName('VÒNG ĐÁ-TRẦM').title).toBe('Vòng đá-trầm');
});

const HTML =
  '<h1 style="text-align: center;"><span style="color:#f39c12"><strong>BÌNH HOA PHÚ QUÝ</strong></span></h1>' +
  '<p>&nbsp;</p><p><strong>THÔNG TIN SẢN PHẨM</strong></p>' +
  '<table border="1"><tbody>' +
  '<tr><td style="width:176px">KÍCH THƯỚC</td><td style="width:396px">&nbsp;</td></tr>' +
  '<tr><td>LOẠI TRẦM</td><td>Trầm hương tự nhiên cao cấp</td></tr>' +
  '<tr><td>BỘ SẢN PHẨM GỒM</td><td>- Vòng trầm&nbsp;<br>- 01 Hộp gấm</td></tr>' +
  '</tbody></table><p>&nbsp;</p>' +
  '<h2><span style="color:#f39c12"><strong>MÔ TẢ CHI TIẾT SẢN PHẨM</strong></span></h2>' +
  '<p style="text-align: justify;"><strong>Bình hoa</strong> được chạm tay.</p>';

test('splitDescription pulls the spec table out, drops empty rows and sentence-cases labels', () => {
  const { specs } = splitDescription(HTML);
  expect(specs).toEqual([
    { label: 'Loại trầm', value: 'Trầm hương tự nhiên cao cấp' },
    { label: 'Bộ sản phẩm gồm', value: '- Vòng trầm\n- 01 Hộp gấm' },
  ]);
});

test('splitDescription body drops the repeated title, the spec heading, the table, empty lines and colours', () => {
  const { body } = splitDescription(HTML);
  expect(body).not.toContain('BÌNH HOA PHÚ QUÝ');
  expect(body).not.toContain('THÔNG TIN SẢN PHẨM');
  expect(body).not.toContain('<table');
  expect(body).not.toContain('&nbsp;</p>');
  expect(body).not.toContain('#f39c12');
  // all-caps headings become sentence case; mixed text is left alone
  // the 'MÔ TẢ … SẢN PHẨM' heading repeats the section label the page already shows
  expect(body.toLowerCase()).not.toContain('mô tả chi tiết');
  expect(body).toContain('<strong>Bình hoa</strong> được chạm tay.');
});

test('splitDescription with no table returns no specs and the cleaned body', () => {
  expect(splitDescription('<p>Hương thơm dịu.</p>')).toEqual({ specs: [], body: '<p>Hương thơm dịu.</p>' });
  expect(splitDescription(null)).toEqual({ specs: [], body: '' });
});

test('splitDescription sentence-cases other shouting headings', () => {
  expect(splitDescription('<p><strong>CHÚNG TÔI CAM KẾT</strong></p>').body).toBe('<p><strong>Chúng tôi cam kết</strong></p>');
});

test('pickSpecs uses saved specs and leaves the description alone', () => {
  const saved = [{ label: 'A', value: '1' }];
  expect(pickSpecs(saved, '<table><tr><td>X</td><td>y</td></tr></table><p>x</p>')).toEqual({
    specs: saved,
    body: '<table><tr><td>X</td><td>y</td></tr></table><p>x</p>',
  });
});

test('pickSpecs falls back to the Haravan table when nothing is saved', () => {
  expect(pickSpecs([], HTML)).toEqual(splitDescription(HTML));
  expect(pickSpecs(null, HTML)).toEqual(splitDescription(HTML));
});
