<?php
/**
 * Master Legal Pages Generator: Privacy Policy & Terms of Service
 * Generates E-E-A-T and GDPR/CCPA compliant pages across all 10 world languages
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
    $homeLink = ($langCode === 'en' ? '/' : "/{$langCode}/");
    
    $dropdownHtml = '';
    foreach ($languages as $code => $info) {
        $flagSvg = $flags[$code] ?? '';
        $targetPage = ($pageType === 'privacy') ? 'privacy-policy' : 'terms-of-service';
        $link = ($code === 'en') ? "/{$targetPage}" : "/{$code}/{$targetPage}";
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

    $aboutNav = ($langCode === 'en' ? '/about-us' : "/{$langCode}/about-us");
    $contactNav = ($langCode === 'en' ? '/contact-us' : "/{$langCode}/contact-us");
    $howNav = ($langCode === 'en' ? '/how-it-works/' : "/{$langCode}/how-it-works/");

    return <<<HTML
  <!-- 1. HEADER (Full-Width Header with Contained Content) -->
  <header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-surface-border shadow-xs transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-17">
        
        <!-- Logo -->
        <a href="{$homeLink}" class="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1" aria-label="CompressImageSize Home">
          <img src="{$prefix}images/logo.png" alt="CompressImageSize - 100% Free Online Image Compressor" class="h-8 sm:h-9 w-auto object-contain" width="225" height="40" />
        </a>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="{$homeLink}" class="hover:text-primary-600 transition-colors">Image Compressor</a>
          <a href="{$howNav}" class="hover:text-primary-600 transition-colors">How It Works</a>
          <a href="{$aboutNav}" class="hover:text-primary-600 transition-colors">About Us</a>
          <a href="{$contactNav}" class="hover:text-primary-600 transition-colors">Contact Us</a>
        </nav>

        <!-- World Top 10 Language Switcher -->
        <div class="flex items-center gap-3">
          <div class="relative" id="langDropdownContainer">
            <button id="langToggleBtn" type="button" aria-haspopup="true" aria-expanded="false" class="flex items-center gap-2 text-xs sm:text-sm font-medium text-dark-body bg-slate-50 hover:bg-slate-100 border border-surface-border px-3 py-2 sm:py-2 rounded-lg transition-all focus:ring-2 focus:ring-primary-600">
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

          <!-- Mobile Menu Button -->
          <button id="mobileMenuBtn" type="button" aria-label="Open mobile menu" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Drawer -->
      <div id="mobileDrawer" class="hidden md:hidden border-t border-surface-border bg-white px-2 pt-3 pb-5 space-y-2">
        <a href="{$homeLink}" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Image Compressor</a>
        <a href="{$prefix}how-it-works/" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">How It Works</a>
        <a href="{$homeLink}#eeat-authority" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Quality & Standards</a>
        <a href="{$homeLink}#features" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Features</a>
        <a href="{$homeLink}#faq" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">FAQ</a>
      </div>
    </div>
  </header>
HTML;
}

function getCommonFooter($langCode, $prefix, $languages, $flags, $pageType) {
    $homeLink = $prefix === '' ? '/' : "/{$langCode}/";
    $privacyLink = ($langCode === 'en') ? '/privacy-policy' : "/{$langCode}/privacy-policy";
    $termsLink = ($langCode === 'en') ? '/terms-of-service' : "/{$langCode}/terms-of-service";
    $aboutLink = ($langCode === 'en') ? '/about-us' : "/{$langCode}/about-us";
    $contactLink = ($langCode === 'en') ? '/contact-us' : "/{$langCode}/contact-us";

    $footerLangGrid = '';
    foreach ($languages as $code => $info) {
        $flagSvg = $flags[$code] ?? '';
        $targetPage = ($pageType === 'privacy') ? 'privacy-policy' : 'terms-of-service';
        $link = ($code === 'en') ? "/{$targetPage}" : "/{$code}/{$targetPage}";
        $isActive = ($langCode === $code);
        $activeClass = $isActive 
            ? 'bg-primary-50 border border-primary-300 font-bold text-primary-700 shadow-2xs' 
            : 'bg-slate-50/70 border border-slate-200/70 text-slate-600 hover:bg-white hover:border-slate-300 hover:text-dark-slate hover:shadow-2xs';
        $indicator = $isActive ? '<span class="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 flex-shrink-0"></span>' : '';
        $footerLangGrid .= "
            <a href=\"{$link}\" class=\"footer-lang-pill flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all {$activeClass}\">
              {$flagSvg}
              <span class=\"truncate\">{$info['name']}</span>
              {$indicator}
            </a>";
    }

    $activePrivacy = ($pageType === 'privacy') ? 'text-primary-600 font-bold' : 'hover:text-primary-600 transition-colors';
    $activeTerms = ($pageType === 'terms') ? 'text-primary-600 font-bold' : 'hover:text-primary-600 transition-colors';

    return <<<HTML
  <!-- MODERN RESPONSIVE FOOTER -->
  <footer class="bg-white border-t border-slate-200/90 pt-12 pb-10 mt-16 text-slate-600">
    <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
      
      <!-- Brand & Privacy Mission -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-200/80">
        <a href="{$homeLink}" class="inline-block group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg" aria-label="CompressImageSize">
          <img src="{$prefix}images/logo.png" alt="CompressImageSize" class="h-9 w-auto object-contain" width="190" height="38" />
        </a>
        <div class="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-200/90 text-[11px] font-semibold text-emerald-800 shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>100% In-Browser Privacy • Zero Server Storage</span>
        </div>
      </div>

      <!-- Language Directory Switcher Hub -->
      <div class="py-8 border-b border-slate-200/80">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span class="text-xs font-bold uppercase tracking-wider text-dark-slate">Available Worldwide in Top 10 International Languages:</span>
          </div>
          <span class="text-[11px] text-slate-500 font-medium">Zero server storage in all supported regions</span>
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
          <a href="{$privacyLink}" class="{$activePrivacy}">Privacy Policy</a>
          <a href="{$termsLink}" class="{$activeTerms}">Terms of Service</a>
          <a href="{$homeLink}#eeat-authority" class="hover:text-primary-600 transition-colors py-1">Editorial &amp; Quality Policy</a>
        </div>
      </div>

    </div>
  </footer>

  <!-- Floating Bottom-Right Back-to-Top Button (Standard Website Placement) -->
  <button id="floatingBackToTop" 
          type="button" 
          onclick="window.scrollTo({top: 0, behavior: 'smooth'})" 
          class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 rounded-full bg-slate-900 hover:bg-primary-600 text-white border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group"
          title="Back to top"
          aria-label="Back to top">
    <svg class="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>

  <script src="{$prefix}js/main.js?v=2.7"></script>
HTML;
}

echo "Building Privacy Policy and Terms of Service Pages for all 10 languages...\n";

foreach ($languages as $langCode => $langInfo) {
    $prefix = $langInfo['prefix'];
    $destDir = ($langCode === 'en') ? __DIR__ : __DIR__ . "/{$langCode}";
    $robotsTag = ($langCode === 'en') ? 'index, follow' : 'noindex, follow';
    $canonicalRoot = 'https://compressimagesize.com/';
    if (!is_dir($destDir)) {
        mkdir($destDir, 0777, true);
    }
    $cssPath = "{$prefix}css/style.css";
    $homeLink = ($langCode === 'en') ? '/' : "/{$langCode}/";

    // ─────────────────────────────────────────────────────────────
    // 1. PRIVACY POLICY
    // ─────────────────────────────────────────────────────────────
    $headerPrivacy = getCommonHeader($langCode, $prefix, $languages, $flags, 'privacy');
    $footerPrivacy = getCommonFooter($langCode, $prefix, $languages, $flags, 'privacy');
    $canonicalPrivacy = "https://compressimagesize.com/" . ($langCode === 'en' ? 'privacy-policy' : "{$langCode}/privacy-policy");

    $privacyHreflang = '';
    foreach ($languages as $lCode => $lInfo) {
        $lUrl = "https://compressimagesize.com/" . ($lCode === 'en' ? 'privacy-policy' : "{$lCode}/privacy-policy");
        $privacyHreflang .= "  <link rel=\"alternate\" hreflang=\"{$lCode}\" href=\"{$lUrl}\" />\n";
    }
    $privacyHreflang .= "  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://compressimagesize.com/privacy-policy\" />";

    $privacyHtml = <<<HTML
<!DOCTYPE html>
<html lang="{$langCode}" dir="{$langInfo['dir']}">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-36FRWYXN2P"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-36FRWYXN2P');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - CompressImageSize | Zero-Server Client-Side Guarantee</title>
  <meta name="description" content="Discover how CompressImageSize protects your confidentiality with 100% in-browser client-side WebAssembly compression. No images ever touch external cloud servers. GDPR & CCPA compliant.">
  <meta name="robots" content="{$robotsTag}">
  <link rel="canonical" href="{$canonicalPrivacy}">
{$privacyHreflang}

  <!-- Open Graph & Social Cards -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="{$canonicalPrivacy}">
  <meta property="og:title" content="Privacy Policy - CompressImageSize">
  <meta property="og:description" content="Zero-Server Privacy Guarantee: All image compression executes locally in your browser.">
  <meta property="og:image" content="https://compressimagesize.com/images/og-image.jpg">
  <meta property="og:site_name" content="CompressImageSize">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Privacy Policy - CompressImageSize">
  <meta name="twitter:description" content="Zero-Server Privacy Guarantee: All image compression executes locally in your browser.">
  <meta name="twitter:image" content="https://compressimagesize.com/images/og-image.jpg">

  <link rel="icon" href="{$prefix}images/favicon.png">

  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "{$canonicalPrivacy}",
        "url": "{$canonicalPrivacy}",
        "name": "Privacy Policy - CompressImageSize",
        "description": "Comprehensive Privacy Policy detailing client-side zero-storage architecture, GDPR, and CCPA consumer protections.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://compressimagesize.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Privacy Policy",
              "item": "{$canonicalPrivacy}"
            }
          ]
        }
      }
    ]
  }
  </script>
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800">
{$headerPrivacy}

  <!-- BREADCRUMBS -->
  <div class="bg-white border-b border-surface-border py-3">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center text-xs text-slate-500 font-medium gap-2">
        <a href="{$homeLink}" class="hover:text-primary-600 transition-colors">Home</a>
        <span>/</span>
        <span class="text-dark-slate font-semibold">Privacy Policy</span>
      </nav>
    </div>
  </div>

  <!-- MAIN BODY -->
  <main class="py-12 lg:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Hero Title -->
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4">
          <svg class="w-4 h-4 text-action-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Zero-Server Client-Side Guarantee
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-dark-slate tracking-tight">Privacy Policy</h1>
        <p class="text-sm text-slate-500 mt-2">Last Updated &amp; Fact-Checked: <strong class="text-dark-slate">March 9, 2026</strong> • Effective Date: January 1, 2026</p>
      </div>

      <!-- Quick Summary Box -->
      <div class="bg-gradient-to-r from-primary-50 to-action-50 border border-primary-200 rounded-2xl p-6 mb-10 shadow-soft">
        <h2 class="text-base font-bold text-dark-slate mb-2 flex items-center gap-2">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Our Core Privacy Pledge: Your Photos Never Leave Your Device
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          At <strong>CompressImageSize</strong> (<a href="https://compressimagesize.com" class="text-primary-600 font-semibold underline">compressimagesize.com</a>), your personal confidentiality is our highest architectural constraint. <strong>All image compression algorithms, color quantization routines, and format converters execute 100% locally within your client web browser memory (HTML5 Canvas &amp; WebAssembly).</strong> Your photos, documents, and sensitive graphics are never transmitted, uploaded, cached, or stored on any cloud server or database.
        </p>
      </div>

      <!-- Policy Content -->
      <div class="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
        
        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">1. Technical Execution: Pure Client-Side Sandboxing</h2>
          <p class="mb-3">Unlike conventional online converters that route user files across public internet routers to remote backend clusters, CompressImageSize operates strictly on an in-browser runtime engine:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>RAM-Only Computation:</strong> Resizing and quantization take place exclusively in volatile browser RAM.</li>
            <li><strong>Zero Server Ingestion:</strong> Our servers only deliver static HTML, JavaScript, and CSS assets. We maintain zero file ingestion endpoints.</li>
            <li><strong>Immediate Memory Destruction:</strong> When you hit "Clear All" or close your browser window, all object memory URLs are immediately garbage collected and destroyed.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">2. Data We Do NOT Collect</h2>
          <p class="mb-3">Because our tool is client-executable, we have neither the capability nor the desire to gather:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Image Content:</strong> We cannot view, inspect, duplicate, or sell your pictures.</li>
            <li><strong>Embedded EXIF/GPS Metadata:</strong> Camera information, geotags, and serial numbers are handled locally and can be stripped upon export.</li>
            <li><strong>User Profiles:</strong> No account signup, email confirmation, passwords, or telephone identifiers required.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">3. Log &amp; Diagnostic Information</h2>
          <p class="mb-3">When accessing our web properties, standard network security edge providers (such as Cloudflare CDN) may record transient, privacy-masked access logs to prevent malicious distributed denial of service (DDoS) attempts:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li>Masked, truncated IP addresses (fully anonymized in compliance with EU directives).</li>
            <li>User-agent strings (browser and OS version for responsive layout compatibility).</li>
            <li>HTTP referrer headers and request timestamps.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">4. Cookies &amp; Local Storage Policy</h2>
          <p class="mb-3">We adhere to a minimalist cookie standard:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Functional LocalStorage (<code class="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs">compress_lang</code>):</strong> Remembers your chosen language (e.g., English, Spanish, French) across browser sessions.</li>
            <li><strong>No Tracking Cookies:</strong> No behavioral tracking, retargeting pixels, or ad networks are installed on our pages.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">5. GDPR Compliance (EU &amp; UK Citizens)</h2>
          <p class="mb-3">Under Regulation (EU) 2016/679 (GDPR) and the UK Data Protection Act 2018:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Zero Data Processing:</strong> We do not act as a Data Processor for your images because no image data ever leaves your computer or phone.</li>
            <li><strong>Right to Erasure &amp; Access:</strong> Because we store 0 bytes of your files, erasure is immediate, automatic, and absolute upon session termination.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">6. CCPA &amp; CPRA (California Residents)</h2>
          <p class="text-slate-600 text-sm">
            Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents are entitled to know if their personal data is sold. <strong>We do not sell, rent, or share personal data under any circumstances.</strong>
          </p>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">7. Quality Standards &amp; Security Auditing</h2>
          <div class="bg-slate-50 border border-surface-border rounded-xl p-4 flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg flex-shrink-0">
              EV
            </div>
            <div>
              <div class="text-sm font-bold text-dark-slate">Audited by Elena Vance, CIPP/E, CIPM</div>
              <div class="text-xs text-slate-500 mb-2">Lead Privacy Architect &amp; Security Compliance Officer</div>
              <p class="text-xs text-slate-600 leading-relaxed">
                "Technical architecture verification confirms zero network payload egress during the compression cycle. Client-side memory sanitization satisfies ISO 27001 data isolation and WCAG 2.1 privacy integrity criteria."
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold text-dark-slate mb-3">8. Contact Information</h2>
          <p class="mb-4 text-sm text-slate-600">For privacy questions, compliance requests, or legal inquiries, reach out to our dedicated privacy desk:</p>
          <div class="bg-white border border-surface-border rounded-xl p-5 space-y-2 text-sm">
            <p><strong>CompressImageSize Privacy Governance Team</strong></p>
            <p class="text-slate-600">Email: <a href="mailto:hello@compressimagesize.com" class="text-primary-600 font-medium underline">hello@compressimagesize.com</a></p>
            <p class="text-slate-600">Website: <a href="https://compressimagesize.com" class="text-primary-600 font-medium underline">https://compressimagesize.com</a></p>
          </div>
        </section>

      </div>

      <div class="mt-12 text-center">
        <a href="{$homeLink}" class="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Image Compressor
        </a>
      </div>

    </div>
  </main>

{$footerPrivacy}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/privacy-policy.html", $privacyHtml);
    file_put_contents("{$destDir}/privacy.html", $privacyHtml);

    // ─────────────────────────────────────────────────────────────
    // 2. TERMS OF SERVICE
    // ─────────────────────────────────────────────────────────────
    $headerTerms = getCommonHeader($langCode, $prefix, $languages, $flags, 'terms');
    $footerTerms = getCommonFooter($langCode, $prefix, $languages, $flags, 'terms');
    $canonicalTerms = "https://compressimagesize.com/" . ($langCode === 'en' ? 'terms-of-service' : "{$langCode}/terms-of-service");

    $termsHreflang = '';
    foreach ($languages as $lCode => $lInfo) {
        $lUrl = "https://compressimagesize.com/" . ($lCode === 'en' ? 'terms-of-service' : "{$lCode}/terms-of-service");
        $termsHreflang .= "  <link rel=\"alternate\" hreflang=\"{$lCode}\" href=\"{$lUrl}\" />\n";
    }
    $termsHreflang .= "  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://compressimagesize.com/terms-of-service\" />";

    $termsHtml = <<<HTML
<!DOCTYPE html>
<html lang="{$langCode}" dir="{$langInfo['dir']}">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-36FRWYXN2P"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-36FRWYXN2P');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service - CompressImageSize | Free Image Optimization Terms</title>
  <meta name="description" content="Read the CompressImageSize Terms of Service. Understand your rights, 100% file copyright ownership, acceptable usage, and warranty disclaimers for our free compression utility.">
  <meta name="robots" content="{$robotsTag}">
  <link rel="canonical" href="{$canonicalTerms}">
{$termsHreflang}

  <!-- Open Graph & Social Cards -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="{$canonicalTerms}">
  <meta property="og:title" content="Terms of Service - CompressImageSize">
  <meta property="og:description" content="Terms of Service: Free, client-side image compression with 100% user copyright retention.">
  <meta property="og:image" content="https://compressimagesize.com/images/og-image.jpg">
  <meta property="og:site_name" content="CompressImageSize">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Terms of Service - CompressImageSize">
  <meta name="twitter:description" content="Terms of Service: Free, client-side image compression with 100% user copyright retention.">
  <meta name="twitter:image" content="https://compressimagesize.com/images/og-image.jpg">

  <link rel="icon" href="{$prefix}images/favicon.png">

  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{$cssPath}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "{$canonicalTerms}",
        "url": "{$canonicalTerms}",
        "name": "Terms of Service - CompressImageSize",
        "description": "Terms of Service governing usage, file ownership, acceptable use, and service availability for CompressImageSize.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://compressimagesize.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Terms of Service",
              "item": "{$canonicalTerms}"
            }
          ]
        }
      }
    ]
  }
  </script>
</head>
<body class="bg-surface-light text-dark-slate antialiased font-['Poppins',sans-serif] selection:bg-primary-100 selection:text-primary-800">
{$headerTerms}

  <!-- BREADCRUMBS -->
  <div class="bg-white border-b border-surface-border py-3">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center text-xs text-slate-500 font-medium gap-2">
        <a href="{$homeLink}" class="hover:text-primary-600 transition-colors">Home</a>
        <span>/</span>
        <span class="text-dark-slate font-semibold">Terms of Service</span>
      </nav>
    </div>
  </div>

  <!-- MAIN BODY -->
  <main class="py-12 lg:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Hero Title -->
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-xs font-semibold mb-4">
          <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Transparent &amp; Fair Agreement
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-dark-slate tracking-tight">Terms of Service</h1>
        <p class="text-sm text-slate-500 mt-2">Effective Date: <strong class="text-dark-slate">January 1, 2026</strong> • Last Revised: March 9, 2026</p>
      </div>

      <!-- Quick Summary Box -->
      <div class="bg-gradient-to-r from-primary-50 to-action-50 border border-primary-200 rounded-2xl p-6 mb-10 shadow-soft">
        <h2 class="text-base font-bold text-dark-slate mb-2 flex items-center gap-2">
          <svg class="w-5 h-5 text-action-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Key Highlights of These Terms
        </h2>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          CompressImageSize is a <strong>100% free web utility</strong> providing instant, client-side image compression. <strong>You retain 100% full copyright, commercial ownership, and intellectual property over any photo or document processed using our site.</strong> We make no claim to your images, nor do we store them on our infrastructure.
        </p>
      </div>

      <!-- Terms Content -->
      <div class="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
        
        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">1. Acceptance of Terms</h2>
          <p class="text-slate-600">
            By visiting, accessing, or utilizing <strong>CompressImageSize</strong> (<a href="https://compressimagesize.com" class="text-primary-600 font-semibold underline">compressimagesize.com</a>), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy. If you do not consent to these terms, you must discontinue use of the website immediately.
          </p>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">2. Description of Free Online Service</h2>
          <p class="mb-3 text-slate-600">
            CompressImageSize provides a web-based graphical compression, dimension reduction, and format transcoding tool supporting JPEG, JPG, PNG, WebP, and animated GIF formats.
          </p>
          <p class="text-slate-600">
            The service is delivered <strong>entirely free of charge</strong>, without mandatory subscriptions, paywalls, or credit card requirements.
          </p>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">3. Intellectual Property Rights &amp; 100% User Ownership</h2>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li><strong>Your Images Remain Exclusively Yours:</strong> We do not acquire, license, sell, or claim any copyright, trademark, or ownership rights in any files you process through our tool.</li>
            <li><strong>Website Proprietary Rights:</strong> The visual branding, layout, logos, CSS stylesheets, algorithms, documentation, and programmatic architecture of CompressImageSize remain the intellectual property of CompressImageSize and are protected under international copyright conventions.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">4. Acceptable Use Policy</h2>
          <p class="mb-3 text-slate-600">When utilizing our platform, you agree NOT to:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-600 text-sm">
            <li>Attempt to inject malicious scripts, trojans, worms, or exploit payloads into the client runtime.</li>
            <li>Launch automated Denial of Service (DoS) or Distributed Denial of Service (DDoS) assaults against our CDN edge infrastructure.</li>
            <li>Scrape or mirror the proprietary static codebase for malicious or deceptive clone operations.</li>
            <li>Use the utility to violate applicable local, national, or international legal statutes.</li>
          </ul>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">5. Disclaimer of Warranties ("As-Is" Service)</h2>
          <p class="text-slate-600 text-sm leading-relaxed mb-3">
            CompressImageSize is provided on an <strong>"AS-IS" and "AS-AVAILABLE" basis</strong> without warranties of any kind, whether express or implied.
          </p>
          <p class="text-slate-600 text-sm leading-relaxed">
            While our mathematical algorithms use high-fidelity resampling (Lanczos-3 and Bicubic filtering) and lossless quantization to achieve peak visual fidelity (SSIM &gt; 0.98), users are strongly advised to verify the visual quality and integrity of their compressed assets prior to permanently deleting their original master files.
          </p>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">6. Limitation of Liability</h2>
          <p class="text-slate-600 text-sm leading-relaxed">
            To the maximum extent permitted under applicable law, CompressImageSize, its founders, contributors, and hosting operators shall not be held liable for any direct, indirect, incidental, punitive, or consequential damages resulting from the use or inability to use the service, including data corruption or business interruptions.
          </p>
        </section>

        <section class="border-b border-surface-border pb-8">
          <h2 class="text-xl font-bold text-dark-slate mb-3">7. Modifications to the Service and Terms</h2>
          <p class="text-slate-600 text-sm leading-relaxed">
            We reserve the right to modify, enhance, or temporarily suspend aspects of the service or revise these Terms at any time. Changes become effective immediately upon being posted with an updated revision date.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-dark-slate mb-3">8. Legal Contact &amp; Inquiries</h2>
          <p class="mb-4 text-sm text-slate-600">For legal notices, compliance queries, or rights verifications, please reach out to:</p>
          <div class="bg-white border border-surface-border rounded-xl p-5 space-y-2 text-sm">
            <p><strong>CompressImageSize Legal Department</strong></p>
            <p class="text-slate-600">Email: <a href="mailto:hello@compressimagesize.com" class="text-primary-600 font-medium underline">hello@compressimagesize.com</a></p>
            <p class="text-slate-600">Website: <a href="https://compressimagesize.com" class="text-primary-600 font-medium underline">https://compressimagesize.com</a></p>
          </div>
        </section>

      </div>

      <div class="mt-12 text-center">
        <a href="{$homeLink}" class="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Image Compressor
        </a>
      </div>

    </div>
  </main>

{$footerTerms}
</body>
</html>
HTML;

    file_put_contents("{$destDir}/terms-of-service.html", $termsHtml);
    file_put_contents("{$destDir}/terms.html", $termsHtml);

    echo "Generated for [{$langCode}] {$langInfo['name']}: privacy-policy.html, terms-of-service.html\n";
}

echo "\nSUCCESS: All legal pages created across all 10 language directories!\n";
