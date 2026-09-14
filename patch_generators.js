const fs = require('fs');

function patchFile(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('$robotsTag')) return;

    // Insert $robotsTag definition early in the loop
    content = content.replace(/\$destDir = \(\$langCode === 'en'\) \? __DIR__ : __DIR__ . "\/\{\$langCode\}";/g, 
        "$destDir = ($langCode === 'en') ? __DIR__ : __DIR__ . \"/{\$langCode}\";\n    $robotsTag = ($langCode === 'en') ? 'index, follow' : 'noindex, follow';\n    $canonicalRoot = 'https://compressimagesize.com/';");

    // Replace robots tag
    content = content.replace(/<meta name="robots" content="index, follow">/g, '<meta name="robots" content="{$robotsTag}">');

    // Replace canonicals to point to root to prevent duplicate ranking signals
    // E.g., <link rel="canonical" href="{$canonicalAbout}"> -> <link rel="canonical" href="https://compressimagesize.com/about-us.html">
    // We can just find `<link rel="canonical" href="{$canonicalAbout}">` and replace with `<link rel="canonical" href="https://compressimagesize.com/about-us.html">`
    content = content.replace(/<link rel="canonical" href="\{\$canonical([a-zA-Z]+)\}">/g, function(match, p1) {
        if(p1 === 'About') return '<link rel="canonical" href="https://compressimagesize.com/about-us.html">';
        if(p1 === 'Contact') return '<link rel="canonical" href="https://compressimagesize.com/contact-us.html">';
        if(p1 === 'Thanks') return '<link rel="canonical" href="https://compressimagesize.com/thank-you.html">';
        if(p1 === 'Privacy') return '<link rel="canonical" href="https://compressimagesize.com/privacy-policy.html">';
        if(p1 === 'Terms') return '<link rel="canonical" href="https://compressimagesize.com/terms-of-service.html">';
        return match;
    });

    fs.writeFileSync(file, content);
    console.log('Patched ' + file);
}

patchFile('build_info_pages.php');
patchFile('build_legal_pages.php');
