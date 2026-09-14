<?php
/**
 * SEO 301 Redirect Generator for MERGED pages
 * Safely redirects duplicate/thin intent keywords to their KEEP counterparts.
 */

$mergeMap = [
    'image-kb-size-reducer' => 'reduce-image-size-in-kb',
    'compress-jpg-online' => 'compress-jpeg',
    'compress-a-jpg' => 'compress-jpeg',
    'reduce-size-of-jpg' => 'compress-jpeg',
    'jpeg-size-reducer' => 'compress-jpeg',
    'png-size-reducer' => 'png-compressor',
    'reduce-png-file-size' => 'png-compressor',
    'animated-gif-compressor' => 'compress-gif',
    'reduce-image-size' => 'reduce-image-size-in-kb',
    'photo-size-reducer' => 'reduce-image-size-in-kb',
    'minimize-picture-size' => 'reduce-image-size-in-kb',
    'decrease-image-size' => 'reduce-image-size-in-kb',
    'shrink-image-online' => 'reduce-image-size-in-kb',
    'condense-image' => 'reduce-image-size-in-kb',
    'reduce-image-resolution' => 'resize-image-to-100kb',
    'reduce-image-dimensions' => 'resize-image-to-100kb',
    'image-compressor-online' => '', // Redirects to root
    'image-size-reducer' => 'reduce-image-size-in-kb',
    'bulk-image-compressor' => '',
    'lossless-image-compressor' => ''
];

$languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];

$htaccessContent = "\n# --- SEO PHASE 5: MERGE & REDIRECT THIN PAGES ---\n";
$htaccessContent .= "RewriteEngine On\n\n";

foreach ($mergeMap as $oldSlug => $newSlug) {
    foreach ($languages as $lang) {
        $prefix = ($lang === 'en') ? "" : "{$lang}/";
        $oldUrl = "^" . $prefix . $oldSlug . "\.html$";
        
        if ($newSlug === '') {
            $newUrl = "/" . ($lang === 'en' ? "" : $lang . "/");
        } else {
            $newUrl = "/" . $prefix . $newSlug . ".html";
        }
        
        $htaccessContent .= "RewriteRule {$oldUrl} {$newUrl} [R=301,L]\n";
    }
}
$htaccessContent .= "# --- END SEO REDIRECTS ---\n";

$htaccessFile = __DIR__ . '/.htaccess';
$existing = file_exists($htaccessFile) ? file_get_contents($htaccessFile) : '';

// Remove old block if exists
$existing = preg_replace('/# --- SEO PHASE 5:.*# --- END SEO REDIRECTS ---\n/s', '', $existing);

file_put_contents($htaccessFile, $existing . $htaccessContent);

echo "Successfully appended 301 redirects to .htaccess for " . count($mergeMap) . " duplicate pages across all 10 languages.\n";
