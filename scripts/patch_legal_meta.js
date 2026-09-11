const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('scripts/legal_meta_data.json', 'utf8'));

let patched = 0;

for (const [lang, data] of Object.entries(meta.privacy)) {
  for (const fname of ['privacy-policy.html', 'privacy.html']) {
    const fpath = lang + '/' + fname;
    if (fs.existsSync(fpath)) {
      let content = fs.readFileSync(fpath, 'utf8');
      content = content.replace(/<title>.*?<\/title>/, '<title>' + data.title + '</title>');
      content = content.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/, '<meta name="description" content="' + data.desc + '">');
      content = content.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/, '<meta property="og:title" content="' + data.title + '">');
      content = content.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/, '<meta property="og:description" content="' + data.desc + '">');
      content = content.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/, '<meta name="twitter:title" content="' + data.title + '">');
      content = content.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/, '<meta name="twitter:description" content="' + data.desc + '">');
      fs.writeFileSync(fpath, content, 'utf8');
      patched++;
    }
  }
}

for (const [lang, data] of Object.entries(meta.terms)) {
  for (const fname of ['terms-of-service.html', 'terms.html']) {
    const fpath = lang + '/' + fname;
    if (fs.existsSync(fpath)) {
      let content = fs.readFileSync(fpath, 'utf8');
      content = content.replace(/<title>.*?<\/title>/, '<title>' + data.title + '</title>');
      content = content.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/, '<meta name="description" content="' + data.desc + '">');
      content = content.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/, '<meta property="og:title" content="' + data.title + '">');
      content = content.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/, '<meta property="og:description" content="' + data.desc + '">');
      content = content.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/, '<meta name="twitter:title" content="' + data.title + '">');
      content = content.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/, '<meta name="twitter:description" content="' + data.desc + '">');
      fs.writeFileSync(fpath, content, 'utf8');
      patched++;
    }
  }
}

console.log('Successfully patched localized legal metadata files:', patched);
