/**
 * Product Database Queries
 *
 * Helper functions to fetch products from Supabase
 */

import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  haravan_product_id: string | null;
  name_vi: string;
  name_en: string | null;
  slug: string;
  description_vi: string | null;
  description_en: string | null;
  excerpt_vi: string | null;
  excerpt_en: string | null;
  seo_title_vi: string | null;
  seo_title_en: string | null;
  seo_description_vi: string | null;
  seo_description_en: string | null;
  brand: string | null;
  category_id: string | null;
  product_type: string | null;
  tags: string[] | null;
  status: "draft" | "published" | "archived";
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  haravan_variant_id: string | null;
  option1_name: string | null;
  option1_value: string | null;
  option2_name: string | null;
  option2_value: string | null;
  option3_name: string | null;
  option3_value: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  barcode: string | null;
  weight: number | null;
  inventory_quantity: number;
  inventory_policy: "deny" | "continue";
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text_vi: string | null;
  alt_text_en: string | null;
  position: number;
  is_primary: boolean;
}

export interface ProductWithDetails extends Product {
  variants: ProductVariant[];
  images: ProductImage[];
}

/**
 * Get all published products with their variants and images
 */
export async function getAllProducts() {
  try {
    console.log("Fetching products from Supabase...");

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        variants:product_variants(*),
        images:product_images(*)
      `
      )
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    console.log(`Successfully fetched ${data?.length || 0} products`);
    return data as ProductWithDetails[];
  } catch (error) {
    console.error("Fatal error in getAllProducts:", error);
    throw error;
  }
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*),
      images:product_images(*)
    `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as ProductWithDetails;
}

/**
 * Get products by brand
 */
export async function getProductsByBrand(brand: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*),
      images:product_images(*)
    `
    )
    .eq("brand", brand)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by brand:", error);
    return [];
  }

  return data as ProductWithDetails[];
}

/**
 * Get products by type
 */
export async function getProductsByType(productType: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*),
      images:product_images(*)
    `
    )
    .eq("product_type", productType)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by type:", error);
    return [];
  }

  return data as ProductWithDetails[];
}

/**
 * Search products by keyword
 */
export async function searchProducts(keyword: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*),
      images:product_images(*)
    `
    )
    .eq("status", "published")
    .or(
      `name_vi.ilike.%${keyword}%,description_vi.ilike.%${keyword}%,tags.cs.{${keyword}}`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return data as ProductWithDetails[];
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 10) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      variants:product_variants(*),
      images:product_images(*)
    `
    )
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data as ProductWithDetails[];
}

/**
 * Get all brands
 */
export async function getAllBrands() {
  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .eq("status", "published")
    .not("brand", "is", null);

  if (error) {
    console.error("Error fetching brands:", error);
    return [];
  }

  // Get unique brands
  const brands = [...new Set(data.map((p) => p.brand))].filter(Boolean);
  return brands as string[];
}

/**
 * Get all product types
 */
export async function getAllProductTypes() {
  const { data, error } = await supabase
    .from("products")
    .select("product_type")
    .eq("status", "published")
    .not("product_type", "is", null);

  if (error) {
    console.error("Error fetching product types:", error);
    return [];
  }

  // Get unique types
  const types = [...new Set(data.map((p) => p.product_type))].filter(Boolean);
  return types as string[];
}
