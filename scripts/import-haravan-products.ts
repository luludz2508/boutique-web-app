import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

/**
 * Haravan Product CSV Import Script
 *
 * This script reads the Haravan product export CSV and transforms it
 * into our database schema structure.
 */

interface HaravanRow {
  "Mã sản phẩm": string;
  "Mã biến thể": string;
  Url: string;
  Tên: string;
  "Mô tả": string;
  "Trích dẫn": string;
  Hãng: string;
  "Loại sản phẩm": string;
  Tag: string;
  "Hiển thị": string;
  "Thuộc tính 1": string;
  "Giá trị thuộc tính 1": string;
  "Thuộc tính 2": string;
  "Giá trị thuộc tính 2": string;
  "Thuộc tính 3": string;
  "Giá trị thuộc tính 3": string;
  "Đơn vị tính": string;
  "ĐVT cơ bản": string;
  "Quy đổi": string;
  "Bán hàng với ĐVT": string;
  "Mã phiên bản sản phẩm": string;
  "Khối lượng": string;
  "Quản lý tồn kho": string;
  "Số lượng tồn kho": string;
  "Đặt hàng khi hết hàng": string;
  Giá: string;
  "Giá so sánh": string;
  "Có giao hàng không?": string;
  "Variant Taxable": string;
  Barcode: string;
  "Link hình": string;
  "Mô tả hình": string;
  "SEO Title": string;
  "SEO Description": string;
  "Ảnh biến thể": string;
  "Ngày tạo": string;
  "Ngày cập nhật": string;
}

interface Product {
  haravan_product_id: string;
  name_vi: string;
  slug: string;
  description_vi: string | null;
  excerpt_vi: string | null;
  seo_title_vi: string | null;
  seo_description_vi: string | null;
  brand: string | null;
  product_type: string | null;
  tags: string[];
  status: "published" | "draft";
  haravan_created_at: string | null;
  haravan_updated_at: string | null;
  variants: Variant[];
  images: ProductImage[];
}

interface Variant {
  haravan_variant_id: string;
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
  track_inventory: boolean;
  requires_shipping: boolean;
  taxable: boolean;
  unit: string | null;
  base_unit: string | null;
  conversion_rate: number | null;
  sell_by_unit: boolean;
  image_url: string | null;
}

interface ProductImage {
  url: string;
  alt_text_vi: string | null;
  position: number;
  is_primary: boolean;
}

/**
 * Utility functions
 */

function parseNumber(value: string | null | undefined): number | null {
  if (!value || value === "0") return null;
  const num = parseFloat(value.replace(/,/g, ""));
  return isNaN(num) ? null : num;
}

function parseInteger(value: string | null | undefined): number {
  if (!value) return 0;
  const num = parseInt(value.replace(/,/g, ""));
  return isNaN(num) ? 0 : num;
}

function parseBoolean(value: string): boolean {
  return (
    value === "Yes" || value === "yes" || value === "1" || value === "true"
  );
}

function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Main parsing function
 */

