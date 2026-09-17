<?php
/**
 * Master XML Sitemap Generator - SEO AUDIT COMPLIANT
 */

$allKeywords = require __DIR__ . '/data/keywords.php';
$languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
$domain = 'https://compressimagesize.com';

$keepKeywords = [
    'compress-image-size', // Master index
    'compress-image-to-10kb', 'compress-image-to-20kb', 'compress-image-to-30kb', 
    'compress-image-to-50kb', 'compress-image-to-100kb', 'compress-image-to-200kb', 'compress-image-to-1mb',
    'resize-image-to-20kb', 'resize-image-to-50kb', 'resize-image-to-100kb',
    'reduce-image-size-in-kb',
    'compress-jpeg', 'png-compressor', 'compress-gif', 'compress-webp-online',
    'convert-png-to-jpg', 'convert-jpg-to-webp',
    'shopify-image-optimizer', 'wordpress-image-reducer'
];

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
$xml .= '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

$today = date('Y-m-d');
$totalUrls = 0;

// 1. Core Tool Pages
foreach ($keepKeywords as $keywordKey) {
    if (!isset($allKeywords[$keywordKey])) continue;
    
    $slug = $allKeywords[$keywordKey]['slug'];
    $priority = ($keywordKey === 'compress-image-size') ? '1.0' : '0.9';
    $changefreq = 'weekly';
    $cleanPath = ($keywordKey === 'compress-image-size') ? '' : "{$slug}";

    foreach ($languages as $lang) {
        $loc = ($lang === 'en') 
            ? ($cleanPath === '' ? "{$domain}/" : "{$domain}/{$cleanPath}") 
            : ($cleanPath === '' ? "{$domain}/{$lang}/" : "{$domain}/{$lang}/{$cleanPath}");
        
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>{$changefreq}</changefreq>\n";
        $xml .= "    <priority>{$priority}</priority>\n";

        foreach ($languages as $altLang) {
            $altLoc = ($altLang === 'en') 
                ? ($cleanPath === '' ? "{$domain}/" : "{$domain}/{$cleanPath}") 
                : ($cleanPath === '' ? "{$domain}/{$altLang}/" : "{$domain}/{$altLang}/{$cleanPath}");
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
        }
        $xDefaultLoc = ($cleanPath === '' ? "{$domain}/" : "{$domain}/{$cleanPath}");
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$xDefaultLoc}\" />\n";
        $xml .= "  </url>\n";
        
        $totalUrls++;
    }
}

// 2. Legal & Mandatory Pages (Privacy Policy, Terms of Service, About Us, Contact Us)
$legalPages = ['privacy-policy', 'terms-of-service', 'about-us', 'contact-us'];
foreach ($legalPages as $page) {
    foreach ($languages as $lang) {
        // Exclude Portuguese for privacy-policy as it is consolidated to main English version
        if ($page === 'privacy-policy' && $lang === 'pt') {
            continue;
        }

        $loc = ($lang === 'en') ? "{$domain}/{$page}" : "{$domain}/{$lang}/{$page}";
        
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>monthly</changefreq>\n";
        $xml .= "    <priority>0.5</priority>\n";

        foreach ($languages as $altLang) {
            if ($page === 'privacy-policy' && $altLang === 'pt') {
                continue;
            }
            $altLoc = ($altLang === 'en') ? "{$domain}/{$page}" : "{$domain}/{$altLang}/{$page}";
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
        }
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$domain}/{$page}\" />\n";
        $xml .= "  </url>\n";

        $totalUrls++;
    }
}

// 3. User Guide (How It Works for all 10 languages)
foreach ($languages as $lang) {
    $loc = ($lang === 'en') ? "{$domain}/how-it-works/" : "{$domain}/{$lang}/how-it-works/";
    
    $xml .= "  <url>\n";
    $xml .= "    <loc>{$loc}</loc>\n";
    $xml .= "    <lastmod>{$today}</lastmod>\n";
    $xml .= "    <changefreq>monthly</changefreq>\n";
    $xml .= "    <priority>0.8</priority>\n";

    foreach ($languages as $altLang) {
        $altLoc = ($altLang === 'en') ? "{$domain}/how-it-works/" : "{$domain}/{$altLang}/how-it-works/";
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
    }
    $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$domain}/how-it-works/\" />\n";
    $xml .= "  </url>\n";

    $totalUrls++;
}

$xml .= '</urlset>' . "\n";

file_put_contents(__DIR__ . '/sitemap.xml', $xml);

echo "SUCCESS: sitemap.xml generated with {$totalUrls} SEO-Safe URLs and full multi-language hreflang alternate links!\n";
