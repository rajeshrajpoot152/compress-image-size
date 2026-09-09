<?php
/**
 * Master Multi-Language Static Page Generator
 * Generates 40 Programmatic Keywords across World's Top 10 Languages (400 Total HTML Pages)
 * With E-E-A-T Schema, Full Interlinking, and Dedicated Language Folders
 */

$allKeywords = require __DIR__ . '/data/keywords.php';
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

    foreach ($allKeywords as $slug => $kwData) {
        $currentSlug   = $slug;
        $pageTitle     = $kwData['title'] . ($lang !== 'en' ? " - {$langData['lang_name']}" : "");
        $pageDesc      = $kwData['desc'];
        $pageH1        = $kwData['h1'];
        $pageSubhead   = $kwData['desc'];
        $targetFormat  = $kwData['format'];
        $targetQuality = $kwData['quality'] ?? 80;
        $canonicalUrl  = "https://compressimagesize.com/" . ($lang !== 'en' ? "{$lang}/" : "") . "{$slug}.html";

        // Render template
        ob_start();
        require __DIR__ . '/views/template.php';
        $html = ob_get_clean();

        $outputFile = "{$destDir}/{$slug}.html";
        file_put_contents($outputFile, $html);

        // Also if it's the primary tool 'compress-image-to-50kb', make it index.html for that language folder!
        if ($slug === 'compress-image-to-50kb') {
            file_put_contents("{$destDir}/index.html", $html);
        }

        $totalGenerated++;
    }
}

echo "\n============================================\n";
echo "SUCCESS: {$totalGenerated} separate pages successfully generated!\n";
echo "All 10 global languages have their own dedicated directory and pages!\n";
