<?php
/**
 * Master Multi-Language Static Page Generator - SEO AUDIT COMPLIANT
 * Generates ONLY the uniquely identified "KEEP & OPTIMIZE" pages (avoiding Thin Content & Cannibalization)
 */

$allKeywords = require __DIR__ . '/data/keywords.php';
require_once __DIR__ . '/data/localized_keywords.php';
$languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];

// STRATEGIC PHASE 5: KEEP & OPTIMIZE LIST
$keepKeywords = [
    'compress-image-size', // Master index
    'compress-image-to-10kb', 'compress-image-to-20kb', 'compress-image-to-30kb', 
    'compress-image-to-50kb', 'compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-1mb',
    'resize-image-to-20kb', 'resize-image-to-50kb', 'resize-image-to-100kb',
    'reduce-image-size-in-kb', // Generic KB reducer
    'compress-jpeg', 'png-compressor', 'compress-gif', 'compress-webp-online',
    'convert-png-to-jpg', 'convert-jpg-to-webp',
    'shopify-image-optimizer', 'wordpress-image-reducer'
];

echo "Starting AdSense-Safe SEO Generation for Top 10 Languages...\n";

$totalGenerated = 0;

foreach ($languages as $lang) {
    $currentLang = $lang;
    $langFile = __DIR__ . "/lang/{$lang}.php";
    $langData = file_exists($langFile) ? require $langFile : require __DIR__ . "/lang/en.php";

    $destDir = ($lang === 'en') ? __DIR__ : __DIR__ . "/{$lang}";
    if (!is_dir($destDir)) {
        mkdir($destDir, 0777, true);
    }

    echo "\n[{$lang}] Generating " . count($keepKeywords) . " unique intent pages...\n";

    foreach ($keepKeywords as $keywordKey) {
        if (!isset($allKeywords[$keywordKey])) continue;
        
        $kwRawData = $allKeywords[$keywordKey];
        $currentSlug = $kwRawData['slug'];
        
        // Use localized data if available
        $kwData = function_exists('getLocalizedKeywordData') ? getLocalizedKeywordData($keywordKey, $lang, $kwRawData) : $kwRawData;
        
        $pageTitle     = $kwData['title'] . ($lang !== 'en' && strpos($kwData['title'], $langData['lang_name']) === false ? " - {$langData['lang_name']}" : "");
        $pageDesc      = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
        $pageH1        = $kwData['h1'];
        $pageSubhead   = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
        $targetFormat  = $kwData['format'];
        $targetQuality = $kwData['quality'] ?? 60;
        
        // File naming: master goes to index.html, others to slug.html
        $filename = ($keywordKey === 'compress-image-size') ? 'index.html' : "{$currentSlug}.html";
        $canonicalUrl = "https://compressimagesize.com/" . ($lang !== 'en' ? "{$lang}/" : "") . ($keywordKey === 'compress-image-size' ? '' : $filename);

        ob_start();
        require __DIR__ . '/views/template.php';
        $html = ob_get_clean();

        $outputFile = "{$destDir}/{$filename}";
        file_put_contents($outputFile, $html);
        
        $totalGenerated++;
    }
}

echo "\n============================================\n";
echo "SUCCESS: {$totalGenerated} AdSense-Safe unique pages generated!\n";
echo "Removed duplicate/thin pages based on Phase 5 SEO Strategy.\n";
