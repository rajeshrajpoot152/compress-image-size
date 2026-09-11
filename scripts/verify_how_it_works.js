const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'how-it-works', 'index.html');
if (!fs.existsSync(filePath)) {
  console.error('FAIL: how-it-works/index.html does not exist');
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');
const baseDir = path.dirname(filePath);

console.log('=== VERIFYING how-it-works/index.html ===');

// 1. Check title & meta
const titleMatch = html.match(/<title>(.*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'MISSING');

const descMatch = html.match(/<meta name="description" content="(.*?)"/);
console.log('Meta Description:', descMatch ? descMatch[1] : 'MISSING');

const canonicalMatch = html.match(/<link rel="canonical" href="(.*?)"/);
console.log('Canonical URL:', canonicalMatch ? canonicalMatch[1] : 'MISSING');

// 2. Check JSON-LD
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonLdMatch) {
  try {
    const parsed = JSON.parse(jsonLdMatch[1]);
    console.log('JSON-LD Schema: Valid JSON with types:', parsed['@graph'].map(g => g['@type']).join(', '));
  } catch (e) {
    console.error('FAIL: JSON-LD is invalid JSON:', e.message);
  }
} else {
  console.error('FAIL: JSON-LD script not found');
}

// 3. Check all local asset links (img src, link href, etc.)
const assetRegex = /(?:src|href)="(\.\.[^"#?]*)"/g;
let match;
let missingAssets = 0;
const checkedPaths = new Set();

while ((match = assetRegex.exec(html)) !== null) {
  const relPath = match[1];
  if (checkedPaths.has(relPath)) continue;
  checkedPaths.add(relPath);

  const fullPath = path.resolve(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`FAIL: Missing file target: ${relPath} -> ${fullPath}`);
    missingAssets++;
  }
}

if (missingAssets === 0) {
  console.log(`All ${checkedPaths.size} referenced relative files exist on disk!`);
} else {
  console.error(`Found ${missingAssets} missing files!`);
}

// 4. Check section IDs
const requiredSections = [
  'step-1',
  'step-2',
  'step-3',
  'step-4',
  'step-by-step',
  'faq',
];

requiredSections.forEach(secId => {
  if (!html.includes(`id="${secId}"`)) {
    console.error(`FAIL: Section id="${secId}" missing in page`);
  } else {
    console.log(`Verified section id="${secId}"`);
  }
});

console.log('=== AUDIT COMPLETE ===');
