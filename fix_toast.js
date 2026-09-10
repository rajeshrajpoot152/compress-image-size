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

            const regex = /<div id="progressContainer" class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-\[calc\(100%-2rem\)\] sm:w-96 z-50 hidden text-left transition-all duration-300">/g;
            const newDiv = '<div id="progressContainer" class="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[450px] z-50 hidden text-left transition-all duration-300">';
            
            if (regex.test(content)) {
                content = content.replace(regex, newDiv);
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
console.log('Fixed progress floating position in ' + count + ' files');
