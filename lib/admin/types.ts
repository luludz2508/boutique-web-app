export type ProductStatus = 'published' | 'draft' | 'archived';

export const STATUS_LABEL: Record<ProductStatus, string> = {
  published: 'Đang bán',
  draft: 'Ẩn',
  archived: 'Lưu trữ',
};

export type AdminListVariant = {
  id: string;
  option1_value: string | null;
  sku: string | null;
  price: number;
  inventory_quantity: number;
  track_inventory: boolean;
  updated_at: string;
};

export type AdminListItem = {
  id: string;
  slug: string;
  name_vi: string;
  product_type: string | null;
  status: ProductStatus;
  updated_at: string;
  thumb: string | null;
  variants: AdminListVariant[];
};

export type ListQuery = { search?: string; type?: string; status?: ProductStatus | 'all' };
