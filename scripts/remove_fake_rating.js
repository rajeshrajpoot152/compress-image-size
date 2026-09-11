const fs = require('fs');
const path = require('path');

let modifiedCount = 0;
const ratingPattern = /,\s*"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[\s\S]*?"worstRating":\s*"1"\s*\}/g;
const altPattern = /\s*"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[\s\S]*?"worstRating":\s*"1"\s*\},?/g;

function walk(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item === 'scripts') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('"AggregateRating"')) {
        let newContent = content.replace(ratingPattern, '');
        if (newContent.includes('"AggregateRating"')) {
          newContent = newContent.replace(altPattern, '');
        }
        if (newContent !== content) {
          fs.writeFileSync(full, newContent, 'utf8');
          modifiedCount++;
        }
      }
    }
  }
}

walk('.');
console.log('Successfully stripped aggregateRating from files:', modifiedCount);
