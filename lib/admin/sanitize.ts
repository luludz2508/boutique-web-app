import sanitizeHtml from 'sanitize-html';

/** Allowlist for product descriptions saved from the admin editor. */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'h2', 'h3', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img', 'br'],
  allowedAttributes: { a: ['href'], img: ['src', 'alt'] },
  allowedSchemes: ['http', 'https'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: false,
  selfClosing: ['img', 'br'],
  disallowedTagsMode: 'discard',
  nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'iframe'],
};

export function sanitizeDescription(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
