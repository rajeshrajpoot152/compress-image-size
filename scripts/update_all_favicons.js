const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Ensure favicon.ico exists in root
const icoSource = path.join(rootDir, 'images', 'favicon.ico');
const icoDest = path.join(rootDir, 'favicon.ico');
if (fs.existsSync(icoSource)) {
  fs.copyFileSync(icoSource, icoDest);
  console.log('Copied images/favicon.ico -> ./favicon.ico');
}

// 2. Walk all HTML files
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk(rootDir);
let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace any link rel="icon" ... favicon.png with /favicon.ico
  content = content.replace(/<link\s+rel=["'](?:shortcut )?icon["']\s+href=["'][^"']*favicon\.png["']\s*\/?>/gi, 
    '<link rel="icon" type="image/x-icon" href="/favicon.ico" />');

  // Also catch attributes in reverse order: href="..." rel="icon"
  content = content.replace(/<link\s+href=["'][^"']*favicon\.png["']\s+rel=["'](?:shortcut )?icon["']\s*\/?>/gi, 
    '<link rel="icon" type="image/x-icon" href="/favicon.ico" />');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Updated favicon in ${updatedCount} HTML files.`);

// 3. Update template files
const templatesToUpdate = [
  path.join(rootDir, 'views', 'template.php'),
  path.join(rootDir, 'build_info_pages.php'),
  path.join(rootDir, 'build_legal_pages.php')
];

templatesToUpdate.forEach(tPath => {
  if (fs.existsSync(tPath)) {
    let tContent = fs.readFileSync(tPath, 'utf8');
    let orig = tContent;
    tContent = tContent.replace(/<link\s+rel=["'](?:shortcut )?icon["']\s+href=["'][^"']*favicon\.png["']\s*\/?>/gi,
      '<link rel="icon" type="image/x-icon" href="/favicon.ico" />');
    if (tContent !== orig) {
      fs.writeFileSync(tPath, tContent, 'utf8');
      console.log(`Updated template: ${path.basename(tPath)}`);
    }
  }
});
