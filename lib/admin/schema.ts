import { z, type ZodError } from 'zod';

const money = z.number({ invalid_type_error: 'Giá không hợp lệ' }).int('Giá không hợp lệ').min(0, 'Giá không được âm');

const specRow = z.object({ label: z.string().trim(), value: z.string().trim() });

const variant = z.object({
  id: z.string().uuid().optional(),
  option1_value: z.string().trim().max(200),
  price: money,
  compare_at_price: money.nullable(),
  sku: z.string().trim().max(100),
  inventory_quantity: z
    .number({ invalid_type_error: 'Tồn kho phải là số' })
    .int('Tồn kho phải là số nguyên')
    .min(0, 'Tồn kho không được âm'),
  track_inventory: z.boolean(),
});

export const ProductFormSchema = z.object({
  name_vi: z.string().trim().min(1, 'Cần nhập tên').max(300),
  slug: z.string().trim().max(200),
  product_type: z.string().trim().max(120),
  status: z.enum(['published', 'draft', 'archived']),
  featured: z.boolean(),
  excerpt_vi: z.string().trim().max(1000),
  description_vi: z.string().max(200_000),
  specs: z
    .array(specRow)
    .superRefine((rows, ctx) => {
      rows.forEach((r, i) => {
        if (!r.label !== !r.value) {
          ctx.addIssue({ code: 'custom', path: [i, r.label ? 'value' : 'label'], message: 'Cần nhập cả nhãn và giá trị' });
        }
      });
    })
    .transform((rows) => rows.filter((r) => r.label && r.value)),
  variants: z.array(variant).min(1, 'Cần ít nhất một phiên bản').max(100),
  image_order: z.array(z.string().uuid()),
});

export type ProductFormValues = {
  name_vi: string;
  slug: string;
  product_type: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  excerpt_vi: string;
  description_vi: string;
  specs: { label: string; value: string }[];
  variants: {
    id?: string;
    option1_value: string;
    price: number;
    compare_at_price: number | null;
    sku: string;
    inventory_quantity: number;
    track_inventory: boolean;
  }[];
  image_order: string[];
};

/** Zod issues → { "variants.0.price": "Giá không được âm" }, first message per field. */
export function formIssues(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    out[key] ??= issue.message;
  }
  return out;
}
