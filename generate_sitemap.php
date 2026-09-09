<?php
/**
 * Master XML Sitemap Generator for CompressImageSize
 * Generates an indexable Google XML sitemap with all 400+ programmatic and legal pages,
 * complete with xhtml:link hreflang alternates across 10 global languages.
 */

$allKeywords = require __DIR__ . '/data/keywords.php';
$languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
$domain = 'https://compressimagesize.com';

$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
$xml .= '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

$today = date('Y-m-d');
$totalUrls = 0;

// 1. Programmatic Keywords URLs
foreach ($allKeywords as $slug => $kwData) {
    $priority = ($slug === 'compress-image-size') ? '1.0' : (($kwData['category'] === 'size') ? '0.9' : '0.8');
    $changefreq = ($slug === 'compress-image-size') ? 'daily' : 'weekly';

    foreach ($languages as $lang) {
        $loc = ($lang === 'en') ? "{$domain}/{$slug}.html" : "{$domain}/{$lang}/{$slug}.html";
        
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$loc}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>{$changefreq}</changefreq>\n";
        $xml .= "    <priority>{$priority}</priority>\n";

        // Multi-language hreflang alternates
        foreach ($languages as $altLang) {
            $altLoc = ($altLang === 'en') ? "{$domain}/{$slug}.html" : "{$domain}/{$altLang}/{$slug}.html";
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$altLang}\" href=\"{$altLoc}\" />\n";
        }
        $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$domain}/{$slug}.html\" />\n";
        $xml .= "  </url>\n";
        
        $totalUrls++;
    }
}

// 2. Legal & Mandatory Pages (Privacy Policy, Terms of Service)
$legalPages = ['privacy-policy', 'terms-of-service'];
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

$xml .= '</urlset>' . "\n";

file_put_contents(__DIR__ . '/sitemap.xml', $xml);

echo "SUCCESS: sitemap.xml generated with {$totalUrls} URLs and full multi-language hreflang alternate links!\n";
