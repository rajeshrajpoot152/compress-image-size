<?php
/**
 * Development router script for PHP built-in server (php -S localhost:8000 router.php)
 * Simulates Apache .htaccess clean URL rewriting.
 */

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$file = __DIR__ . $uri;

// 1. If it's an existing file (CSS, JS, images, contact-handler.php, etc.)
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // Serve directly
}

// 2. If it's a directory with index.html (e.g. /how-it-works/ or /es/)
if (is_dir($file) && file_exists(rtrim($file, '/') . '/index.html')) {
    include rtrim($file, '/') . '/index.html';
    exit;
}

// 3. Clean URLs: check if $file.html exists (e.g. /about-us -> about-us.html)
if (file_exists($file . '.html')) {
    include $file . '.html';
    exit;
}

// 4. Root homepage
if ($uri === '/' && file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
    exit;
}

// 5. 404 fallback
if (file_exists(__DIR__ . '/404.html')) {
    http_response_code(404);
    include __DIR__ . '/404.html';
    exit;
}

return false;
