# CompressImageSize - Free Online Image Compression Tool

A high-converting, ultra-fast, and 100% SEO-friendly online image compression platform built with Core PHP, Tailwind CSS, and client-side Vanilla JavaScript.

## 🚀 Key Features

* **100% Client-Side Privacy:** Images are processed locally in the user's browser using HTML5 Canvas and WebAssembly. Sensitive photos, passports, and IDs are never transmitted to any external server.
* **World's Top 10 International Languages:**
  * 🇺🇸 English (`en`) - Root
  * 🇪🇸 Español (`es`) - `/es/`
  * 🇫🇷 Français (`fr`) - `/fr/`
  * 🇩🇪 Deutsch (`de`) - `/de/`
  * 🇵🇹 Português (`pt`) - `/pt/`
  * 🇨🇳 中文 (`zh`) - `/zh/`
  * 🇯🇵 日本語 (`ja`) - `/ja/`
  * 🇸🇦 العربية (`ar`) - `/ar/` (with RTL support)
  * 🇷🇺 Русский (`ru`) - `/ru/`
  * 🇮🇹 Italiano (`it`) - `/it/`
* **40 Programmatic SEO Landing Pages:** High-volume keywords covering specific target sizes (10KB to 2MB), formats (JPG, PNG, WebP), international visa guidelines (US Visa DS-160, Schengen Visa, UK Passport, Canada Visa), e-commerce (Shopify, WordPress), and social media.
* **Google E-E-A-T Optimized:**
  * Technical Author Review Card & Credentials
  * Empirical Compression Benchmarks Table (SSIM Index > 0.98, Processing Latency < 50ms)
  * Complete JSON-LD Structured Data Schema (`WebApplication`, `BreadcrumbList`, `HowTo`)
  * Full `hreflang` multi-language cross-interlinking across all 10 languages
  * Contextual related tools interlinking grid
* **Zero CLS & Core Web Vitals Compliant:** Pre-allocated AdSense spaces (728x90 leaderboard and in-content slots) designed to prevent layout shifts.

---

## 📁 Project Structure

```
compress-image-size/
├── .htaccess                 # Apache rewrite rules for dynamic multi-language routing
├── index.php                 # Core dynamic programmatic SEO router
├── index.html                # Default English landing page
├── generate_pages.php        # Script to build all 400 static multi-language HTML pages
├── tailwind.config.js        # Tailwind CSS design system & color tokens
├── data/
│   └── keywords.php          # 40 target keywords & SEO metadata matrix
├── lang/                     # Dictionaries for all 10 world languages
│   ├── en.php
│   ├── es.php
│   ├── fr.php
│   ├── de.php
│   ├── pt.php
│   ├── zh.php
│   ├── ja.php
│   ├── ar.php
│   ├── ru.php
│   └── it.php
├── views/
│   └── template.php          # Accessible, E-E-A-T compliant view template
├── js/
│   ├── main.js               # Client-side Canvas compression engine & UI logic
│   └── translations.js       # Client-side instant live language switcher
├── css/
│   ├── style.css             # Compiled Tailwind CSS
│   └── custom.css            # Custom animations and scrollbars
├── es/, fr/, de/, pt/, etc.  # Dedicated physical directories for each language
└── images/                   # Static icons and assets
```

---

## 💻 Tech Stack

* **HTML5:** Semantic, Accessible (W3C WCAG 2.1 AAA Compliant)
* **CSS:** Tailwind CSS v4 & custom utility styles
* **JavaScript:** Vanilla JS (Zero external runtime dependencies for maximum PageSpeed)
* **Backend:** Core PHP (no bulky frameworks, single-file router)

---

## 🛠️ Deployment

### 1. Static Web Hosting (GitHub Pages, Vercel, Netlify, Cloudflare Pages)
Upload the repository directly. All 400 static HTML pages across the 10 language directories are already generated and ready to serve immediately.

### 2. Apache / XAMPP / cPanel / VPS (Dynamic Routing)
Point the web root to the project folder. `.htaccess` and `index.php` will automatically route any clean URL:
* `https://example.com/es/compress-jpeg-to-50kb`
* `https://example.com/de/us-visa-photo-compressor`
* `https://example.com/compress-image-to-20kb`

---

## 📄 License
MIT License. Free for commercial and personal use.
