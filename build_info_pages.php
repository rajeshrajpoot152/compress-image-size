<?php
/**
 * Info Pages Generator: About Us, Contact Us & Thank You
 * Generates pages across all 10 world languages with proper SEO (hreflang)
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
        $targetPage = ($pageType === 'about') ? 'about-us.html' : (($pageType === 'contact') ? 'contact-us.html' : 'thank-you.html');
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
        <a href="{$homeLink}" class="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1" aria-label="CompressImageSize Home">
          <img src="{$prefix}images/logo.png" alt="CompressImageSize" class="h-8 sm:h-9 w-auto object-contain" width="225" height="40" />
        </a>
        <nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="{$homeLink}" class="hover:text-primary-600 transition-colors">Image Compressor</a>
          <a href="{$prefix}how-it-works/" class="hover:text-primary-600 transition-colors">How It Works</a>
          <a href="{$prefix}about-us.html" class="hover:text-primary-600 transition-colors">About Us</a>
          <a href="{$prefix}contact-us.html" class="hover:text-primary-600 transition-colors">Contact Us</a>
        </nav>
        <div class="flex items-center gap-3">
          <div class="relative" id="langDropdownContainer">
            <button id="langToggleBtn" type="button" class="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark-body bg-slate-50 hover:bg-slate-100 border border-surface-border px-3 py-2 sm:py-2 rounded-lg transition-all focus:ring-2 focus:ring-primary-600">
              <span id="currentLangFlag" class="inline-flex items-center">{$currentFlag}</span>
              <span id="currentLangText">{$currentName}</span>
              <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" id="langChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id="langMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-surface-border py-2 z-50 max-h-96 overflow-y-auto">
              {$dropdownHtml}
            </div>
          </div>
          <!-- Mobile Menu Button -->
          <button id="mobileMenuBtn" type="button" aria-label="Open mobile menu" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
        $targetPage = ($pageType === 'about') ? 'about-us.html' : (($pageType === 'contact') ? 'contact-us.html' : 'thank-you.html');
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

echo "Building About Us, Contact Us, and Thank You Pages for all 10 languages...\n";

foreach ($languages as $langCode => $langInfo) {
    $prefix = $langInfo['prefix'];
    $destDir = ($langCode === 'en') ? __DIR__ : __DIR__ . "/{$langCode}";
    if (!is_dir($destDir)) {
        mkdir($destDir, 0777, true);
    }
    $cssPath = "{$prefix}css/style.css";

    // ─────────────────────────────────────────────────────────────
    // HREFLANG TAG GENERATOR
    // ─────────────────────────────────────────────────────────────
    $aboutHreflang = '';
    $contactHreflang = '';
    $thanksHreflang = '';
    
    foreach ($languages as $lCode => $lInfo) {
        $lUrlAbout = "https://compressimagesize.com/" . ($lCode === 'en' ? '' : "{$lCode}/") . "about-us.html";
        $aboutHreflang .= "  <link rel=\"alternate\" hreflang=\"{$lCode}\" href=\"{$lUrlAbout}\" />\n";
        
        $lUrlContact = "https://compressimagesize.com/" . ($lCode === 'en' ? '' : "{$lCode}/") . "contact-us.html";
        $contactHreflang .= "  <link rel=\"alternate\" hreflang=\"{$lCode}\" href=\"{$lUrlContact}\" />\n";
        
        $lUrlThanks = "https://compressimagesize.com/" . ($lCode === 'en' ? '' : "{$lCode}/") . "thank-you.html";
        $thanksHreflang .= "  <link rel=\"alternate\" hreflang=\"{$lCode}\" href=\"{$lUrlThanks}\" />\n";
    }
    $aboutHreflang .= "  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://compressimagesize.com/about-us.html\" />";
    $contactHreflang .= "  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://compressimagesize.com/contact-us.html\" />";
    $thanksHreflang .= "  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://compressimagesize.com/thank-you.html\" />";


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
  <title>About Us - CompressImageSize | Client-Side Image Compression</title>
  <meta name="description" content="Learn about CompressImageSize. We provide ultra-fast, 100% private, client-side WebAssembly image compression. Your files never leave your device.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{$canonicalAbout}">
{$aboutHreflang}
  <link rel="icon" href="{$prefix}images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">
  <link rel="stylesheet" href="{$prefix}css/custom.css?v=2.8">
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800 min-h-screen flex flex-col">
{$headerAbout}
  <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <!-- Hero Section -->
    <div class="text-center mb-12 sm:mb-16">
      <div class="inline-flex items-center justify-center p-4 bg-primary-50 rounded-full mb-4">
        <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h1 class="text-4xl sm:text-5xl font-black text-dark-slate mb-6 tracking-tight">Redefining Image Compression</h1>
      <p class="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Welcome to CompressImageSize, your trusted online utility for secure and lightning-fast image compression powered by modern browser technologies.</p>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
      
      <div class="flex flex-col gap-8">
        <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-8 flex-1">
          <h2 class="text-2xl font-bold text-dark-slate mb-4 flex items-center gap-3">
            <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            Our Mission
          </h2>
          <p class="text-slate-600 leading-relaxed mb-4">We believe that optimizing images for the web should be accessible, free, and uncompromising on privacy. Traditional image compressors require you to upload your files to remote cloud servers, which slows down the process and introduces privacy risks.</p>
          <p class="text-slate-600 leading-relaxed">We've changed the paradigm by utilizing advanced HTML5 Canvas and WebAssembly. CompressImageSize processes and optimizes your images directly in your device's memory, ensuring unmatched speed and absolute confidentiality.</p>
        </div>

        <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-8 flex-1">
          <h2 class="text-2xl font-bold text-dark-slate mb-4 flex items-center gap-3">
            <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            Privacy First Commitment
          </h2>
          <p class="text-slate-600 leading-relaxed mb-4">Your files never leave your device. Because all processing is done client-side, we have absolutely zero access to your photos. This guarantees 100% privacy and security.</p>
          <p class="text-slate-600 leading-relaxed">We do not store, analyze, or view any image you compress using our tool. It is entirely stateless and safe for sensitive corporate or personal documents.</p>
        </div>
      </div>

      <!-- Sidebar Features -->
      <div class="flex flex-col gap-6">
        <div class="bg-primary-50 rounded-2xl p-6 border border-primary-100">
          <h3 class="text-lg font-bold text-primary-900 mb-4">Why Choose Us?</h3>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <div>
                <strong class="block text-primary-900 text-sm">100% In-Browser Tech</strong>
                <span class="text-primary-700 text-sm">No uploads, no waiting.</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <div>
                <strong class="block text-primary-900 text-sm">Unlimited Usage</strong>
                <span class="text-primary-700 text-sm">No daily limits or hidden fees.</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <div>
                <strong class="block text-primary-900 text-sm">Highest Quality</strong>
                <span class="text-primary-700 text-sm">Smart compression algorithms.</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-6 text-center">
          <h3 class="text-lg font-bold text-dark-slate mb-2">Have Questions?</h3>
          <p class="text-sm text-slate-500 mb-4">We're here to help you get the most out of our tool.</p>
          <a href="{$prefix}contact-us.html" class="inline-flex items-center justify-center w-full px-4 py-2.5 bg-slate-900 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors">
            Contact Support
          </a>
        </div>
      </div>
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
  <title>Contact Us - CompressImageSize | Get in Touch</title>
  <meta name="description" content="Contact the CompressImageSize support team for inquiries, feedback, and technical assistance. We are here to help.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{$canonicalContact}">
{$contactHreflang}
  <link rel="icon" href="{$prefix}images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">
  <link rel="stylesheet" href="{$prefix}css/custom.css?v=2.8">
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800 min-h-screen flex flex-col">
{$headerContact}
  <main class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    
    <div class="text-center mb-12">
      <h1 class="text-4xl sm:text-5xl font-black text-dark-slate mb-4">Get In Touch</h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">Have a question about our compression technology, feedback on the tool, or a business inquiry? We'd love to hear from you.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
      <!-- Contact Information Sidebar -->
      <div class="flex flex-col gap-6">
        <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 class="text-xl font-bold text-dark-slate mb-6">Contact Information</h2>
          
          <div class="flex flex-col gap-6">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-primary-50 rounded-xl text-primary-600 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-dark-slate">Email Us</h3>
                <a href="mailto:hello@compressimagesize.com" class="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">hello@compressimagesize.com</a>
                <p class="text-xs text-slate-500 mt-1">We aim to reply within 24 hours.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-dark-slate">Support</h3>
                <p class="text-sm text-slate-600">Check our <a href="{$prefix}how-it-works/" class="text-primary-600 font-medium hover:underline">How It Works</a> guide for immediate help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <div class="bg-white border border-surface-border rounded-2xl shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-primary-600"></div>
          <h2 class="text-2xl font-bold text-dark-slate mb-6">Send a Message</h2>
          
          <form action="{$handlerUrl}" method="POST" class="flex flex-col gap-6">
            <input type="hidden" name="lang" value="{$langCode}">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                <input type="text" id="name" name="name" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400" placeholder="John Doe">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input type="email" id="email" name="email" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400" placeholder="john@example.com">
              </div>
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
              <textarea id="message" name="message" rows="5" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 resize-y" placeholder="How can we help you today?"></textarea>
            </div>
            
            <div class="pt-2">
              <button type="submit" class="w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <span>Send Message</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  </main>
{$footerContact}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/contact-us.html", $contactHtml);


    // ─────────────────────────────────────────────────────────────
    // 3. THANK YOU PAGE
    // ─────────────────────────────────────────────────────────────
    $headerThanks = getCommonHeader($langCode, $prefix, $languages, $flags, 'thank-you');
    $footerThanks = getCommonFooter($langCode, $prefix, $languages, $flags, 'thank-you');
    $canonicalThanks = "https://compressimagesize.com/" . ($langCode === 'en' ? '' : "{$langCode}/") . "thank-you.html";

    $thanksHtml = <<<HTML
<!DOCTYPE html>
<html lang="{$langCode}" dir="{$langInfo['dir']}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - CompressImageSize</title>
  <meta name="description" content="Thank you for contacting CompressImageSize. We have received your message.">
  <meta name="robots" content="noindex, follow"> <!-- Excluded from indexing as per SEO best practices -->
  <link rel="canonical" href="{$canonicalThanks}">
{$thanksHreflang}
  <link rel="icon" href="{$prefix}images/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">
  <link rel="stylesheet" href="{$prefix}css/custom.css?v=2.8">
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800 min-h-screen flex flex-col">
{$headerThanks}
  <main class="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex items-center justify-center">
    
    <div class="bg-white border border-surface-border rounded-3xl shadow-sm p-10 sm:p-16 text-center max-w-lg w-full">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full mb-6">
        <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
      </div>
      
      <h1 class="text-3xl font-black text-dark-slate mb-4">Message Sent!</h1>
      <p class="text-slate-600 mb-8 leading-relaxed">Thank you for getting in touch with us. We have received your message and our team will get back to you shortly.</p>
      
      <a href="{$prefix}index.html" class="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-600/25 transition-all transform hover:-translate-y-0.5">
        Return to Home
      </a>
    </div>

  </main>
{$footerThanks}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/thank-you.html", $thanksHtml);


    echo "Generated for [{$langCode}] {$langInfo['name']}: about-us.html, contact-us.html, thank-you.html\n";
}

echo "\nSUCCESS: All Info pages created across all 10 language directories!\n";
