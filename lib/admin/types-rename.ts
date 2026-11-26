/** Why a type rename/merge can't go ahead, or null. Merging = renaming into a name that already exists. */
export function validateTypeRename(from: string, to: string, _existing: readonly string[]): string | null {
  const target = to.trim();
  if (!target) return 'Cần nhập tên loại mới';
  if (target === from.trim()) return 'Tên mới trùng tên cũ';
  return null;
}
