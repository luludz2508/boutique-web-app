import 'server-only';
import { revalidatePath } from 'next/cache';

/** Refreshes every public page a product appears on, for each of its slugs (old and new). */
export function revalidateProduct(slugs: (string | null | undefined)[]): void {
  revalidatePath('/', 'layout');
  revalidatePath('/products');
  revalidatePath('/collection');
  revalidatePath('/gallery');
  for (const slug of new Set(slugs.filter(Boolean) as string[])) revalidatePath(`/products/${slug}`);
}
