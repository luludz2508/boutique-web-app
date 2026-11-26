'use client';

import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

const safeUrl = (url: string | null) => (url && /^https?:\/\//i.test(url.trim()) ? url.trim() : null);

/** Simple editor for the product description: paragraphs, two heading sizes, bold, italic, lists, links, images. */
export default function RichText({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
        underline: false,
        link: { openOnClick: false, autolink: true, isAllowedUri: (url) => /^https?:\/\//i.test(url) },
      }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: { class: 'ink-prose min-h-[14rem] px-3 py-3 outline-none', 'aria-label': 'Mô tả chi tiết' },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  });

  // the form reset (e.g. after loading) replaces the value from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !(value === '' && editor.isEmpty)) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return <div className="min-h-[16rem] border border-ink/25 bg-white/70" />;

  const btn = (active: boolean) =>
    `h-10 min-w-10 px-2 text-sm ${active ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/10'}`;

  return (
    <div className="border border-ink/25 bg-white/70 focus-within:border-ink">
      <div className="sticky top-12 z-10 flex flex-wrap gap-1 border-b border-ink/15 bg-paper/95 p-1">
        <button type="button" className={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>Đậm</strong>
        </button>
        <button type="button" className={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>Nghiêng</em>
        </button>
        <button
          type="button"
          className={btn(editor.isActive('heading', { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          Tiêu đề
        </button>
        <button
          type="button"
          className={btn(editor.isActive('heading', { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Tiêu đề nhỏ
        </button>
        <button type="button" className={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Danh sách
        </button>
        <button
          type="button"
          className={btn(editor.isActive('link'))}
          onClick={() => {
            if (editor.isActive('link')) return void editor.chain().focus().unsetLink().run();
            const url = safeUrl(window.prompt('Địa chỉ liên kết (bắt đầu bằng https://)'));
            if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
        >
          Liên kết
        </button>
        <button
          type="button"
          className={btn(false)}
          onClick={() => {
            const url = safeUrl(window.prompt('Địa chỉ ảnh (https://…)'));
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          Ảnh
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
