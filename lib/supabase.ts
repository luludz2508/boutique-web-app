import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configuration
 *
 * This file provides configured Supabase clients for different use cases.
 */

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file.\n" +
      "Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
      "See docs/ENVIRONMENT_SETUP.md for setup instructions."
  );
}

/**
 * Client-side Supabase client
 * Use this in client components and browser code
 *
 * @example
 * ```typescript
 * import { supabase } from '@/lib/supabase'
 *
 * const { data } = await supabase
 *   .from('products')
 *   .select('*')
 *   .eq('status', 'published')
 * ```
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Server-side Supabase Admin client
 * Use this in API routes and server components only
 * This client bypasses Row Level Security (RLS)
 *
 * WARNING: Never use this client in client-side code!
 *
 * @example
 * ```typescript
 * // app/api/admin/products/route.ts
 * import { supabaseAdmin } from '@/lib/supabase'
 *
 * export async function GET() {
 *   // Can bypass RLS
 *   const { data } = await supabaseAdmin
 *     .from('products')
 *     .select('*')
 *
 *   return Response.json(data)
 * }
 * ```
 */
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Type definitions for your database
// Update these as your schema evolves
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
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
          haravan_created_at: string | null;
          haravan_updated_at: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      product_variants: {
        Row: {
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
          cost: number | null;
          sku: string | null;
          barcode: string | null;
          weight: number | null;
          weight_unit: string;
          inventory_quantity: number;
          inventory_policy: "deny" | "continue";
          track_inventory: boolean;
          requires_shipping: boolean;
          taxable: boolean;
          unit: string | null;
          base_unit: string | null;
          conversion_rate: number | null;
          sell_by_unit: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["product_variants"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["product_variants"]["Insert"]
        >;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          url: string;
          alt_text_vi: string | null;
          alt_text_en: string | null;
          position: number;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["product_images"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["product_images"]["Insert"]
        >;
      };
      categories: {
        Row: {
          id: string;
          name_vi: string;
          name_en: string | null;
          slug: string;
          description_vi: string | null;
          description_en: string | null;
          parent_id: string | null;
          image_url: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["categories"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      product_status: "draft" | "published" | "archived";
      inventory_policy: "deny" | "continue";
    };
  };
}

// Typed Supabase client
export type TypedSupabaseClient = ReturnType<typeof createClient<Database>>;

