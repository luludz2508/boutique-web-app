import { expect, test } from 'vitest';
import { sanitizeDescription } from './sanitize';

test('drops styles, handlers, scripts and non-allowed tags but keeps their text', () => {
  expect(sanitizeDescription('<p style="color:red" onclick="x()">Hi <script>a()</script><b>b</b></p>')).toBe('<p>Hi b</p>');
});

test('blocks javascript: links', () => {
  expect(sanitizeDescription('<a href="javascript:alert(1)">x</a>')).toBe('<a>x</a>');
});

test('keeps safe images without handlers', () => {
  expect(sanitizeDescription('<img src="https://a.b/c.jpg" alt="d" onerror="x">')).toBe('<img src="https://a.b/c.jpg" alt="d" />');
});

test('removes iframes, keeps headings and lists', () => {
  expect(sanitizeDescription('<h2>T</h2><iframe src="https://x"></iframe><ul><li>a</li></ul>')).toBe('<h2>T</h2><ul><li>a</li></ul>');
});
