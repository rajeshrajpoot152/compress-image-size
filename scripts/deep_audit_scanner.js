const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];
const allDirs = ['.', ...langs];

const domain = 'https://compressimagesize.com';

const report = {
  summary: {
    totalPages: 0,
    totalErrors: 0,
    totalWarnings: 0,
  },
  schemaIssues: [],
  canonicalIssues: [],
  hreflangIssues: [],
  titleIssues: [],
  descIssues: [],
  headingIssues: [],
  brokenInternalLinks: [],
  brokenImages: [],
  suspiciousClaimsOrFakeRatings: [],
  contactOrAboutGaps: [],
  duplicateUrlsOrCannibalization: [],
};

const allFiles = [];

// Collect all HTML files
allDirs.forEach(dir => {
  const dirPath = dir === '.' ? rootDir : path.join(rootDir, dir);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    allFiles.push({
      dir,
      filename: f,
      relPath: dir === '.' ? f : `${dir}/${f}`,
      fullPath: path.join(dirPath, f)
    });
  });
});

if (fs.existsSync(path.join(rootDir, 'how-it-works', 'index.html'))) {
  allFiles.push({
    dir: 'how-it-works',
    filename: 'index.html',
    relPath: 'how-it-works/index.html',
    fullPath: path.join(rootDir, 'how-it-works', 'index.html')
  });
}

report.summary.totalPages = allFiles.length;

// Map for quick existence check
const existingLocalFiles = new Set(allFiles.map(f => f.relPath.replace(/\\/g, '/')));

// Add known assets
function assetExists(rel) {
  let clean = rel.split('#')[0].split('?')[0];
  if (clean.startsWith('/')) clean = clean.substring(1);
  return fs.existsSync(path.join(rootDir, clean));
}

const titlesMap = new Map();
const descsMap = new Map();

