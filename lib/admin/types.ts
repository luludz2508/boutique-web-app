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

export type AdminImage = { id: string; url: string; position: number };

export type AdminVariant = {
  id: string;
  option1_value: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  inventory_quantity: number;
  track_inventory: boolean;
};

/** A product as the admin form sees it. `version` is the concurrency token (newest updated_at of product + variants). */
export type AdminProduct = {
  id: string;
  name_vi: string;
  slug: string;
  product_type: string | null;
  status: ProductStatus;
  featured: boolean;
  excerpt_vi: string | null;
  description_vi: string | null;
  specs: { label: string; value: string }[];
  version: string;
  variants: AdminVariant[];
  images: AdminImage[];
};
