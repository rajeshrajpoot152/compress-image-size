<?php
/**
 * FIX DUPLICATION SCRIPT
 * 1. Scans all HTML files.
 * 2. If a file is in a language folder (like /es/about-us.html) AND is an info/legal page, it injects <meta name="robots" content="noindex, follow"> to prevent Google from indexing the untranslated English text as duplicate content.
 */

$languages = ['es', 'fr', 'de', 'pt', 'zh', 'ja', 'ar', 'ru', 'it'];
$infoPages = ['about-us.html', 'contact-us.html', 'privacy-policy.html', 'terms-of-service.html', 'privacy.html', 'terms.html'];

$count = 0;

foreach ($languages as $lang) {
    foreach ($infoPages as $page) {
        $filePath = __DIR__ . "/{$lang}/{$page}";
        if (file_exists($filePath)) {
            $content = file_get_contents($filePath);
            
            // If already noindex, skip
            if (strpos($content, 'noindex') !== false) {
                // still check canonical
                $content = preg_replace('/<link rel="canonical" href="[^"]*\/'.preg_quote($lang, '/').'\/('.preg_quote($page, '/').')">/i', '<link rel="canonical" href="https://compressimagesize.com/$1">', $content);
                file_put_contents($filePath, $content);
                continue;
            }

            // Replace "index, follow" with "noindex, follow"
            $content = preg_replace('/<meta name="robots" content="index, follow">/i', '<meta name="robots" content="noindex, follow">', $content);
            
            // Also update the canonical tag to point to the English root version to consolidate equity
            $canonicalRegex = '/<link rel="canonical" href="[^"]*\/'.preg_quote($lang, '/').'\/('.preg_quote($page, '/').')">/i';
            $content = preg_replace($canonicalRegex, '<link rel="canonical" href="https://compressimagesize.com/$1">', $content);

            file_put_contents($filePath, $content);
            $count++;
            echo "Fixed SEO duplication in: {$lang}/{$page}\n";
        }
    }
}

echo "Total pages fixed with NOINDEX & Cross-Language Canonical: {$count}\n";
