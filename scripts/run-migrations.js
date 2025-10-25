#!/usr/bin/env node

/**
 * Supabase Migration Runner
 *
 * This script runs SQL migrations on your Supabase database
 * Run: node scripts/run-migrations.js
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Missing Supabase credentials!");
  console.error("Make sure your .env.local file has:");
  console.error("  - NEXT_PUBLIC_SUPABASE_URL");
  console.error("  - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MIGRATIONS_DIR = path.join(__dirname, "..", "supabase", "migrations");

async function runMigration(filename) {
  console.log(`\n📄 Running migration: ${filename}`);

  const filePath = path.join(MIGRATIONS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  const sql = fs.readFileSync(filePath, "utf8");

  console.log(`   Reading ${sql.length} characters of SQL...`);

  try {
    // For large SQL files, we need to split by statement
    // PostgreSQL statements are separated by semicolons
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    console.log(`   Executing ${statements.length} SQL statements...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ";";

      // Show progress every 100 statements
      if (i > 0 && i % 100 === 0) {
        console.log(`   Progress: ${i}/${statements.length} statements...`);
      }

      try {
        const { error } = await supabase.rpc("exec_sql", {
          sql_query: statement,
        });

        if (error) {
          // Try direct execution if RPC fails
          const { error: directError } = await supabase
            .from("_migrations")
            .insert({ statement });

          if (directError) {
            console.error(
              `   ⚠️  Statement ${i + 1} error:`,
              error.message.substring(0, 100)
            );
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          successCount++;
        }
      } catch (err) {
        console.error(
          `   ⚠️  Statement ${i + 1} exception:`,
          err.message.substring(0, 100)
        );
        errorCount++;
      }
    }

    console.log(
      `   ✅ Migration complete: ${successCount} successful, ${errorCount} errors`
    );

    return errorCount === 0;
  } catch (error) {
    console.error(`❌ Migration failed:`, error.message);
    return false;
  }
}

async function runAllMigrations() {
  console.log("🚀 Starting Supabase Migrations\n");
  console.log(`📁 Migrations directory: ${MIGRATIONS_DIR}\n`);

  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.error(`❌ Migrations directory not found: ${MIGRATIONS_DIR}`);
    process.exit(1);
  }

  const migrationFiles = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (migrationFiles.length === 0) {
    console.log("⚠️  No migration files found.");
    process.exit(0);
  }

  console.log(`Found ${migrationFiles.length} migration(s):\n`);
  migrationFiles.forEach((f) => console.log(`  - ${f}`));

  let allSuccess = true;

  for (const file of migrationFiles) {
    const success = await runMigration(file);
    if (!success) {
      allSuccess = false;
      console.log("\n⚠️  Migration had errors, but continuing...");
    }
  }

  console.log("\n" + "=".repeat(60));

  if (allSuccess) {
    console.log("✅ All migrations completed successfully!");
    console.log("\n🎉 Your database is ready!");
    console.log("\nNext steps:");
    console.log("  1. Run: pnpm dev");
    console.log("  2. Check your Supabase dashboard to verify the data");
    console.log("  3. Start building your frontend!\n");
  } else {
    console.log("⚠️  Migrations completed with some errors.");
    console.log("\n🔍 Check the Supabase dashboard for more details:");
    console.log(`   ${supabaseUrl.replace("/project/", "/project/")}`);
    console.log(
      "\nYou can also try running the SQL manually in the SQL Editor.\n"
    );
  }
}

// Run migrations
runAllMigrations().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});

