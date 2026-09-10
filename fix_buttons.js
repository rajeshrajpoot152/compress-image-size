const fs = require('fs');
const path = require('path');
let count = 0;

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fullPath.includes('.git') || fullPath.includes('node_modules')) return;
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('template.php')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replaced = false;

            // Fix Clear All button
            const oldClear = 'class="hidden px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-xl transition-all items-center gap-2 cursor-pointer"';
            const newClear = 'class="hidden px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-xl transition-all items-center justify-center gap-2 cursor-pointer"';
            if (content.includes(oldClear)) {
                content = content.replace(oldClear, newClear);
                replaced = true;
            }

            // Fix Compress All button
            const oldCompress = 'class="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"';
            const newCompress = 'class="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"';
            if (content.includes(oldCompress)) {
                content = content.replace(oldCompress, newCompress);
                replaced = true;
            }

            // Fix Download Zip button (top)
            const oldZip1 = 'class="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-black text-white hover:bg-action-700 active:scale-95 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer" style="background-color: #15803D !important; color: #ffffff !important;"';
            const newZip1 = 'class="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"';
            if (content.includes(oldZip1)) {
                content = content.replace(oldZip1, newZip1);
                replaced = true;
            }

            // Fix Download All button (bottom)
            const oldZip2 = 'class="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-black text-white hover:bg-action-700 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer" style="background-color: #15803D !important; color: #ffffff !important;"';
            const newZip2 = 'class="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"';
            if (content.includes(oldZip2)) {
                content = content.replace(oldZip2, newZip2);
                replaced = true;
            }
            
            // Wait, maybe the old ones have different spaces? Let's use regex for safety on the download buttons.
            const regexZipTop = /class="inline-flex items-center justify-center gap-2 px-5 py-2\.5[^>]*?style="background-color: #15803D !important; color: #ffffff !important;"/g;
            if (regexZipTop.test(content)) {
                content = content.replace(regexZipTop, newZip1);
                replaced = true;
            }
            
            const regexZipBot = /class="inline-flex items-center gap-2 px-5 py-2 text-xs[^>]*?style="background-color: #15803D !important; color: #ffffff !important;"/g;
            if (regexZipBot.test(content)) {
                content = content.replace(regexZipBot, newZip2);
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
console.log('Fixed buttons in ' + count + ' files');
