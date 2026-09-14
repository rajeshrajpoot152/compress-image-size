const fs = require('fs');
const path = require('path');

const dir = 'd:/Data Rajesh/compress-image-size';
const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];
const allFiles = [];

function walkSync(currentDirPath) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (filePath.endsWith('.html')) {
                allFiles.push(filePath);
            }
        } else if (stat.isDirectory() && name !== 'node_modules' && name !== '.git') {
            walkSync(filePath);
        }
    });
}
walkSync(dir);

const pageData = [];
allFiles.forEach(f => {
    const relPath = path.relative(dir, f).replace(/\\/g, '/');
    const parts = relPath.split('/');
    let lang = 'en';
    let pName = relPath;
    if (langs.includes(parts[0])) {
        lang = parts[0];
        pName = parts.slice(1).join('/');
    }
    const content = fs.readFileSync(f, 'utf8');
    
    const titleMatch = content.match(/<title>([^<]*)/i);
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || content.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
    const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) || content.match(/<link[^>]*href="([^"]*)"[^>]*rel="canonical"/i);
    const robotsMatch = content.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i);
    
    // Quick text content for word count (excluding script/style)
    const textContent = content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ');
    const wordCount = textContent.split(/\s+/).filter(w => w.trim().length > 0).length;
    
    const links = [];
    const linkRegex = /<a[^>]*href="([^"]*)"/gi;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        links.push(match[1]);
    }

    const hreflangCount = (content.match(/hreflang=/gi) || []).length;
    
    pageData.push({
        file: relPath,
        lang,
        pName,
        title: titleMatch ? titleMatch[1].trim() : null,
        h1: h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : null,
        desc: descMatch ? descMatch[1].trim() : null,
        canonical: canonicalMatch ? canonicalMatch[1] : null,
        robots: robotsMatch ? robotsMatch[1] : null,
        wordCount,
        links,
        hreflangCount
    });
});

fs.writeFileSync('audit_temp.json', JSON.stringify(pageData, null, 2));
console.log('Saved to audit_temp.json. Total HTML files:', pageData.length);
