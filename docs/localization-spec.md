# Localization (i18n) Specification

- Folder structure:
  - `/locales/vi.json`
  - `/locales/en.json`
- Key convention: `section.page.element`.
- Sample:
  ```json
  {
    "home": {
      "headline": "Tinh túy của đất trời trong từng thớ gỗ trầm",
      "cta": "Khám phá sản phẩm"
    }
  }
  ```
- Notes: Avoid hard-coding copy; ensure pluralization and date/number formats match locale.

