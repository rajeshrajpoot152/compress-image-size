const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];

// Let's find all html files
let totalFilesChecked = 0;
let brokenLinks = [];
let schemaErrors = [];
let metaErrors = [];
let featureErrors = [];

const requiredDomIds = [
  'dropzone',
  'fileInput',
  'selectImagesBtn',
  'settingsPanel',
  'qualityRange',
  'formatSelect',
  'progressContainer',
  'progressBarFill',
  'batchStatsCard',
  'downloadZipBtn',
  'compareModal',
  'langDropdownContainer',
  'langToggleBtn',
  'langMenu',
  'mobileMenuBtn',
  'mobileDrawer',
  'faq'
];

languages.forEach(lang => {
  const dir = lang === 'en' ? rootDir : path.join(rootDir, lang);
  if (!fs.existsSync(dir)) {
    console.error(`Directory missing: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    totalFilesChecked++;
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1. Meta check
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta name="description" content="(.*?)"/i);
    const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)"/i);

    if (!titleMatch || !titleMatch[1].trim()) {
      metaErrors.push(`[${lang}/${file}] Missing <title>`);
    }
    if (!descMatch || !descMatch[1].trim()) {
      metaErrors.push(`[${lang}/${file}] Missing <meta description>`);
    }
    if (!canonicalMatch || !canonicalMatch[1].trim()) {
      metaErrors.push(`[${lang}/${file}] Missing canonical link`);
    }

    // Check Open Graph
    if (!content.includes('og:title') || !content.includes('og:description') || !content.includes('twitter:card')) {
      metaErrors.push(`[${lang}/${file}] Missing Open Graph or Twitter cards`);
    }

    // 2. Schema check (for tool pages)
    if (!file.includes('privacy') && !file.includes('terms') && !file.includes('404')) {
      if (!content.includes('"@type": "WebApplication"') || !content.includes('"@type": "AggregateRating"')) {
        schemaErrors.push(`[${lang}/${file}] Missing WebApplication / AggregateRating schema`);
      }
      if (!content.includes('"@type": "FAQPage"')) {
        schemaErrors.push(`[${lang}/${file}] Missing FAQPage schema`);
      }
      if (!content.includes('"@type": "HowTo"')) {
        schemaErrors.push(`[${lang}/${file}] Missing HowTo schema`);
      }

      // 3. UI Features check
      requiredDomIds.forEach(id => {
        if (!content.includes(`id="${id}"`)) {
          featureErrors.push(`[${lang}/${file}] Missing essential UI element id="${id}"`);
        }
      });
    }

    // 4. Internal Link Resolution check
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
      const href = match[1];
      // Skip external, anchor, mailto, tel, javascript
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        continue;
      }
      // Clean query and hash
      const cleanHref = href.split('?')[0].split('#')[0];
      if (!cleanHref) continue;

      // Resolve path
      const targetPath = path.resolve(dir, cleanHref);
      if (!fs.existsSync(targetPath)) {
        brokenLinks.push({
          source: `${lang}/${file}`,
          link: href,
          isHtml: cleanHref.endsWith('.html'),
          resolvedTo: targetPath
        });
      }
    }
  });
});

const brokenHtmlLinks = brokenLinks.filter(b => b.isHtml);
const brokenAssetLinks = brokenLinks.filter(b => !b.isHtml);

console.log('==============================================');
console.log(`TOTAL HTML FILES AUDITED: ${totalFilesChecked}`);
console.log(`META ERRORS: ${metaErrors.length}`);
console.log(`SCHEMA ERRORS: ${schemaErrors.length}`);
console.log(`FEATURE DOM ERRORS: ${featureErrors.length}`);
console.log(`BROKEN HTML PAGE LINKS: ${brokenHtmlLinks.length}`);
console.log(`BROKEN ASSET/FAVICON LINKS: ${brokenAssetLinks.length}`);
console.log('==============================================');

if (brokenHtmlLinks.length > 0) {
  console.log('Sample Broken HTML Links:');
  brokenHtmlLinks.slice(0, 10).forEach(b => {
    console.log(`  File: ${b.source} -> Link: "${b.link}" (Missing target: ${b.resolvedTo})`);
  });
}

if (metaErrors.length > 0) {
  console.log('Meta Errors:', metaErrors.slice(0, 5));
}
if (schemaErrors.length > 0) {
  console.log('Schema Errors:', schemaErrors.slice(0, 5));
}
if (featureErrors.length > 0) {
  console.log('Feature Errors:', featureErrors.slice(0, 5));
}
