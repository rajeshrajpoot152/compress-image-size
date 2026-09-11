const fs = require('fs');
const path = require('path');

let totalImages = 0;
let missingImages = [];

function checkImages(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'scripts') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      checkImages(full);
    } else if (item.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /<img\b[^>]*?\bsrc=["'](.*?)["']/gi;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const src = m[1].trim();
        if (!src || src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) continue;
        totalImages++;
        let clean = src.split('?')[0].split('#')[0];
        const resolved = path.resolve(path.dirname(full), clean);
        if (!fs.existsSync(resolved)) {
          missingImages.push({ from: full, src, resolved });
        }
      }
    }
  }
}

checkImages('.');
console.log('Total image elements verified:', totalImages, 'Broken images count:', missingImages.length);
