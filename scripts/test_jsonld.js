const fs = require('fs');
let valid = 0, invalid = 0;
function check(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'scripts'].includes(item)) continue;
    const full = dir + '/' + item;
    if (fs.statSync(full).isDirectory()) check(full);
    else if (item.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
      for (const m of matches) {
        try {
          JSON.parse(m[1]);
          valid++;
        } catch(e) {
          console.error('JSON Error in:', full, e.message);
          invalid++;
        }
      }
    }
  }
}
check('.');
console.log('JSON-LD blocks validated. Valid:', valid, 'Invalid:', invalid);