allFiles.forEach(fileInfo => {
  const html = fs.readFileSync(fileInfo.fullPath, 'utf8');

  // 1. Title check
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) {
    report.titleIssues.push({ file: fileInfo.relPath, issue: 'Missing title tag' });
  } else {
    if (title.length < 20 || title.length > 80) {
      // warning
    }
    if (!titlesMap.has(title)) titlesMap.set(title, []);
    titlesMap.get(title).push(fileInfo.relPath);
  }

  // 2. Meta description check
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (!desc) {
    report.descIssues.push({ file: fileInfo.relPath, issue: 'Missing meta description' });
  } else {
    if (!descsMap.has(desc)) descsMap.set(desc, []);
    descsMap.get(desc).push(fileInfo.relPath);
  }

  // 3. Heading check (H1)
  const h1Matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    report.headingIssues.push({ file: fileInfo.relPath, issue: 'Missing H1 tag' });
  } else if (h1Matches.length > 1) {
    report.headingIssues.push({ file: fileInfo.relPath, issue: `Multiple H1 tags (${h1Matches.length})` });
  }

  // 4. Canonical check
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonMatch) {
    report.canonicalIssues.push({ file: fileInfo.relPath, issue: 'Missing canonical tag' });
  } else {
    const canonUrl = canonMatch[1];
    if (!canonUrl.startsWith('https://compressimagesize.com/')) {
      report.canonicalIssues.push({ file: fileInfo.relPath, issue: `Non-domain or insecure canonical: ${canonUrl}` });
    }
  }

  // 5. Schema / Structured Data Audit (Check for fake reviews / ratings / offers)
  const schemaMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  schemaMatches.forEach(sBlock => {
    const jsonStr = sBlock.replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
    try {
      const parsed = JSON.parse(jsonStr);
      const graph = parsed['@graph'] || [parsed];
      graph.forEach(node => {
        if (node['@type'] === 'AggregateRating' || node.aggregateRating) {
          report.schemaIssues.push({
            file: fileInfo.relPath,
            issue: 'Unverifiable/Fake AggregateRating Schema found (not supported by visible customer review UI)',
            details: node.aggregateRating || node
          });
        }
        if (node['@type'] === 'Offer' || node.offers) {
          // Check if price is 0
        }
      });
    } catch (err) {
      report.schemaIssues.push({ file: fileInfo.relPath, issue: 'Invalid JSON-LD Syntax: ' + err.message });
    }
  });

  // 6. Check for fake claims in text (e.g. fake statistics, 128,450 ratings, 4.94 stars)
  if (/128\s*450|128,450|4\.94\s*stars/i.test(html)) {
    report.suspiciousClaimsOrFakeRatings.push({
      file: fileInfo.relPath,
      issue: 'Text mentions 128,450 ratings / 4.94 stars without visible verification system'
    });
  }

  // 7. Internal Link validation
  const baseDir = path.dirname(fileInfo.fullPath);
  const linkMatches = html.match(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
  linkMatches.forEach(linkTag => {
    const hrefMatch = linkTag.match(/href=["']([^"']*)["']/i);
    if (!hrefMatch) return;
    const rawHref = hrefMatch[1].trim();

    // Ignore mailto, tel, javascript, external links
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      if (!rawHref.startsWith(domain)) return; // External link
    }

    // Process internal link
    let target = rawHref;
    if (target.startsWith(domain)) {
      target = target.substring(domain.length);
    }
    const cleanTarget = target.split('?')[0].split('#')[0];
    if (!cleanTarget) return; // anchor only

    let resolvedPath;
    if (cleanTarget.startsWith('/')) {
      resolvedPath = path.join(rootDir, cleanTarget.substring(1));
    } else {
      resolvedPath = path.resolve(baseDir, cleanTarget);
    }

    // If it's a directory, check for index.html
    let exists = false;
    if (fs.existsSync(resolvedPath)) {
      if (fs.statSync(resolvedPath).isDirectory()) {
        exists = fs.existsSync(path.join(resolvedPath, 'index.html'));
      } else {
        exists = true;
      }
    }

    if (!exists) {
      report.brokenInternalLinks.push({
        file: fileInfo.relPath,
        link: rawHref,
        resolved: path.relative(rootDir, resolvedPath)
      });
    }
  });

  // 8. Image link validation
  const imgMatches = html.match(/<img\s+[^>]*src=["']([^"']*)["'][^>]*>/gi) || [];
  imgMatches.forEach(imgTag => {
    const srcMatch = imgTag.match(/src=["']([^"']*)["']/i);
    if (!srcMatch) return;
    const rawSrc = srcMatch[1].trim();
    if (!rawSrc || rawSrc.startsWith('data:') || rawSrc.startsWith('http://') || rawSrc.startsWith('https://')) return;

    const cleanSrc = rawSrc.split('?')[0].split('#')[0];
    let resolvedImg = cleanSrc.startsWith('/') ? path.join(rootDir, cleanSrc.substring(1)) : path.resolve(baseDir, cleanSrc);
    if (!fs.existsSync(resolvedImg)) {
      report.brokenImages.push({
        file: fileInfo.relPath,
        imgSrc: rawSrc,
        resolved: path.relative(rootDir, resolvedImg)
      });
    }
  });
});

// Check duplicate titles across same language
const dupTitles = [];
titlesMap.forEach((files, title) => {
  if (files.length > 1) {
    dupTitles.push({ title, count: files.length, files });
  }
});

report.duplicateUrlsOrCannibalization = dupTitles;

// Summary counts
report.summary.totalErrors = 
  report.schemaIssues.length +
  report.brokenInternalLinks.length +
  report.brokenImages.length +
  report.canonicalIssues.length;

report.summary.totalWarnings = 
  report.suspiciousClaimsOrFakeRatings.length +
  dupTitles.length +
  report.headingIssues.length;

fs.writeFileSync(path.join(__dirname, 'audit_diagnostic_report.json'), JSON.stringify(report, null, 2), 'utf8');

console.log('=== AUDIT DIAGNOSTIC SCAN SUMMARY ===');
console.log('Total HTML Pages Scanned:', report.summary.totalPages);
console.log('Broken Internal Links:', report.brokenInternalLinks.length);
console.log('Broken Images:', report.brokenImages.length);
console.log('Schema Issues (e.g. fake AggregateRating):', report.schemaIssues.length);
console.log('Suspicious/Fake Reviews in text:', report.suspiciousClaimsOrFakeRatings.length);
console.log('Canonical Issues:', report.canonicalIssues.length);
console.log('Heading Issues (H1):', report.headingIssues.length);
console.log('Duplicate Titles Groups:', dupTitles.length);
console.log('====================================');