function parseHaravanCSV(csvFilePath: string): Product[] {
  console.log(`Reading CSV file: ${csvFilePath}`);

  const fileContent = fs.readFileSync(csvFilePath, "utf-8");
  const rows: HaravanRow[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });

  console.log(`Total rows in CSV: ${rows.length}`);

  const productsMap = new Map<string, Product>();
  let imagePosition = 0;

  for (const row of rows) {
    const productId = row["Mã sản phẩm"];
    const variantId = row["Mã biến thể"];

    // Skip rows with ID = "0" that are just additional images
    if (productId === "0" && variantId === "0") {
      // This is an additional image row
      const lastProduct = Array.from(productsMap.values()).pop();
      if (lastProduct && row["Link hình"]) {
        imagePosition++;
        lastProduct.images.push({
          url: row["Link hình"],
          alt_text_vi: row["Mô tả hình"] || null,
          position: imagePosition,
          is_primary: false,
        });
      }
      continue;
    }

    // Main product row or variant row
    if (!productsMap.has(productId)) {
      // Create new product
      const isPublished = parseBoolean(row["Hiển thị"]);

      const product: Product = {
        haravan_product_id: productId,
        name_vi: row["Tên"],
        slug: row["Url"] || createSlug(row["Tên"]),
        description_vi: row["Mô tả"] || null,
        excerpt_vi: row["Trích dẫn"] || null,
        seo_title_vi: row["SEO Title"] || null,
        seo_description_vi: row["SEO Description"] || null,
        brand: row["Hãng"] || null,
        product_type: row["Loại sản phẩm"] || null,
        tags: parseTags(row["Tag"]),
        status: isPublished ? "published" : "draft",
        haravan_created_at: row["Ngày tạo"] || null,
        haravan_updated_at: row["Ngày cập nhật"] || null,
        variants: [],
        images: [],
      };

      productsMap.set(productId, product);
      imagePosition = 0;
    }

    const product = productsMap.get(productId)!;

    // Add variant if variantId exists
    if (variantId && variantId !== "0") {
      const variant: Variant = {
        haravan_variant_id: variantId,
        option1_name: row["Thuộc tính 1"] || null,
        option1_value: row["Giá trị thuộc tính 1"] || null,
        option2_name: row["Thuộc tính 2"] || null,
        option2_value: row["Giá trị thuộc tính 2"] || null,
        option3_name: row["Thuộc tính 3"] || null,
        option3_value: row["Giá trị thuộc tính 3"] || null,
        price: parseNumber(row["Giá"]) || 0,
        compare_at_price: parseNumber(row["Giá so sánh"]),
        sku: row["Mã phiên bản sản phẩm"] || null,
        barcode: row["Barcode"] || null,
        weight: parseNumber(row["Khối lượng"]),
        inventory_quantity: parseInteger(row["Số lượng tồn kho"]),
        inventory_policy:
          row["Đặt hàng khi hết hàng"] === "deny" ? "deny" : "continue",
        track_inventory: row["Quản lý tồn kho"] === "haravan",
        requires_shipping: parseBoolean(row["Có giao hàng không?"]),
        taxable: parseBoolean(row["Variant Taxable"]),
        unit: row["Đơn vị tính"] || null,
        base_unit: row["ĐVT cơ bản"] || null,
        conversion_rate: parseNumber(row["Quy đổi"]),
        sell_by_unit: parseBoolean(row["Bán hàng với ĐVT"]),
        image_url: row["Ảnh biến thể"] || null,
      };

      product.variants.push(variant);
    }

    // Add main image if exists
    if (
      row["Link hình"] &&
      !product.images.some((img) => img.url === row["Link hình"])
    ) {
      imagePosition++;
      product.images.push({
        url: row["Link hình"],
        alt_text_vi: row["Mô tả hình"] || null,
        position: imagePosition,
        is_primary: product.images.length === 0, // First image is primary
      });
    }
  }

  const products = Array.from(productsMap.values());
  console.log(`Parsed ${products.length} unique products`);

  return products;
}

/**
 * Generate SQL INSERT statements
 */

