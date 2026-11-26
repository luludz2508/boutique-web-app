export const MAX_EDGE = 2000;
export const WEBP_QUALITY = 0.82;
const MAX_BYTES = 20 * 1024 * 1024;

/** Size that fits inside max×max without enlarging. */
export function fitWithin(w: number, h: number, max: number): { width: number; height: number } {
  const scale = Math.min(1, max / Math.max(w, h));
  return { width: Math.round(w * scale), height: Math.round(h * scale) };
}

/** Why a picked file can't be used, or null. Decoding problems (e.g. HEIC) are found later by the browser. */
export function imageProblem(file: { type: string; size: number }): string | null {
  if (!file.type.startsWith('image/')) return 'Tệp này không phải ảnh';
  if (file.size > MAX_BYTES) return 'Ảnh lớn hơn 20 MB, hãy chọn ảnh nhỏ hơn';
  return null;
}
