<?php
/**
 * Info Pages Generator: About Us & Contact Us
 * Generates pages across all 10 world languages
 */

$languages = [
    'en' => ['name' => 'English', 'dir' => 'ltr', 'prefix' => ''],
    'es' => ['name' => 'Español', 'dir' => 'ltr', 'prefix' => '../'],
    'fr' => ['name' => 'Français', 'dir' => 'ltr', 'prefix' => '../'],
    'de' => ['name' => 'Deutsch', 'dir' => 'ltr', 'prefix' => '../'],
    'pt' => ['name' => 'Português', 'dir' => 'ltr', 'prefix' => '../'],
    'zh' => ['name' => '中文', 'dir' => 'ltr', 'prefix' => '../'],
    'ja' => ['name' => '日本語', 'dir' => 'ltr', 'prefix' => '../'],
    'ar' => ['name' => 'العربية', 'dir' => 'rtl', 'prefix' => '../'],
    'ru' => ['name' => 'Русский', 'dir' => 'ltr', 'prefix' => '../'],
    'it' => ['name' => 'Italiano', 'dir' => 'ltr', 'prefix' => '../']
];

$flags = [
    'en' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/><path fill="#192f5d" d="M0 0h260v260H0z"/></svg>',
    'es' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#aa151b" d="M0 0h640v480H0z"/><path fill="#f1bf00" d="M0 120h640v240H0z"/></svg>',
    'fr' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#002654" d="M0 0h213.3v480H0z"/><path fill="#ce1126" d="M426.7 0H640v480H426.7z"/></svg>',
    'de' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#ffce00" d="M0 320h640v160H0z"/><path d="M0 0h640v160H0z"/><path fill="#d00" d="M0 160h640v160H0z"/></svg>',
    'pt' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#ff0000" d="M256 0h384v480H256z"/><path fill="#006600" d="M0 0h256v480H0z"/><circle cx="256" cy="240" r="80" fill="#ffff00"/></svg>',
    'zh' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#de2910" d="M0 0h640v480H0z"/><polygon fill="#ffde00" points="100,50 115,95 160,95 125,120 140,165 100,140 60,165 75,120 40,95 85,95"/></svg>',
    'ja' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><circle cx="320" cy="240" r="144" fill="#bc002d"/></svg>',
    'ar' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#00732f" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path d="M0 320h640v160H0z"/><path fill="#ff0000" d="M0 0h160v480H0z"/></svg>',
    'ru' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v160H0z"/><path fill="#0039a6" d="M0 160h640v160H0z"/><path fill="#d52b1e" d="M0 320h640v160H0z"/></svg>',
    'it' => '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#fff" d="M213.3 0h213.4v480H213.3z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></svg>'
];

