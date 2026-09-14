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
    $filename = ($keywordKey === 'compress-image-size') ? '' : "{$slug}.html";

    foreach ($languages as $lang) {
        $loc = ($lang === 'en') ? "{$domain}/{$filename}" : "{$domain}/{$lang}/{$filename}";
        
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>{$changefreq}</changefreq>\n";
        $xml .= "    <priority>{$priority}</priority>\n";

        foreach ($languages as $altLang) {
            $altLoc = ($altLang === 'en') ? "{$domain}/{$filename}" : "{$domain}/{$altLang}/{$filename}";
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
        }
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$domain}/{$filename}\" />\n";
        $xml .= "  </url>\n";
        
        $totalUrls++;
    }
}

// 2. Legal & Mandatory Pages (Privacy Policy, Terms of Service, About Us, Contact Us)
$legalPages = ['privacy-policy', 'terms-of-service', 'about-us', 'contact-us'];
foreach ($legalPages as $page) {
    foreach ($languages as $lang) {
        $loc = ($lang === 'en') ? "{$domain}/{$page}.html" : "{$domain}/{$lang}/{$page}.html";
        
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>monthly</changefreq>\n";
        $xml .= "    <priority>0.5</priority>\n";

        foreach ($languages as $altLang) {
            $altLoc = ($altLang === 'en') ? "{$domain}/{$page}.html" : "{$domain}/{$altLang}/{$page}.html";
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
        }
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$domain}/{$page}.html\" />\n";
        $xml .= "  </url>\n";

        $totalUrls++;
    }
}

// 3. User Guide
$xml .= "  <url>\n";
$xml .= "    <loc>{$domain}/how-it-works/</loc>\n";
$xml .= "    <lastmod>{$today}</lastmod>\n";
$xml .= "    <changefreq>monthly</changefreq>\n";
$xml .= "    <priority>0.8</priority>\n";
$xml .= "  </url>\n";
$totalUrls++;

$xml .= '</urlset>' . "\n";

file_put_contents(__DIR__ . '/sitemap.xml', $xml);

echo "SUCCESS: sitemap.xml generated with {$totalUrls} SEO-Safe URLs and full multi-language hreflang alternate links!\n";
