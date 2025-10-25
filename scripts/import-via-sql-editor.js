#!/usr/bin/env node

/**
 * Supabase SQL Import Helper
 *
 * This script provides instructions and prepares SQL for manual import
 * Run: node scripts/import-via-sql-editor.js
 */

const fs = require("fs");
const path = require("path");

const MIGRATIONS_DIR = path.join(__dirname, "..", "supabase", "migrations");

console.log("\n📋 Supabase SQL Import Guide\n");
console.log(
  "Since the migration files are large, the easiest way to import is:"
);
console.log("through the Supabase SQL Editor.\n");

console.log("=".repeat(70));
console.log("STEP-BY-STEP INSTRUCTIONS");
console.log("=".repeat(70));

console.log("\n1️⃣  Open your Supabase Dashboard:");
console.log("   https://app.supabase.com/\n");

console.log("2️⃣  Select your project\n");

console.log("3️⃣  Go to SQL Editor (left sidebar)\n");

console.log("4️⃣  Create a new query and run these migrations IN ORDER:\n");

const migrationFiles = fs
  .readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort();

migrationFiles.forEach((file, index) => {
  const filePath = path.join(MIGRATIONS_DIR, file);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  console.log(`   ${index + 1}. ${file} (${sizeKB} KB)`);
  console.log(`      Path: ${filePath}`);
  console.log(
    `      Action: Copy content → Paste in SQL Editor → Click "RUN"\n`
  );
});

console.log("5️⃣  After running all migrations, verify the data:");
console.log('   • Go to "Table Editor"');
console.log('   • Check "products" table has data');
console.log('   • Check "product_variants" table');
console.log('   • Check "product_images" table\n');

console.log("=".repeat(70));
console.log("ALTERNATIVE: Split Large Files");
console.log("=".repeat(70));

console.log(
  "\nIf the import file is too large, I can split it into smaller chunks.\n"
);
console.log(
  "Would you like me to split the migration files? (This will help with"
);
console.log("the ~17,000 line product import file)\n");

console.log("To split files, run:");
console.log("   node scripts/split-migrations.js\n");

console.log("=".repeat(70));
console.log("TROUBLESHOOTING");
console.log("=".repeat(70));

console.log('\n❌ If you get "query timeout" errors:');
console.log("   • Split the file into smaller chunks");
console.log("   • Or use Supabase CLI: supabase db push\n");

console.log('❌ If you get "permission denied" errors:');
console.log("   • Make sure RLS is disabled during import");
console.log("   • Or run from SQL Editor (has admin permissions)\n");

console.log("✅ Need help? Check: docs/DATABASE_IMPORT.md\n");

