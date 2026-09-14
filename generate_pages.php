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

    foreach ($allKeywords as $slug => $kwRawData) {
        $currentSlug   = $slug;
        $kwData        = function_exists('getLocalizedKeywordData') ? getLocalizedKeywordData($slug, $lang, $kwRawData) : $kwRawData;
        $pageTitle     = $kwData['title'] . ($lang !== 'en' && strpos($kwData['title'], $langData['lang_name']) === false ? " - {$langData['lang_name']}" : "");
        $pageDesc      = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
        $pageH1        = $kwData['h1'];
        $pageSubhead   = $kwData['desc'] ?? ($langData['hero_desc'] ?? $kwRawData['desc']);
        $targetFormat  = $kwData['format'];
        $targetQuality = $kwData['quality'] ?? 60;
        $isRoot = ($slug === 'compress-image-size');
        $canonicalUrl = "https://compressimagesize.com/" . ($lang !== 'en' ? "{$lang}/" : "") . ($isRoot ? "" : "{$slug}.html");

        // Render template
        ob_start();
        require __DIR__ . '/views/template.php';
        $html = ob_get_clean();

        if ($isRoot) {
            $outputFile = "{$destDir}/index.html";
            file_put_contents($outputFile, $html);
            // Delete the old duplicate file if it exists
            if (file_exists("{$destDir}/compress-image-size.html")) {
                unlink("{$destDir}/compress-image-size.html");
            }
        } else {
            $outputFile = "{$destDir}/{$slug}.html";
            file_put_contents($outputFile, $html);
        }

        $totalGenerated++;
    }
}

echo "\n============================================\n";
echo "SUCCESS: {$totalGenerated} separate pages successfully generated!\n";
echo "All 10 global languages have their own dedicated directory and pages!\n";