function getCommonHeader($langCode, $prefix, $languages, $flags, $pageType) {
    $currentFlag = $flags[$langCode] ?? '';
    $currentName = $languages[$langCode]['name'] ?? 'English';
    $homeLink = $prefix . ($langCode === 'en' ? 'index.html' : "{$langCode}/index.html");
    
    $dropdownHtml = '';
    foreach ($languages as $code => $info) {
        $flagSvg = $flags[$code] ?? '';
        $targetPage = ($pageType === 'about') ? 'about-us.html' : 'contact-us.html';
        $link = ($code === 'en') ? ($prefix === '' ? $targetPage : "../{$targetPage}") : ($prefix === '' ? "{$code}/{$targetPage}" : ($prefix === '../' && $langCode === $code ? $targetPage : "../{$code}/{$targetPage}"));
        $activeClass = ($langCode === $code) ? 'font-bold bg-primary-50 text-primary-600' : '';
        $dropdownHtml .= "
          <a href=\"{$link}\" class=\"flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-dark-slate hover:bg-primary-50 hover:text-primary-600 transition-colors {$activeClass}\">
            <span class=\"flex items-center gap-2.5\">
              {$flagSvg}
              <span>{$info['name']}</span>
            </span>
            <span class=\"text-[10px] uppercase font-mono text-slate-400\">{$code}</span>
          </a>";
    }

    return <<<HTML
  <header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-surface-border shadow-xs transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-17">
        
        <!-- Logo -->
        <a href="{$homeLink}" class="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1" aria-label="CompressImageSize Home">
          <img src="{$prefix}images/logo.png" alt="CompressImageSize" class="h-8 sm:h-9 w-auto object-contain" width="225" height="40" />
        </a>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="{$homeLink}" class="hover:text-primary-600 transition-colors">Image Compressor</a>
          <a href="{$prefix}how-it-works/" class="hover:text-primary-600 transition-colors">How It Works</a>
        </nav>

        <!-- World Top 10 Language Switcher -->
        <div class="flex items-center gap-3">
          <div class="relative" id="langDropdownContainer">
            <button id="langToggleBtn" type="button" class="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark-body bg-slate-50 hover:bg-slate-100 border border-surface-border px-3 py-2 sm:py-2 rounded-lg transition-all focus:ring-2 focus:ring-primary-600">
              <span id="currentLangFlag" class="inline-flex items-center">
                {$currentFlag}
              </span>
              <span id="currentLangText">{$currentName}</span>
              <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" id="langChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Language Dropdown Menu -->
            <div id="langMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-surface-border py-2 z-50 max-h-96 overflow-y-auto">
              <div class="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">Global Top 10 Languages</div>
              {$dropdownHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
HTML;
}

function getCommonFooter($langCode, $prefix, $languages, $flags, $pageType) {
    $homeLink = $prefix . ($langCode === 'en' ? 'index.html' : "{$langCode}/index.html");
    
    $footerLangGrid = '';
    foreach ($languages as $code => $info) {
        $flagSvg = $flags[$code] ?? '';
        $targetPage = ($pageType === 'about') ? 'about-us.html' : 'contact-us.html';
        $link = ($code === 'en') ? ($prefix === '' ? $targetPage : "../{$targetPage}") : ($prefix === '' ? "{$code}/{$targetPage}" : ($prefix === '../' && $langCode === $code ? $targetPage : "../{$code}/{$targetPage}"));
        $footerLangGrid .= "
          <a href=\"{$link}\" class=\"flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors border border-transparent hover:border-slate-200 group\">
            {$flagSvg}
            <span class=\"text-xs text-slate-600 group-hover:text-primary-700 transition-colors\">{$info['name']}</span>
          </a>";
    }

    $privacyLink = ($langCode === 'en' ? $prefix . 'privacy-policy.html' : $prefix . "{$langCode}/privacy-policy.html");
    $termsLink = ($langCode === 'en' ? $prefix . 'terms-of-service.html' : $prefix . "{$langCode}/terms-of-service.html");
    $aboutLink = ($langCode === 'en' ? $prefix . 'about-us.html' : $prefix . "{$langCode}/about-us.html");
    $contactLink = ($langCode === 'en' ? $prefix . 'contact-us.html' : $prefix . "{$langCode}/contact-us.html");

    return <<<HTML
  <footer class="bg-slate-50 border-t border-surface-border mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="{$homeLink}" class="inline-block focus:outline-none rounded-lg p-1">
          <img src="{$prefix}images/logo.png" alt="CompressImageSize" class="h-9 w-auto object-contain" width="190" height="38" />
        </a>
      </div>

      <!-- Language Directory Switcher Hub -->
      <div class="py-8 border-b border-slate-200/80">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-dark-slate">Available Worldwide:</span>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {$footerLangGrid}
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-slate-500">
        <div class="text-center sm:text-left">
          &copy; 2026 CompressImageSize. All rights reserved.
          <br class="hidden sm:inline" />
          <div class="mt-2 text-sm text-slate-500">
            Powered by <a href="https://growautoai.com" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 font-semibold transition-colors">GrowAutoAI</a>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8">
          <a href="{$aboutLink}" class="hover:text-primary-600 transition-colors py-1">About Us</a>
          <a href="{$contactLink}" class="hover:text-primary-600 transition-colors py-1">Contact Us</a>
          <a href="{$privacyLink}" class="hover:text-primary-600 transition-colors py-1">Privacy Policy</a>
          <a href="{$termsLink}" class="hover:text-primary-600 transition-colors py-1">Terms of Service</a>
        </div>
      </div>

    </div>
  </footer>

  <script src="{$prefix}js/main.js?v=2.7"></script>
HTML;
}

echo "Building About Us and Contact Us Pages for all 10 languages...\n";

foreach ($languages as $langCode => $langInfo) {
    $prefix = $langInfo['prefix'];
    $destDir = ($langCode === 'en') ? __DIR__ : __DIR__ . "/{$langCode}";
    if (!is_dir($destDir)) {
        mkdir($destDir, 0777, true);
    }
    $cssPath = "{$prefix}css/style.css";

    // ─────────────────────────────────────────────────────────────
    // 1. ABOUT US
    // ─────────────────────────────────────────────────────────────
    $headerAbout = getCommonHeader($langCode, $prefix, $languages, $flags, 'about');
    $footerAbout = getCommonFooter($langCode, $prefix, $languages, $flags, 'about');
    $canonicalAbout = "https://compressimagesize.com/" . ($langCode === 'en' ? '' : "{$langCode}/") . "about-us.html";

    $aboutHtml = <<<HTML
<!DOCTYPE html>
<html lang="{$langCode}" dir="{$langInfo['dir']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us - CompressImageSize</title>
  <meta name="description" content="Learn more about CompressImageSize. We are dedicated to providing fast, secure, and privacy-focused client-side image compression.">
  <link rel="canonical" href="{$canonicalAbout}">
  <link rel="icon" href="{$prefix}images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">
  <link rel="stylesheet" href="{$prefix}css/custom.css?v=2.7">
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800 min-h-screen flex flex-col">
{$headerAbout}
  <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-6 sm:p-10 text-dark-body">
      <h1 class="text-3xl font-black text-dark-slate mb-6">About Us</h1>
      <p class="mb-4">Welcome to CompressImageSize, your trusted online utility for secure and lightning-fast image compression.</p>
      <h2 class="text-xl font-bold text-dark-slate mt-8 mb-3">Our Mission</h2>
      <p class="mb-4">We believe that optimizing images for the web should be accessible, free, and uncompromising on privacy. Traditional image compressors require you to upload your files to external servers. We've changed the paradigm by utilizing advanced HTML5 Canvas and WebAssembly to compress your images directly in your browser's RAM.</p>
      <h2 class="text-xl font-bold text-dark-slate mt-8 mb-3">Your Privacy is Our Priority</h2>
      <p class="mb-4">Your files never leave your device. Because all processing is done client-side, we have absolutely zero access to your photos. This guarantees 100% privacy and security.</p>
      <h2 class="text-xl font-bold text-dark-slate mt-8 mb-3">Contact Us</h2>
      <p class="mb-4">Have questions, feedback, or business inquiries? We'd love to hear from you.</p>
      <p>Email: <a href="mailto:hello@compressimagesize.com" class="text-primary-600 font-medium underline">hello@compressimagesize.com</a></p>
    </div>
  </main>
{$footerAbout}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/about-us.html", $aboutHtml);

    // ─────────────────────────────────────────────────────────────
    // 2. CONTACT US
    // ─────────────────────────────────────────────────────────────
    $headerContact = getCommonHeader($langCode, $prefix, $languages, $flags, 'contact');
    $footerContact = getCommonFooter($langCode, $prefix, $languages, $flags, 'contact');
    $canonicalContact = "https://compressimagesize.com/" . ($langCode === 'en' ? '' : "{$langCode}/") . "contact-us.html";
    $handlerUrl = $prefix . "contact-handler.php";

    $contactHtml = <<<HTML
<!DOCTYPE html>
<html lang="{$langCode}" dir="{$langInfo['dir']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - CompressImageSize</title>
  <meta name="description" content="Get in touch with the CompressImageSize team for any inquiries, support, or feedback.">
  <link rel="canonical" href="{$canonicalContact}">
  <link rel="icon" href="{$prefix}images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">
  <link rel="stylesheet" href="{$prefix}css/custom.css?v=2.7">
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800 min-h-screen flex flex-col">
{$headerContact}
  <main class="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-6 sm:p-10 text-dark-body">
      <h1 class="text-3xl font-black text-dark-slate mb-4">Contact Us</h1>
      <p class="mb-8 text-slate-600">Please fill out the form below or email us at <a href="mailto:hello@compressimagesize.com" class="text-primary-600 font-medium underline">hello@compressimagesize.com</a> and we will get back to you as soon as possible.</p>
      
      <form action="{$handlerUrl}" method="POST" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input type="text" id="name" name="name" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" placeholder="Your Name">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" placeholder="your@email.com">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea id="message" name="message" rows="5" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" placeholder="How can we help you?"></textarea>
        </div>
        <button type="submit" class="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 transition-all transform hover:-translate-y-0.5">
          Send Message
        </button>
      </form>
    </div>
  </main>
{$footerContact}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/contact-us.html", $contactHtml);

    echo "Generated for [{$langCode}] {$langInfo['name']}: about-us.html, contact-us.html\n";
}

echo "\nSUCCESS: All Info pages created across all 10 language directories!\n";
