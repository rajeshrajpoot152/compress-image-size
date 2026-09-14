<?php
/**
 * Master Multi-Language Static Page Generator
 * Generates 40 Programmatic Keywords across World's Top 10 Languages (400 Total HTML Pages)
 * With E-E-A-T Schema, Full Interlinking, and Dedicated Language Folders
 */

$allKeywords = require __DIR__ . '/data/keywords.php';
require_once __DIR__ . '/data/localized_keywords.php';
$languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];

echo "Starting Generation for Top 10 World Languages...\n";

$totalGenerated = 0;

foreach ($languages as $lang) {
    $currentLang = $lang;
    $langFile = __DIR__ . "/lang/{$lang}.php";
    $langData = file_exists($langFile) ? require $langFile : require __DIR__ . "/lang/en.php";

    // Destination Directory
    $destDir = ($lang === 'en') ? __DIR__ : __DIR__ . "/{$lang}";
    if (!is_dir($destDir)) {
        mkdir($destDir, 0777, true);
    }

    echo "\nGenerating for Language: [{$lang}] {$langData['lang_name']} ...\n";

    // ONLY GENERATE THE PRIMARY HOME PAGE TO PASS ADSENSE
    // Generating 39 duplicate intent pages will cause AdSense "Thin/Doorway Content" rejection.
    $primaryKeyword = 'compress-image-size';
    $kwRawData = $allKeywords[$primaryKeyword];

    $currentSlug   = $primaryKeyword;
    $kwData        = function_exists('getLocalizedKeywordData') ? getLocalizedKeywordData($primaryKeyword, $lang, $kwRawData) : $kwRawData;
    $pageTitle     = $kwData['title'] . ($lang !== 'en' && strpos($kwData['title'], $langData['lang_name']) === false ? " - {$langData['lang_name']}" : "");
    $pageDesc      = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
    $pageH1        = $kwData['h1'];
    $pageSubhead   = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
    $targetFormat  = $kwData['format'];
    $targetQuality = $kwData['quality'] ?? 60;
    
    $canonicalUrl = "https://compressimagesize.com/" . ($lang !== 'en' ? "{$lang}/" : "");

    // Render template
    ob_start();
    require __DIR__ . '/views/template.php';
    $html = ob_get_clean();

    $outputFile = "{$destDir}/index.html";
    file_put_contents($outputFile, $html);
    
    $totalGenerated++;
}

echo "\n============================================\n";
echo "SUCCESS: {$totalGenerated} clean, AdSense-safe pages successfully generated!\n";
echo "All 10 global languages have their own dedicated directory and pages!\n";
