const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

const languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
const domain = 'https://compressimagesize.com';
const today = new Date().toISOString().split('T')[0];

let howItWorksXml = '';
languages.forEach(lang => {
  const loc = lang === 'en' ? `${domain}/how-it-works/` : `${domain}/{$lang}/how-it-works/`.replace('{$lang}', lang);
  howItWorksXml += '  <url>\n';
  howItWorksXml += `    <loc>${loc}</loc>\n`;
  howItWorksXml += `    <lastmod>${today}</lastmod>\n`;
  howItWorksXml += '    <changefreq>monthly</changefreq>\n';
  howItWorksXml += '    <priority>0.8</priority>\n';

  languages.forEach(altLang => {
    const altLoc = altLang === 'en' ? `${domain}/how-it-works/` : `${domain}/${altLang}/how-it-works/`;
    howItWorksXml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
  });
  howItWorksXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}/how-it-works/" />\n`;
  howItWorksXml += '  </url>\n';
});

// Replace old single how-it-works URL block
const oldPattern = /\s*<url>\s*<loc>https:\/\/compressimagesize\.com\/how-it-works\/<\/loc>[\s\S]*?<\/url>\s*<\/urlset>/i;
content = content.replace(oldPattern, `\n${howItWorksXml}</urlset>`);

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log('Successfully updated sitemap.xml with all 10 language How It Works URLs and full hreflangs!');
