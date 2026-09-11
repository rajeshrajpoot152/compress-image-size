const fs = require('fs');
let privacyHits = 0, termsHits = 0;
function scan(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'scripts'].includes(item)) continue;
    const full = dir + '/' + item;
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (item.endsWith('.html')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('privacy.html') && !c.includes('privacy-policy.html')) privacyHits++;
      if (c.includes('terms.html') && !c.includes('terms-of-service.html')) termsHits++;
    }
  }
}
scan('.');
console.log('Unique hits to privacy.html only:', privacyHits, 'terms.html only:', termsHits);
