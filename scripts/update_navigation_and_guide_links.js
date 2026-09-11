const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];
const allDirs = ['.', ...langs];

let filesUpdated = 0;

allDirs.forEach(dir => {
  const dirPath = dir === '.' ? rootDir : path.join(rootDir, dir);
  if (!fs.existsSync(dirPath)) return;

  const isSubfolder = dir !== '.';
  const howLink = isSubfolder ? '../how-it-works/' : 'how-it-works/';

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html') && f !== '404.html');

  files.forEach(file => {
    // Skip how-it-works/index.html or how-it-works.html
    if (dir === 'how-it-works' || file === 'how-it-works.html') return;

    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let originalHtml = html;

    // 1. Desktop navbar: update href="#how-to" / "index.html#how-to" / "../index.html#how-to"
    html = html.replace(/(<nav\b[^>]*>[\s\S]*?<\/nav>)/i, (navMatch) => {
      return navMatch
        .replace(/href="#how-to"/g, `href="${howLink}"`)
        .replace(/href="index\.html#how-to"/g, `href="${howLink}"`)
        .replace(/href="\.\.\/index\.html#how-to"/g, `href="${howLink}"`);
    });

    // 2. Mobile drawer: update href="#how-to" / "index.html#how-to" / "../index.html#how-to"
    html = html.replace(/(<div id="mobileDrawer"\b[^>]*>[\s\S]*?<\/div>)/i, (drawerMatch) => {
      return drawerMatch
        .replace(/href="#how-to"/g, `href="${howLink}"`)
        .replace(/href="index\.html#how-to"/g, `href="${howLink}"`)
        .replace(/href="\.\.\/index\.html#how-to"/g, `href="${howLink}"`);
    });

    // 3. Homepage / Tool page #how-to section: Add the "Learn How It Works" button if section exists and button is not yet added
    if (html.includes('id="how-to"') && !html.includes('Learn How It Works')) {
      const guideBtnHtml = `
        <!-- Learn How It Works User Guide Button -->
        <div class="mt-8 text-center">
          <a href="${howLink}" class="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-primary-50 text-primary-600 border border-primary-200 hover:border-primary-300 font-bold text-sm shadow-xs hover:shadow-sm transition-all group">
            <span>Learn How It Works &amp; Full User Guide</span>
            <svg class="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>`;

      // Match the guarantee badge div in #how-to section
      const badgeRegex = /(<!-- Workflow Micro-Badge Guarantee[\s\S]*?<\/div>)/i;
      if (badgeRegex.test(html)) {
        html = html.replace(badgeRegex, `$1\n${guideBtnHtml}`);
      }
    }

    if (html !== originalHtml) {
      fs.writeFileSync(filePath, html, 'utf8');
      filesUpdated++;
    }
  });
});

console.log(`Successfully updated navigation and how-it-works links in ${filesUpdated} HTML files!`);
