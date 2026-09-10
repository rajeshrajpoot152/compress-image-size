const fs = require('fs');
const path = require('path');
let count = 0;

function writeWithRetry(fp, content, retries = 5) {
    try {
        fs.writeFileSync(fp, content);
    } catch (e) {
        if (retries > 0) {
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
            writeWithRetry(fp, content, retries - 1);
        } else throw e;
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fullPath.includes('.git') || fullPath.includes('node_modules')) return;
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replaced = false;

            const regex = /<div id="progressContainer" class="fixed bottom-6 sm:bottom-8 w-\[calc\(100%-2rem\)\] sm:w-\[450px\] z-50 hidden text-left transition-all duration-300" style="left: 50%; transform: translateX\(-50%\);">/g;
            const newDiv = '<div id="progressContainer" class="fixed bottom-6 sm:bottom-8 z-50 hidden text-left transition-all duration-300" style="left: 50%; transform: translateX(-50%); width: 92%; max-width: 450px;">';
            
            if (regex.test(content)) {
                content = content.replace(regex, newDiv);
                replaced = true;
            }

            if (replaced) {
                writeWithRetry(fullPath, content);
                count++;
            }
        }
    });
}
walk('.');
console.log('Fixed progress inline styles in ' + count + ' files');
