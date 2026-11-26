import { fitWithin, MAX_EDGE, WEBP_QUALITY } from '@/lib/admin/image';

export const DECODE_ERROR = 'Không đọc được ảnh này (có thể là HEIC). Hãy chụp lại hoặc chọn ảnh JPG/PNG.';

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(DECODE_ERROR));
    };
    img.src = url;
  });
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

/**
 * Shrinks a photo in the browser (long edge ≤ 2000px) and re-encodes it as WebP.
 * Browsers that can't encode WebP (older Safari) get JPEG instead — `ext` says which.
 */
export async function compressToWebp(file: File): Promise<{ blob: Blob; ext: 'webp' | 'jpg' }> {
  let source: ImageBitmap | HTMLImageElement;
  try {
    source = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    source = await loadImage(file);
  }
  const { width, height } = fitWithin(source.width, source.height, MAX_EDGE);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error(DECODE_ERROR);
  ctx.drawImage(source, 0, 0, width, height);
  if ('close' in source) source.close();

  const webp = await toBlob(canvas, 'image/webp', WEBP_QUALITY);
  if (webp && webp.type === 'image/webp') return { blob: webp, ext: 'webp' };
  const jpeg = await toBlob(canvas, 'image/jpeg', 0.85);
  if (!jpeg) throw new Error(DECODE_ERROR);
  return { blob: jpeg, ext: 'jpg' };
}
