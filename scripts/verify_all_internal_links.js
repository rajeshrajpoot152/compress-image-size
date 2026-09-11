const fs = require('fs');
const path = require('path');

let totalInternalLinks = 0;
let missingLinks = [];

function checkLinks(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'scripts') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      checkLinks(full);
    } else if (item.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /href=["'](.*?)["']/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const url = m[1].trim();
        if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('javascript:') || url.startsWith('http://') || url.startsWith('https://')) continue;
        totalInternalLinks++;
        let clean = url.split('#')[0].split('?')[0];
        if (!clean) continue;
        const resolved = path.resolve(path.dirname(full), clean);
        if (!fs.existsSync(resolved)) {
          missingLinks.push({ from: full, link: url, resolved });
        }
      }
    }
  }
}

checkLinks('.');
console.log('Total internal links verified:', totalInternalLinks, 'Broken links count:', missingLinks.length);
