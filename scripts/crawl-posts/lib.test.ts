import { expect, test } from 'vitest';
import { articleLinks, frontmatter, parseVnDate, parseArticle } from './lib';

test('parseVnDate turns "30 Tháng 04, 2023" into ISO date', () => {
  expect(parseVnDate('30 Tháng 04, 2023')).toBe('2023-04-30');
  expect(parseVnDate(' 5 Tháng 1, 2024 ')).toBe('2024-01-05');
  expect(parseVnDate('không rõ')).toBeNull();
});

test('articleLinks keeps unique /blogs/<blog>/<slug> links only', () => {
  const html = `
    <a href="/blogs/news">list</a>
    <a href="/blogs/news/bai-mot">1</a>
    <a href="/blogs/news/bai-mot?x=1">1 again</a>
    <a href="https://tramhuongsonhong.com/blogs/cach-deo/bai-hai">2</a>
    <a href="/products/vong">product</a>`;
  expect(articleLinks(html)).toEqual(['/blogs/news/bai-mot', '/blogs/cach-deo/bai-hai']);
});

test('parseArticle extracts title, author, date, cover and body', () => {
  const html = `
    <div class="heading-article"><h1> Tiêu đề bài </h1>
      <div class="article-post-meta"><span class="author">bởi: Tú Anh - Content</span>
      <span class="date"><time datetime="30 Tháng 04, 2023">30 Tháng 04, 2023</time></span></div></div>
    <div class="article-content">
      <div class="background-img"><img src="https://file.hstatic.net/a/article/cover.jpg"></div>
      <div class="box-article-detail article-body"><p><b>Đậm</b> và <a href="/x">link</a></p>
        <img src="//file.hstatic.net/a/article/in_body.png"></div>
    </div>`;
  const a = parseArticle(html);
  expect(a.title).toBe('Tiêu đề bài');
  expect(a.author).toBe('Tú Anh - Content');
  expect(a.date).toBe('2023-04-30');
  expect(a.cover).toBe('https://file.hstatic.net/a/article/cover.jpg');
  expect(a.bodyHtml).toContain('<b>Đậm</b>');
  expect(a.images).toEqual(['https://file.hstatic.net/a/article/in_body.png']);
});

test('frontmatter quotes values safely', () => {
  expect(frontmatter({ title: 'Có nên "đeo": vòng?', date: '2023-04-30', cover: null })).toBe(
    '---\ntitle: "Có nên \\"đeo\\": vòng?"\ndate: "2023-04-30"\ncover: null\n---\n',
  );
});