function generateInsertSQL(products: Product[]): string {
  let sql = "-- Haravan Products Import\n\n";

  sql += "-- Start transaction\n";
  sql += "BEGIN;\n\n";

  for (const product of products) {
    // Insert product
    sql += `-- Product: ${product.name_vi}\n`;
    sql += `INSERT INTO products (\n`;
    sql += `  haravan_product_id, name_vi, slug, description_vi, excerpt_vi,\n`;
    sql += `  seo_title_vi, seo_description_vi, brand, product_type, tags, status,\n`;
    sql += `  haravan_created_at, haravan_updated_at\n`;
    sql += `) VALUES (\n`;
    sql += `  '${product.haravan_product_id}',\n`;
    sql += `  ${escapeSQL(product.name_vi)},\n`;
    sql += `  '${product.slug}',\n`;
    sql += `  ${escapeSQL(product.description_vi)},\n`;
    sql += `  ${escapeSQL(product.excerpt_vi)},\n`;
    sql += `  ${escapeSQL(product.seo_title_vi)},\n`;
    sql += `  ${escapeSQL(product.seo_description_vi)},\n`;
    sql += `  ${escapeSQL(product.brand)},\n`;
    sql += `  ${escapeSQL(product.product_type)},\n`;
    sql += `  ARRAY[${product.tags
      .map((t) => `'${t.replace(/'/g, "''")}'`)
      .join(", ")}],\n`;
    sql += `  '${product.status}',\n`;
    sql += `  ${
      product.haravan_created_at
        ? `'${product.haravan_created_at}'::timestamp`
        : "NULL"
    },\n`;
    sql += `  ${
      product.haravan_updated_at
        ? `'${product.haravan_updated_at}'::timestamp`
        : "NULL"
    }\n`;
    sql += `) ON CONFLICT (haravan_product_id) DO NOTHING;\n\n`;

    // Insert variants
    for (const variant of product.variants) {
      sql += `INSERT INTO product_variants (\n`;
      sql += `  product_id, haravan_variant_id, option1_name, option1_value,\n`;
      sql += `  option2_name, option2_value, option3_name, option3_value,\n`;
      sql += `  price, compare_at_price, sku, barcode, weight, inventory_quantity,\n`;
      sql += `  inventory_policy, track_inventory, requires_shipping, taxable,\n`;
      sql += `  unit, base_unit, conversion_rate, sell_by_unit\n`;
      sql += `) VALUES (\n`;
      sql += `  (SELECT id FROM products WHERE haravan_product_id = '${product.haravan_product_id}'),\n`;
      sql += `  '${variant.haravan_variant_id}',\n`;
      sql += `  ${escapeSQL(variant.option1_name)}, ${escapeSQL(
        variant.option1_value
      )},\n`;
      sql += `  ${escapeSQL(variant.option2_name)}, ${escapeSQL(
        variant.option2_value
      )},\n`;
      sql += `  ${escapeSQL(variant.option3_name)}, ${escapeSQL(
        variant.option3_value
      )},\n`;
      sql += `  ${variant.price}, ${variant.compare_at_price || "NULL"},\n`;
      sql += `  ${escapeSQL(variant.sku)}, ${escapeSQL(variant.barcode)},\n`;
      sql += `  ${variant.weight || "NULL"}, ${variant.inventory_quantity},\n`;
      sql += `  '${variant.inventory_policy}', ${variant.track_inventory},\n`;
      sql += `  ${variant.requires_shipping}, ${variant.taxable},\n`;
      sql += `  ${escapeSQL(variant.unit)}, ${escapeSQL(variant.base_unit)},\n`;
      sql += `  ${variant.conversion_rate || "NULL"}, ${
        variant.sell_by_unit
      }\n`;
      sql += `) ON CONFLICT (haravan_variant_id) DO NOTHING;\n\n`;
    }

    // Insert images
    for (const image of product.images) {
      sql += `INSERT INTO product_images (product_id, url, alt_text_vi, position, is_primary)\n`;
      sql += `VALUES (\n`;
      sql += `  (SELECT id FROM products WHERE haravan_product_id = '${product.haravan_product_id}'),\n`;
      sql += `  '${image.url}',\n`;
      sql += `  ${escapeSQL(image.alt_text_vi)},\n`;
      sql += `  ${image.position},\n`;
      sql += `  ${image.is_primary}\n`;
      sql += `);\n\n`;
    }
  }

  sql += "-- Commit transaction\n";
  sql += "COMMIT;\n";

  return sql;
}

function escapeSQL(value: string | null): string {
  if (value === null || value === undefined) return "NULL";
  // Escape single quotes
  const escaped = value.replace(/'/g, "''");
  return `'${escaped}'`;
}

/**
 * Generate JSON output
 */

function saveAsJSON(products: Product[], outputPath: string): void {
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`✅ JSON output saved to: ${outputPath}`);
}

/**
 * Main execution
 */

function main() {
  const csvPath = path.join(__dirname, "../docs/products_list.csv");
  const sqlOutputPath = path.join(
    __dirname,
    "../supabase/migrations/002_import_haravan_products.sql"
  );
  const jsonOutputPath = path.join(__dirname, "../docs/products_parsed.json");

  console.log("Starting Haravan product import...\n");

  // Parse CSV
  const products = parseHaravanCSV(csvPath);

  // Generate summary
  console.log("\n=== Import Summary ===");
  console.log(`Total products: ${products.length}`);
  console.log(
    `Total variants: ${products.reduce((sum, p) => sum + p.variants.length, 0)}`
  );
  console.log(
    `Total images: ${products.reduce((sum, p) => sum + p.images.length, 0)}`
  );

  // Show sample
  console.log("\n=== Sample Product ===");
  if (products.length > 0) {
    const sample = products[0];
    console.log(`Name: ${sample.name_vi}`);
    console.log(`Brand: ${sample.brand}`);
    console.log(`Type: ${sample.product_type}`);
    console.log(`Variants: ${sample.variants.length}`);
    console.log(`Images: ${sample.images.length}`);
    console.log(`Tags: ${sample.tags.join(", ")}`);
  }

  // Save outputs
  const sql = generateInsertSQL(products);
  fs.writeFileSync(sqlOutputPath, sql, "utf-8");
  console.log(`\n✅ SQL migration saved to: ${sqlOutputPath}`);

  saveAsJSON(products, jsonOutputPath);

  console.log("\n✅ Import script completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Review the generated SQL file");
  console.log("2. Run the migration: supabase db push");
  console.log("3. Or manually execute the SQL in your database");
}

// Run if called directly
if (require.main === module) {
  main();
}

export { parseHaravanCSV, generateInsertSQL, Product, Variant, ProductImage };

