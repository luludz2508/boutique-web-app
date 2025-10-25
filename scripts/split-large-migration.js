#!/usr/bin/env node

/**
 * Split Large Migration Files
 *
 * This script splits large SQL migration files into smaller chunks
 * while keeping complete product records together (product + variants + images)
 *
 * Run: node scripts/split-large-migration.js
 */

const fs = require("fs");
const path = require("path");

const MIGRATIONS_DIR = path.join(__dirname, "..", "supabase", "migrations");
const CHUNKS_DIR = path.join(MIGRATIONS_DIR, "chunks");
const MAX_SIZE_KB = 100; // Target max size per chunk in KB

function splitMigrationFile(filename) {
  console.log(`\n📄 Processing: ${filename}`);

  const filePath = path.join(MIGRATIONS_DIR, filename);
  const content = fs.readFileSync(filePath, "utf8");

  const fileSizeKB = (content.length / 1024).toFixed(2);
  console.log(`   File size: ${fileSizeKB} KB`);

  if (content.length / 1024 <= MAX_SIZE_KB) {
    console.log(`   ✅ File is small enough, no splitting needed`);
    return [];
  }

  // Create chunks directory
  const baseChunksDir = path.join(CHUNKS_DIR, filename.replace(".sql", ""));
  if (!fs.existsSync(baseChunksDir)) {
    fs.mkdirSync(baseChunksDir, { recursive: true });
  }

  // Parse into product blocks
  // Each block = 1 product INSERT + all its variants + all its images
  const lines = content.split("\n");
  const productBlocks = [];
  let currentBlock = [];
  let headerLines = [];
  let inProductBlock = false;
  let collectingHeader = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Collect header (BEGIN, comments, etc.)
    if (collectingHeader) {
      if (
        trimmed.startsWith("BEGIN") ||
        trimmed.startsWith("--") ||
        trimmed === ""
      ) {
        headerLines.push(line);
        continue;
      } else {
        collectingHeader = false;
      }
    }

    // Detect start of a new product block
    if (trimmed.startsWith("-- Product:")) {
      // Save previous block if exists
      if (currentBlock.length > 0) {
        productBlocks.push([...currentBlock]);
        currentBlock = [];
      }
      inProductBlock = true;
      currentBlock.push(line);
      continue;
    }

    // Add line to current block
    if (inProductBlock) {
      currentBlock.push(line);
    }
  }

  // Add final block
  if (currentBlock.length > 0) {
    productBlocks.push(currentBlock);
  }

  console.log(`   Found ${productBlocks.length} product blocks`);

  // Group blocks into chunks
  const chunks = [];
  let currentChunk = {
    header: headerLines,
    blocks: [],
    size: 0,
  };

  // Calculate header size
  const headerSize = Buffer.byteLength(headerLines.join("\n"), "utf8");
  currentChunk.size = headerSize;

  for (const block of productBlocks) {
    const blockContent = block.join("\n");
    const blockSize = Buffer.byteLength(blockContent, "utf8");

    // If adding this block would exceed size limit AND we have at least one block
    // then save current chunk and start new one
    if (
      currentChunk.size + blockSize > MAX_SIZE_KB * 1024 &&
      currentChunk.blocks.length > 0
    ) {
      chunks.push(currentChunk);
      currentChunk = {
        header: headerLines,
        blocks: [],
        size: headerSize,
      };
    }

    // Add block to current chunk
    currentChunk.blocks.push(block);
    currentChunk.size += blockSize;
  }

  // Add final chunk
  if (currentChunk.blocks.length > 0) {
    chunks.push(currentChunk);
  }

  const numChunks = chunks.length;
  const chunkFiles = [];

  console.log(`   Creating ${numChunks} chunks...`);

  // Write chunks to files
  for (let i = 0; i < numChunks; i++) {
    const chunk = chunks[i];
    const chunkFilename = `${filename.replace(".sql", "")}_part_${String(
      i + 1
    ).padStart(3, "0")}_of_${String(numChunks).padStart(3, "0")}.sql`;
    const chunkPath = path.join(baseChunksDir, chunkFilename);

    let chunkContent = "";

    // Add header
    chunkContent += `-- ${filename} - Part ${i + 1}/${numChunks}\n`;
    chunkContent += `-- Generated: ${new Date().toISOString()}\n`;
    chunkContent += `-- Contains ${chunk.blocks.length} complete product records\n`;
    chunkContent += `-- Each product includes: INSERT product + variants + images\n\n`;

    // Add header lines (BEGIN, etc.)
    if (i === 0) {
      chunkContent += chunk.header.join("\n") + "\n\n";
    } else {
      // For subsequent chunks, only add BEGIN
      chunkContent += "BEGIN;\n\n";
    }

    // Add product blocks
    for (const block of chunk.blocks) {
      chunkContent += block.join("\n") + "\n\n";
    }

    // Add COMMIT at the end
    chunkContent += "COMMIT;\n";

    fs.writeFileSync(chunkPath, chunkContent, "utf8");
    chunkFiles.push(chunkPath);

    const sizeKB = (chunk.size / 1024).toFixed(2);
    console.log(
      `   ✅ Part ${i + 1}/${numChunks}: ${
        chunk.blocks.length
      } products (${sizeKB} KB)`
    );
  }

  return chunkFiles;
}

console.log("🔪 Splitting Large Migration Files (Product-Aware)\n");
console.log(`📁 Migrations directory: ${MIGRATIONS_DIR}\n`);
console.log(`🎯 Target chunk size: ~${MAX_SIZE_KB} KB\n`);
console.log(
  `✨ Keeps complete product records together (product + variants + images)\n`
);

const migrationFiles = fs
  .readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort();

console.log(`Found ${migrationFiles.length} migration file(s)\n`);

let totalChunks = 0;

for (const file of migrationFiles) {
  const chunks = splitMigrationFile(file);
  totalChunks += chunks.length;
}

console.log("\n" + "=".repeat(70));

if (totalChunks > 0) {
  console.log(`✅ Split complete! Created ${totalChunks} chunk files`);
  console.log(`\n📁 Chunks saved to: ${CHUNKS_DIR}\n`);
  console.log("✨ Benefits:");
  console.log("   • Complete product records kept together");
  console.log("   • No foreign key errors");
  console.log("   • Each chunk is self-contained");
  console.log("   • Safe to run in any order\n");
  console.log("Next steps:");
  console.log("1. Go to Supabase Dashboard → SQL Editor");
  console.log("2. Run files in order (part_001, part_002, etc.)");
  console.log("3. Each part is independent and complete\n");
  console.log(
    "📖 See: supabase/migrations/IMPORT_ORDER.md for detailed instructions\n"
  );
} else {
  console.log("✅ No splitting needed - all files are small enough!");
  console.log("\nYou can run the migrations directly:");
  console.log("1. Go to Supabase Dashboard → SQL Editor");
  console.log("2. Copy/paste each migration file");
  console.log("3. Click RUN\n");
}
