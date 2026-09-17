const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const sitemapPath = path.join(rootDir, 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('ERROR: sitemap.xml not found!');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// 1. Extract all <loc>
const locRegex = /<loc>(.*?)<\/loc>/g;
let match;
const locUrls = [];
while ((match = locRegex.exec(sitemapContent)) !== null) {
  locUrls.push(match[1]);
}

// 2. Extract all <xhtml:link rel="alternate" href="..." />
const xhtmlRegex = /<xhtml:link\s+[^>]*?href="(.*?)"/g;
const xhtmlUrls = [];
while ((match = xhtmlRegex.exec(sitemapContent)) !== null) {
  xhtmlUrls.push(match[1]);
}

console.log('==================================================');
console.log(`TOTAL <loc> ENTRIES IN SITEMAP: ${locUrls.length}`);
console.log(`TOTAL <xhtml:link> ALTERNATE ENTRIES: ${xhtmlUrls.length}`);
console.log('==================================================');

const domain = 'https://compressimagesize.com';
const missingLocFiles = [];
const missingXhtmlFiles = [];

function urlToLocalPath(url) {
  let rel = url.replace(domain, '');
  if (rel.startsWith('/')) rel = rel.substring(1);
  if (rel === '' || rel.endsWith('/')) {
    return path.join(rootDir, rel, 'index.html');
  }
  const cleanPath = path.join(rootDir, rel);
  if (fs.existsSync(cleanPath + '.html')) {
    return cleanPath + '.html';
  }
  if (fs.existsSync(path.join(cleanPath, 'index.html'))) {
    return path.join(cleanPath, 'index.html');
  }
  return cleanPath;
}

// Check <loc> files
locUrls.forEach(url => {
  const localFile = urlToLocalPath(url);
  if (!fs.existsSync(localFile)) {
    missingLocFiles.push({ url, localFile });
  }
});

// Check <xhtml:link> files
xhtmlUrls.forEach(url => {
  const localFile = urlToLocalPath(url);
  if (!fs.existsSync(localFile)) {
    missingXhtmlFiles.push({ url, localFile });
  }
});

// Check duplicates
const uniqueLocs = new Set(locUrls);
const duplicateLocCount = locUrls.length - uniqueLocs.size;

// Check if any HTML files in project are missing from sitemap
const languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
const allProjectHtmlFiles = [];

languages.forEach(lang => {
  const dir = lang === 'en' ? rootDir : path.join(rootDir, lang);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
      const cleanName = f === 'index.html' ? '' : f.replace('.html', '');
      const url = (lang === 'en')
        ? (cleanName ? `${domain}/${cleanName}` : `${domain}/`)
        : (cleanName ? `${domain}/${lang}/${cleanName}` : `${domain}/${lang}/`);
      allProjectHtmlFiles.push({ file: `${lang}/${f}`, url });
    });
  }
});

const unlistedInSitemap = [];
allProjectHtmlFiles.forEach(item => {
  if (!uniqueLocs.has(item.url)) {
    unlistedInSitemap.push(item);
  }
});

console.log(`MISSING <loc> FILES ON DISK: ${missingLocFiles.length}`);
console.log(`MISSING <xhtml:link> FILES ON DISK: ${missingXhtmlFiles.length}`);
console.log(`DUPLICATE <loc> ENTRIES: ${duplicateLocCount}`);
console.log(`TOTAL HTML FILES IN PROJECT: ${allProjectHtmlFiles.length}`);
console.log(`HTML FILES UNLISTED IN SITEMAP: ${unlistedInSitemap.length}`);
console.log('==================================================');

if (missingLocFiles.length > 0) {
  console.log('Sample Missing <loc> files:');
  missingLocFiles.slice(0, 5).forEach(m => console.log(' ', m.url, '->', m.localFile));
}

if (unlistedInSitemap.length > 0) {
  console.log('Sample Unlisted HTML files:');
  unlistedInSitemap.slice(0, 15).forEach(u => console.log(' ', u.file, '->', u.url));
}
