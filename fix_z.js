const fs = require('fs');
const path = require('path');
let count = 0;

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fullPath.includes('.git') || fullPath.includes('node_modules')) return;
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replaced = false;

            if (content.includes('z-[100]')) {
                content = content.replace(/z-\[100\]/g, 'z-50');
                replaced = true;
            }

            if (replaced) {
                fs.writeFileSync(fullPath, content);
                count++;
            }
        }
    });
}
walk('.');
console.log('Fixed z-index in ' + count + ' files');
