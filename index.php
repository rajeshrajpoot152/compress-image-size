<?php
/**
 * CompressImageSize - Single File Dynamic Routing Engine
 * Generates 40 programmatic SEO pages across World's Top 10 Languages dynamically
 * E-E-A-T Optimized with Strict Security Protocols
 */

$allKeywords = require __DIR__ . '/data/keywords.php';

// Sanitize & Validate Language (Top 10 World Languages - No Indian Languages)
$supportedLangs = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
$currentLang = isset($_GET['lang']) ? strtolower(preg_replace('/[^a-z]/', '', $_GET['lang'])) : 'en';
if (!in_array($currentLang, $supportedLangs)) {
    $currentLang = 'en';
}

// Sanitize & Validate Keyword Tool
$currentSlug = isset($_GET['tool']) ? strtolower(preg_replace('/[^a-z0-9\-]/', '', $_GET['tool'])) : 'compress-image-size';
if (!isset($allKeywords[$currentSlug])) {
    $currentSlug = 'compress-image-size';
}

// Load Translations
$langFile = __DIR__ . "/lang/{$currentLang}.php";
$langData = file_exists($langFile) ? require $langFile : require __DIR__ . "/lang/en.php";

// Extract Page Details
$kwData = $allKeywords[$currentSlug];
$pageTitle = $kwData['title'] . ($currentLang !== 'en' ? " - {$langData['lang_name']}" : "");
$pageDesc  = $kwData['desc'];
$pageH1    = $kwData['h1'];
$pageSubhead = $kwData['desc'];
$targetFormat = $kwData['format'];
$targetQuality = $kwData['quality'] ?? 80;

$canonicalUrl = "https://compressimagesize.com/" . ($currentLang !== 'en' ? "{$currentLang}/" : "") . "{$currentSlug}.html";

// Render View
require __DIR__ . '/views/template.php';
