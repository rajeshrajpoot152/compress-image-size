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
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.php')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replaced = false;

            // 1. Remove margin-top: -50px inline style from resultsContainer
            const oldResults = /id="resultsContainer"([^>]*)style="margin-top: -50px !important;"/g;
            if (oldResults.test(content)) {
                content = content.replace(oldResults, 'id="resultsContainer"$1');
                replaced = true;
            }

            // 2. Move progressContainer to before </body>
            // The HTML structure of progressContainer spans multiple lines. We can extract it using regex.
            const progressRegex = /<!-- Compact Real-Time Progress Bar for Bulk Processing \(Floating Toast\) -->[\s\S]*?<div id="progressContainer"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
            const match = content.match(progressRegex);
            if (match && match.length > 0) {
                // If it's already at the bottom (right before </body>), don't move it again.
                // We'll check if it's inside hero-banner-content by seeing if it precedes <!-- 3. RESULTS
                const indexProg = content.indexOf(match[0]);
                const indexResults = content.indexOf('<!-- 3. RESULTS & MAIN CONTENT SECTION -->');
                if (indexProg < indexResults && indexProg !== -1) {
                    content = content.replace(match[0], ''); // Remove from original location
                    
                    // Insert before </body>
                    content = content.replace('</body>', match[0] + '\n</body>');
                    replaced = true;
                }
            }

            if (replaced) {
                writeWithRetry(fullPath, content);
                count++;
            }
        }
    });
}
walk('.');
console.log('Fixed margin and moved progress toast in ' + count + ' files');
