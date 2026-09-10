const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'views', 'template.php');
let content = fs.readFileSync(templatePath, 'utf-8').replace(/\r\n/g, '\n');

// 1. Top Setup & Category Content Matrix
const oldSetup = `$categorySlug = $allKeywords[$currentSlug]['category'] ?? 'general';
$categoryNames = [
    'primary' => 'Image Size Compressor',
    'size'    => 'Size-Specific Reducers',
    'format'  => 'Format Compressors',
    'action'  => 'Broad Image Tools'
];
$categoryName = $categoryNames[$categorySlug] ?? 'Image Tools';

// Anti-Duplicate Category Content Matrix (Programmatic SEO & Helpful Content Protection)
$categoryContentMatrix = [
    'size' => [
        'badge' => 'Government & Exam Portals Compliant',
        'h2' => 'Need an Exact KB Size for Official Forms & Uploads?',
        'intro' => 'Struggling to upload your photo or signature because an official government portal (such as UPSC, SSC, state entrance exams, passport, or visa agencies) strictly rejects files exceeding ' . htmlspecialchars(str_replace(['compress-image-to-', 'resize-image-to-', 'reduce-image-size-in-'], '', $currentSlug)) . '? We\\'ve got you covered. You don\\'t need complicated photo editing software or worry about sharing your confidential ID documents with third-party cloud servers. Our client-side quantization compresses your image down to your exact target size without blurring critical facial features, seals, or signature details.',
        'highlight_title' => 'Why Portals Demand Strict KB Thresholds',
        'highlight_desc' => 'High-traffic application servers process millions of candidate records concurrently. Keeping files strictly under specific KB thresholds prevents database latency while preserving crisp, high-contrast facial recognition and biometric legibility.'
    ],
    'format' => [
        'badge' => 'Core Web Vitals & Alpha Transparency',
        'h2' => 'High-Performance Format Conversion & Bandwidth Optimization',
        'intro' => 'Unoptimized image files are the primary cause of slow Largest Contentful Paint (LCP) and high bounce rates on the web. Whether you need to preserve crisp transparent alpha channels for brand logos or convert heavyweight camera photographs into high-efficiency modern formats, our browser-based engine handles color matrices losslessly directly inside your device RAM.',
        'highlight_title' => 'Pristine Edge Preservation & Zero Banding',
        'highlight_desc' => 'Our perceptual quantization algorithms isolate and discard imperceptible chromatic frequencies while preserving razor-sharp text contrast, gradient smoothness, and transparent background integrity.'
    ],
    'action' => [
        'badge' => 'E-Commerce & High-Speed Publishing',
        'h2' => 'Accelerate Shopify, WordPress & Web Publishing Speeds',
        'intro' => 'Every single second of mobile page loading delay costs modern websites up to 7% in lost conversions and higher bounce rates. Don\\'t upload heavy camera photos straight to your web host. Batch optimize your entire product catalog, blog hero graphics, and portfolio assets in one swift queue and export clean, web-ready files with zero waiting.',
        'highlight_title' => 'Zero-Latency Local Memory Pipeline',
        'highlight_desc' => 'Process 100 to 500+ high-resolution assets simultaneously on your own device. Your files never sit in remote server queues or consume your mobile upload bandwidth.'
    ],
    'primary' => [
        'badge' => 'Universal In-Browser Compression Engine',
        'h2' => '100% In-Browser Privacy with Lossless Perceptual Fidelity',
        'intro' => 'Modern image compression shouldn\\'t require you to upload personal photos, corporate graphics, or sensitive documents to third-party cloud servers. Our platform executes advanced perceptual compression directly within your web browser using HTML5 Canvas and WebAssembly algorithms. Enjoy lightning-fast processing, unlimited daily usage, and complete confidentiality with zero file size restrictions.',
        'highlight_title' => 'Enterprise Security with Zero Data Footprint',
        'highlight_desc' => 'Your images are decoded, processed, and encoded entirely within your local machine\\'s volatile RAM. The moment you close the tab, all image buffers are immediately wiped from memory.'
    ]
];
$catContent = $categoryContentMatrix[$categorySlug] ?? $categoryContentMatrix['primary'];`;

const newSetup = `$categorySlug = $allKeywords[$currentSlug]['category'] ?? 'primary';
$categoryNames = [
    'primary' => $t['cat_matrix']['primary']['badge'] ?? 'Image Size Compressor',
    'size'    => $t['cat_matrix']['size']['badge'] ?? 'Size-Specific Reducers',
    'format'  => $t['cat_matrix']['format']['badge'] ?? 'Format Compressors',
    'action'  => $t['cat_matrix']['action']['badge'] ?? 'Broad Image Tools'
];
$categoryName = $kwData['category_name'] ?? ($categoryNames[$categorySlug] ?? 'Image Tools');

// Localized Category Content Matrix
$catContent = $t['cat_matrix'][$categorySlug] ?? ($t['cat_matrix']['primary'] ?? [
    'badge' => 'Universal In-Browser Compression Engine',
    'h2' => '100% In-Browser Privacy with Lossless Perceptual Fidelity',
    'intro' => 'Files processed locally in browser RAM.',
    'highlight_title' => 'Privacy by Design',
    'highlight_desc' => 'Your files never touch external servers.'
]);`;

if (content.includes(oldSetup)) {
  content = content.replace(oldSetup, newSetup);
  console.log('Replaced category content setup');
} else {
  console.warn('Could not find oldSetup');
}

// 2. Header Navigation
const oldNav = `<nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="#uploader" class="hover:text-primary-600 transition-colors">Tools</a>
          <a href="#how-to" class="hover:text-primary-600 transition-colors">How It Works</a>
          <a href="#eeat-authority" class="hover:text-primary-600 transition-colors">Quality & Security</a>
          <a href="#features" class="hover:text-primary-600 transition-colors">Features</a>
          <a href="#faq" class="hover:text-primary-600 transition-colors">FAQ</a>
        </nav>`;

const newNav = `<nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="#uploader" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t['nav_tools'] ?? 'Tools') ?></a>
          <a href="#how-to" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t['nav_how'] ?? 'How It Works') ?></a>
          <a href="#eeat-authority" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t['nav_quality'] ?? 'Quality & Security') ?></a>
          <a href="#features" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t['nav_features'] ?? 'Features') ?></a>
          <a href="#faq" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t['nav_faq'] ?? 'FAQ') ?></a>
        </nav>`;

content = content.replace(oldNav, newNav);

// 3. Language Switcher Menu & Mobile Drawer
const oldLangMenu = `<div id="langMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-surface-border py-2 z-50">
              <div class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">Global Top 10 Languages</div>
              <?php foreach ($globalLanguages as $code => $info): 
                $linkToLang = getRelativeLangLink($code, $currentSlug, $currentLang);
              ?>
                <a href="<?= $linkToLang ?>" class="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-dark-slate hover:bg-primary-50 hover:text-primary-600 transition-colors <?= $currentLang === $code ? 'font-bold bg-primary-50 text-primary-600' : '' ?>">
                  <span class="flex items-center gap-2.5">
                    <?= getFlagSvg($code) ?>
                    <span><?= $info['name'] ?></span>
                  </span>
                  <span class="text-[10px] uppercase font-mono text-slate-400"><?= $code ?></span>
                </a>
              <?php endforeach; ?>
            </div>`;

const newLangMenu = `<div id="langMenu" class="hidden absolute ltr:right-0 rtl:left-0 mt-2 w-56 bg-white rounded-xl shadow-card border border-surface-border py-2 z-50 max-h-[80vh] overflow-y-auto">
              <div class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100"><?= htmlspecialchars($t['lang_menu_header'] ?? 'Global Top 10 Languages') ?></div>
              <?php foreach ($globalLanguages as $code => $info): 
                $linkToLang = getRelativeLangLink($code, $currentSlug, $currentLang);
              ?>
                <a href="<?= $linkToLang ?>" data-lang="<?= $code ?>" class="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-dark-slate hover:bg-primary-50 hover:text-primary-600 transition-colors <?= $currentLang === $code ? 'font-bold bg-primary-50 text-primary-600' : '' ?>">
                  <span class="flex items-center gap-2.5">
                    <?= getFlagSvg($code) ?>
                    <span><?= $info['name'] ?></span>
                  </span>
                  <span class="text-[10px] uppercase font-mono text-slate-400"><?= $code ?></span>
                </a>
              <?php endforeach; ?>
            </div>`;

content = content.replace(oldLangMenu, newLangMenu);

const oldDrawer = `<div id="mobileDrawer" class="hidden md:hidden border-t border-surface-border bg-white px-2 pt-3 pb-5 space-y-2">
        <a href="#uploader" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Tools</a>
        <a href="#how-to" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">How It Works</a>
        <a href="#eeat-authority" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Quality & Standards</a>
        <a href="#features" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">Features</a>
        <a href="#faq" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">FAQ</a>
      </div>`;

const newDrawer = `<div id="mobileDrawer" class="hidden md:hidden border-t border-surface-border bg-white px-3 pt-3 pb-5 space-y-2">
        <a href="#uploader" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600"><?= htmlspecialchars($t['nav_tools'] ?? 'Tools') ?></a>
        <a href="#how-to" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600"><?= htmlspecialchars($t['nav_how'] ?? 'How It Works') ?></a>
        <a href="#eeat-authority" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600"><?= htmlspecialchars($t['nav_quality'] ?? 'Quality & Security') ?></a>
        <a href="#features" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600"><?= htmlspecialchars($t['nav_features'] ?? 'Features') ?></a>
        <a href="#faq" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600"><?= htmlspecialchars($t['nav_faq'] ?? 'FAQ') ?></a>

        <!-- Mobile Language Switcher Grid -->
        <div class="pt-3 border-t border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2"><?= htmlspecialchars($t['lang_menu_header'] ?? 'Global Top 10 Languages') ?></div>
          <div class="grid grid-cols-2 gap-1.5">
            <?php foreach ($globalLanguages as $code => $info): 
              $linkToLang = getRelativeLangLink($code, $currentSlug, $currentLang);
            ?>
              <a href="<?= $linkToLang ?>" data-lang="<?= $code ?>" class="flex items-center gap-2 p-1.5 rounded-lg text-xs <?= $currentLang === $code ? 'bg-primary-50 text-primary-700 font-bold border border-primary-200' : 'text-slate-600 hover:bg-slate-50' ?>">
                <?= getFlagSvg($code) ?>
                <span class="truncate"><?= $info['name'] ?></span>
              </a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>`;

content = content.replace(oldDrawer, newDrawer);

// 4. Breadcrumb Home & Trust Pill
content = content.replace(
  '<a href="index.html" class="text-white/80 hover:text-white transition-colors">Home</a>',
  '<a href="index.html" class="text-white/80 hover:text-white transition-colors"><?= htmlspecialchars($t[\'breadcrumb_home\'] ?? \'Home\') ?></a>'
);

content = content.replace(
  '<span>Client-Side Quantization • Zero Server Storage</span>',
  '<span><?= htmlspecialchars($t[\'hero_pill\'] ?? \'Client-Side Quantization • Zero Server Storage\') ?></span>'
);

// 5. Dropzone Button & Hints
content = content.replace(
  '<span class="sm:hidden">Tap to Select Photos</span>',
  '<span class="sm:hidden"><?= htmlspecialchars($t[\'tap_to_select\'] ?? \'Tap to Select Photos\') ?></span>'
);

content = content.replace(
  '<span class="font-semibold text-slate-600">Supports 1 to 500+ Images</span>',
  '<span class="font-semibold text-slate-600"><?= htmlspecialchars($t[\'hint_batch\'] ?? \'Supports 1 to 500+ Images\') ?></span>'
);

content = content.replace(
  '<span>No file size limits</span>',
  '<span><?= htmlspecialchars($t[\'hint_no_limits\'] ?? \'No file size limits\') ?></span>'
);

content = content.replace(
  '<span>JPG, PNG, WebP, GIF, AVIF</span>',
  '<span><?= htmlspecialchars($t[\'hint_formats\'] ?? \'JPG, PNG, WebP, GIF, AVIF\') ?></span>'
);

content = content.replace(
  '100% In-Browser Privacy\n              </span>',
  '<?= htmlspecialchars($t[\'hint_privacy\'] ?? \'100% In-Browser Privacy\') ?>\n              </span>'
);

content = content.replace(
  '<span>Privacy First: Automatically removes hidden GPS &amp; Camera metadata</span>',
  '<span><?= htmlspecialchars($t[\'hint_exif\'] ?? \'Privacy First: Automatically removes hidden GPS & Camera metadata\') ?></span>'
);

// 6. Progress bar & Batch Stats
content = content.replace(
  '<span id="progressStatusText" class="text-xs sm:text-sm font-bold text-dark-slate">Compressing images in browser RAM...</span>',
  '<span id="progressStatusText" class="text-xs sm:text-sm font-bold text-dark-slate"><?= htmlspecialchars($t[\'progress_optimizing\'] ?? \'Compressing images in browser RAM...\') ?></span>'
);

content = content.replace(
  'High Fidelity Preserved\n                </span>',
  '<?= htmlspecialchars($t[\'progress_fidelity\'] ?? \'High Fidelity Preserved\') ?>\n                </span>'
);

content = content.replace(
  '<span>Our engine just saved you</span>',
  '<span><?= htmlspecialchars($t[\'saved_you\'] ?? \'Our engine just saved you\') ?></span>'
);

content = content.replace(
  '<span id="statTotalCount">0</span> images optimized</span>',
  '<span id="statTotalCount">0</span> <?= htmlspecialchars($t[\'images_optimized\'] ?? \'images optimized\') ?></span>'
);

content = content.replace(
  '<span>Total: <span id="statNewSize"',
  '<span><?= htmlspecialchars($t[\'total_label\'] ?? \'Total:\') ?> <span id="statNewSize"'
);

content = content.replace(
  '<span id="queueCount" class="text-xs text-slate-400 font-semibold">0 images queued</span>',
  '<span id="queueCount" class="text-xs text-slate-400 font-semibold">0 <?= htmlspecialchars($t[\'queued_label\'] ?? \'images queued\') ?></span>'
);

content = content.replace(
  '<span id="downloadZipBtnText">Download all images</span>',
  '<span id="downloadZipBtnText"><?= htmlspecialchars($t[\'download_all_zip\'] ?? \'Download all images\') ?></span>'
);

content = content.replace(
  'Processed Images (<span id="resultsCount">0</span>)',
  '<?= htmlspecialchars($t[\'processed_images\'] ?? \'Processed Images\') ?> (<span id="resultsCount">0</span>)'
);

content = content.replace(
  '<span>Download all images</span>\n              </button>',
  '<span><?= htmlspecialchars($t[\'download_all_zip\'] ?? \'Download all images\') ?></span>\n              </button>'
);

// 7. Settings Panel & Format Cards
content = content.replace(
  '<span>In-Browser Engine</span>',
  '<span><?= htmlspecialchars($t[\'engine_in_browser\'] ?? \'In-Browser Engine\') ?></span>'
);

content = content.replace(
  '<span class="text-[11px] text-slate-400">Balance file size vs clarity</span>',
  '<span class="text-[11px] text-slate-400"><?= htmlspecialchars($t[\'balance_hint\'] ?? \'Balance file size vs clarity\') ?></span>'
);

content = content.replace(
  '<div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Quick Presets:</div>',
  '<div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5"><?= htmlspecialchars($t[\'preset_label\'] ?? \'Quick Presets:\') ?></div>'
);

content = content.replace(
  'Max Save</span>',
  '<?= htmlspecialchars($t[\'preset_max_save\'] ?? \'Max Save\') ?></span>'
);

content = content.replace(
  'Balanced</span>',
  '<?= htmlspecialchars($t[\'preset_balanced\'] ?? \'Balanced\') ?></span>'
);

content = content.replace(
  'Default</span>',
  '<?= htmlspecialchars($t[\'preset_default\'] ?? \'Default\') ?></span>'
);

content = content.replace(
  'High Quality</span>',
  '<?= htmlspecialchars($t[\'preset_high_quality\'] ?? \'High Quality\') ?></span>'
);

content = content.replace(
  'Lossless</span>\n                    </button>',
  '<?= htmlspecialchars($t[\'preset_lossless\'] ?? \'Lossless\') ?></span>\n                    </button>'
);

content = content.replace(
  '<span class="text-[11px] text-slate-400">Convert image type</span>',
  '<span class="text-[11px] text-slate-400"><?= htmlspecialchars($t[\'convert_type\'] ?? \'Convert image type\') ?></span>'
);

content = content.replace(
  '<span class="text-[10px] font-bold text-action-700 bg-action-50 border border-action-200 px-2 py-0.5 rounded-md uppercase">One-Click Convert</span>',
  '<span class="text-[10px] font-bold text-action-700 bg-action-50 border border-action-200 px-2 py-0.5 rounded-md uppercase"><?= htmlspecialchars($t[\'convert_badge\'] ?? \'One-Click Convert\') ?></span>'
);

// Format Card: Original
const oldOrigCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight">Original</span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">Auto</span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight">Same as uploaded</div>`;

const newOrigCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight"><?= htmlspecialchars($t['fmt_original'] ?? 'Original') ?></span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600"><?= htmlspecialchars($t['fmt_auto'] ?? 'Auto') ?></span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight"><?= htmlspecialchars($t['fmt_orig_desc'] ?? 'Same as uploaded') ?></div>`;

content = content.replace(oldOrigCard, newOrigCard);

// Format Card: JPG
const oldJpgCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight">JPG / JPEG</span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-primary-100 text-primary-700">Photos</span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight">Best for scenery &amp; photos</div>`;

const newJpgCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight"><?= htmlspecialchars($t['fmt_jpg'] ?? 'JPG / JPEG') ?></span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-primary-100 text-primary-700"><?= htmlspecialchars($t['fmt_photos'] ?? 'Photos') ?></span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight"><?= htmlspecialchars($t['fmt_jpg_desc'] ?? 'Best for scenery & photos') ?></div>`;

content = content.replace(oldJpgCard, newJpgCard);

// Format Card: WebP
const oldWebpCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight">WebP</span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-action-100 text-action-700 font-semibold">&minus;40% Size</span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight">Ultra fast web loading</div>`;

const newWebpCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight"><?= htmlspecialchars($t['fmt_webp'] ?? 'WebP') ?></span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-action-100 text-action-700 font-semibold"><?= htmlspecialchars($t['fmt_savings'] ?? '-40% Size') ?></span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight"><?= htmlspecialchars($t['fmt_webp_desc'] ?? 'Ultra fast web loading') ?></div>`;

content = content.replace(oldWebpCard, newWebpCard);

// Format Card: PNG
const oldPngCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight">PNG</span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">Transparent</span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight">Crisp logos &amp; graphics</div>`;

const newPngCard = `<span class="text-xs font-extrabold uppercase font-mono tracking-tight"><?= htmlspecialchars($t['fmt_png'] ?? 'PNG') ?></span>
                        <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800"><?= htmlspecialchars($t['fmt_transparent'] ?? 'Transparent') ?></span>
                      </div>
                      <div class="text-[11px] text-slate-500 leading-tight"><?= htmlspecialchars($t['fmt_png_desc'] ?? 'Crisp logos & graphics') ?></div>`;

content = content.replace(oldPngCard, newPngCard);

// 8. Micro-Tools Section
content = content.replace(
  '<h2 class="text-xl sm:text-2xl font-black text-dark-slate">Explore More Free Tools</h2>',
  '<h2 class="text-xl sm:text-2xl font-black text-dark-slate"><?= htmlspecialchars($t[\'explore_title\'] ?? \'Explore More Free Tools\') ?></h2>'
);

content = content.replace(
  '<p class="text-xs sm:text-sm text-dark-body">Essential client-side image manipulation and privacy utilities.</p>',
  '<p class="text-xs sm:text-sm text-dark-body"><?= htmlspecialchars($t[\'explore_sub\'] ?? \'Essential client-side image manipulation and privacy utilities.\') ?></p>'
);

content = content.replace(
  '<h3 class="font-extrabold text-dark-slate text-base mb-1">Resizing & Cropping</h3>',
  '<h3 class="font-extrabold text-dark-slate text-base mb-1"><?= htmlspecialchars($t[\'explore_c1_title\'] ?? \'Resizing & Cropping\') ?></h3>'
);

content = content.replace(
  '<p class="text-xs text-dark-body mb-4 leading-relaxed">Exact pixel dimensions modification and smart aspect ratio cropping.</p>',
  '<p class="text-xs text-dark-body mb-4 leading-relaxed"><?= htmlspecialchars($t[\'explore_c1_desc\'] ?? \'Exact pixel dimensions modification and smart aspect ratio cropping.\') ?></p>'
);

content = content.replace(
  '<span>• Image Resizer (Custom Pixels)</span><span class="text-slate-400 text-[10px]">Free &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c1_tool1\'] ?? \'• Image Resizer (Custom Pixels)\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_free_tool\'] ?? \'Free →\') ?></span>'
);

content = content.replace(
  '<span>• Smart Image Cropper</span><span class="text-slate-400 text-[10px]">Free &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c1_tool2\'] ?? \'• Smart Image Cropper\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_free_tool\'] ?? \'Free →\') ?></span>'
);

content = content.replace(
  '<h3 class="font-extrabold text-dark-slate text-base mb-1">Format Converters</h3>',
  '<h3 class="font-extrabold text-dark-slate text-base mb-1"><?= htmlspecialchars($t[\'explore_c2_title\'] ?? \'Format Converters\') ?></h3>'
);

content = content.replace(
  '<p class="text-xs text-dark-body mb-4 leading-relaxed">High-demand converters for next-gen web standard performance.</p>',
  '<p class="text-xs text-dark-body mb-4 leading-relaxed"><?= htmlspecialchars($t[\'explore_c2_desc\'] ?? \'High-demand converters for next-gen web standard performance.\') ?></p>'
);

content = content.replace(
  '<span>• HEIC to JPG Converter</span><span class="text-slate-400 text-[10px]">Popular &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c2_tool1\'] ?? \'• HEIC to JPG Converter\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_popular\'] ?? \'Popular →\') ?></span>'
);

content = content.replace(
  '<span>• WebP to PNG Converter</span><span class="text-slate-400 text-[10px]">Fast &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c2_tool2\'] ?? \'• WebP to PNG Converter\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_fast\'] ?? \'Fast →\') ?></span>'
);

content = content.replace(
  '<span>• Image to PDF Maker</span><span class="text-slate-400 text-[10px]">Free &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c2_tool3\'] ?? \'• Image to PDF Maker\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_free_tool\'] ?? \'Free →\') ?></span>'
);

content = content.replace(
  '<h3 class="font-extrabold text-dark-slate text-base mb-1">Privacy & Editing</h3>',
  '<h3 class="font-extrabold text-dark-slate text-base mb-1"><?= htmlspecialchars($t[\'explore_c3_title\'] ?? \'Privacy & Editing\') ?></h3>'
);

content = content.replace(
  '<p class="text-xs text-dark-body mb-4 leading-relaxed">Protect your metadata and sanitize sensitive photos safely.</p>',
  '<p class="text-xs text-dark-body mb-4 leading-relaxed"><?= htmlspecialchars($t[\'explore_c3_desc\'] ?? \'Protect your metadata and sanitize sensitive photos safely.\') ?></p>'
);

content = content.replace(
  '<span>• EXIF Data & GPS Remover</span><span class="text-slate-400 text-[10px]">Secure &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c3_tool1\'] ?? \'• EXIF Data & GPS Remover\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_secure\'] ?? \'Secure →\') ?></span>'
);

content = content.replace(
  '<span>• Instant Watermark Adder</span><span class="text-slate-400 text-[10px]">New &rarr;</span>',
  '<span><?= htmlspecialchars($t[\'explore_c3_tool2\'] ?? \'• Instant Watermark Adder\') ?></span><span class="text-slate-400 text-[10px]"><?= htmlspecialchars($t[\'badge_new\'] ?? \'New →\') ?></span>'
);

// 9. Reviewer & Benchmarks Table
content = content.replace(
  '<span class="font-bold text-dark-slate text-base">Reviewed by Alex Rivera</span>',
  '<span class="font-bold text-dark-slate text-base"><?= htmlspecialchars($t[\'reviewed_by\'] ?? \'Reviewed by Alex Rivera\') ?></span>'
);

content = content.replace(
  '<span class="px-2 py-0.5 text-[11px] font-bold bg-primary-100 text-primary-700 rounded-full">Lead Performance Architect</span>',
  '<span class="px-2 py-0.5 text-[11px] font-bold bg-primary-100 text-primary-700 rounded-full"><?= htmlspecialchars($t[\'reviewer_role\'] ?? \'Lead Performance Architect\') ?></span>'
);

content = content.replace(
  'Fact-Checked\n              </span>',
  '<?= htmlspecialchars($t[\'fact_checked\'] ?? \'Fact-Checked\') ?>\n              </span>'
);

const oldBio = `<p class="text-xs text-dark-body leading-relaxed">
              Former CDN Image Pipeline Specialist. Our client-side compression methodology has been empirically verified across 120,000+ files to guarantee zero data leakage (ISO 27001 compliant) and retain a Structural Similarity Index (SSIM) above 0.98.
            </p>`;

const newBio = `<p class="text-xs text-dark-body leading-relaxed">
              <?= htmlspecialchars($t['reviewer_bio'] ?? 'Former CDN Image Pipeline Specialist. Our client-side compression methodology has been empirically verified across 120,000+ files to guarantee zero data leakage (ISO 27001 compliant) and retain a Structural Similarity Index (SSIM) above 0.98.') ?>
            </p>`;

content = content.replace(oldBio, newBio);

content = content.replace(
  '<span>Updated: <?= date(\'F Y\') ?></span>',
  '<span><?= htmlspecialchars($t[\'updated_label\'] ?? \'Updated:\') ?> <?= date(\'F Y\') ?></span>'
);

content = content.replace(
  '<span>W3C WCAG 2.1 AAA Compliant</span>',
  '<span><?= htmlspecialchars($t[\'wcag_compliant\'] ?? \'W3C WCAG 2.1 AAA Compliant\') ?></span>'
);

content = content.replace(
  '<span>100% Client-Side WebAssembly / Canvas</span>',
  '<span><?= htmlspecialchars($t[\'client_side_tag\'] ?? \'100% Client-Side WebAssembly / Canvas\') ?></span>'
);

content = content.replace(
  '<h3 class="text-lg font-bold text-dark-slate mb-3">Empirical Compression Benchmarks & Performance Metrics</h3>',
  '<h3 class="text-lg font-bold text-dark-slate mb-3"><?= htmlspecialchars($t[\'benchmarks_title\'] ?? \'Empirical Compression Benchmarks & Performance Metrics\') ?></h3>'
);

content = content.replace('<th class="p-3">Source Format</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_source\'] ?? \'Source Format\') ?></th>');
content = content.replace('<th class="p-3">Target Size</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_target\'] ?? \'Target Size\') ?></th>');
content = content.replace('<th class="p-3">Avg Reduction</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_reduction\'] ?? \'Avg Reduction\') ?></th>');
content = content.replace('<th class="p-3">SSIM Fidelity</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_fidelity\'] ?? \'SSIM Fidelity\') ?></th>');
content = content.replace('<th class="p-3">Processing Latency</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_latency\'] ?? \'Processing Latency\') ?></th>');
content = content.replace('<th class="p-3">Security Protocol</th>', '<th class="p-3"><?= htmlspecialchars($t[\'th_security\'] ?? \'Security Protocol\') ?></th>');

content = content.replace('0.984 (Imperceptible)', '0.984 <?= htmlspecialchars($t[\'val_imperceptible\'] ?? \'(Imperceptible)\') ?>');
content = content.replace('0.996 (Crystal Clear)', '0.996 <?= htmlspecialchars($t[\'val_crystal_clear\'] ?? \'(Crystal Clear)\') ?>');
content = content.replace('0.981 (High Dynamic)', '0.981 <?= htmlspecialchars($t[\'val_high_dynamic\'] ?? \'(High Dynamic)\') ?>');

content = content.replace(/Client Memory Only<\/td>/g, '<?= htmlspecialchars($t[\'val_client_mem\'] ?? \'Client Memory Only\') ?></td>');

// 10. Related Tools Heading & Localized Links
content = content.replace(
  'Related High-Volume Compression Tools\n        </h3>',
  '<?= htmlspecialchars($t[\'related_tools_title\'] ?? \'Related High-Volume Compression Tools\') ?>\n        </h3>'
);

const oldSibLoop = `          foreach ($siblings as $sibSlug):
            $sibData = $allKeywords[$sibSlug];
            $linkPath = "{$sibSlug}.html";
          ?>
            <a href="<?= $linkPath ?>" class="p-3 rounded-xl bg-white border border-surface-border hover:border-primary-500 hover:shadow-soft transition-all text-xs font-semibold text-dark-slate flex items-center justify-between group">
              <span class="truncate"><?= htmlspecialchars($sibData['h1']) ?></span>
              <span class="text-primary-600 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>
          <?php endforeach; ?>`;

const newSibLoop = `          foreach ($siblings as $sibSlug):
            $sibData = $allKeywords[$sibSlug];
            $locSib = function_exists('getLocalizedKeywordData') ? getLocalizedKeywordData($sibSlug, $currentLang, $sibData) : $sibData;
            $linkPath = "{$sibSlug}.html";
          ?>
            <a href="<?= $linkPath ?>" class="p-3 rounded-xl bg-white border border-surface-border hover:border-primary-500 hover:shadow-soft transition-all text-xs font-semibold text-dark-slate flex items-center justify-between group">
              <span class="truncate"><?= htmlspecialchars($locSib['h1']) ?></span>
              <span class="text-primary-600 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>
          <?php endforeach; ?>`;

content = content.replace(oldSibLoop, newSibLoop);

// 11. Footer Categories & Legal Links
const oldCatLoop = `        <?php
        $categories = [
          'Size Reducers' => array_filter($allKeywords, fn($k) => $k['category'] === 'size'),
          'Format Specific' => array_filter($allKeywords, fn($k) => $k['category'] === 'format'),
          'Action & Broad Tools' => array_filter($allKeywords, fn($k) => in_array($k['category'], ['action', 'primary'])),
        ];
        foreach ($categories as $catTitle => $items):
        ?>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-dark-slate mb-3"><?= $catTitle ?></h4>
            <ul class="space-y-1.5 text-xs">
              <?php foreach (array_slice($items, 0, 10) as $keySlug => $k): 
                $link = "{$keySlug}.html";
              ?>
                <li>
                  <a href="<?= $link ?>" class="hover:text-primary-600 transition-colors <?= $currentSlug === $keySlug ? 'text-primary-600 font-bold' : 'text-slate-600' ?>">
                    <?= htmlspecialchars($k['h1']) ?>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endforeach; ?>`;

const newCatLoop = `        <?php
        $categories = [
          ($t['cat_size'] ?? 'Size Reducers') => array_filter($allKeywords, fn($k) => $k['category'] === 'size'),
          ($t['cat_format'] ?? 'Format Specific') => array_filter($allKeywords, fn($k) => $k['category'] === 'format'),
          ($t['cat_action'] ?? 'Action & Broad Tools') => array_filter($allKeywords, fn($k) => in_array($k['category'], ['action', 'primary'])),
        ];
        foreach ($categories as $catTitle => $items):
        ?>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-dark-slate mb-3"><?= $catTitle ?></h4>
            <ul class="space-y-1.5 text-xs">
              <?php foreach (array_slice($items, 0, 10) as $keySlug => $k): 
                $locK = function_exists('getLocalizedKeywordData') ? getLocalizedKeywordData($keySlug, $currentLang, $k) : $k;
                $link = "{$keySlug}.html";
              ?>
                <li>
                  <a href="<?= $link ?>" class="hover:text-primary-600 transition-colors <?= $currentSlug === $keySlug ? 'text-primary-600 font-bold' : 'text-slate-600' ?>">
                    <?= htmlspecialchars($locK['h1']) ?>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endforeach; ?>`;

content = content.replace(oldCatLoop, newCatLoop);

content = content.replace(
  '<span class="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Available Worldwide in Top 10 International Languages:</span>',
  '<span class="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3"><?= htmlspecialchars($t[\'footer_available_langs\'] ?? \'Available Worldwide in Top 10 International Languages:\') ?></span>'
);

content = content.replace(
  '<span>Verified Privacy & Security Standard</span>',
  '<span><?= htmlspecialchars($t[\'footer_verified_privacy\'] ?? \'Verified Privacy & Security Standard\') ?></span>'
);

content = content.replace(
  '<a href="privacy-policy.html" class="hover:text-primary-600 transition-colors">Privacy Policy</a>',
  '<a href="privacy-policy.html" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t[\'footer_privacy_policy\'] ?? \'Privacy Policy\') ?></a>'
);

content = content.replace(
  '<a href="terms-of-service.html" class="hover:text-primary-600 transition-colors">Terms of Service</a>',
  '<a href="terms-of-service.html" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t[\'footer_terms\'] ?? \'Terms of Service\') ?></a>'
);

content = content.replace(
  '<a href="#eeat-authority" class="hover:text-primary-600 transition-colors">Editorial & Quality Policy</a>',
  '<a href="#eeat-authority" class="hover:text-primary-600 transition-colors"><?= htmlspecialchars($t[\'footer_editorial\'] ?? \'Editorial & Quality Policy\') ?></a>'
);

// 12. Visual Comparison Modal
content = content.replace(
  '<h3 id="compareModalTitle" class="text-sm sm:text-base font-extrabold text-dark-slate tracking-tight">Visual Quality Comparison</h3>',
  '<h3 id="compareModalTitle" class="text-sm sm:text-base font-extrabold text-dark-slate tracking-tight"><?= htmlspecialchars($t[\'modal_title\'] ?? \'Visual Quality Comparison\') ?></h3>'
);

content = content.replace(
  '<span>SSIM &gt; 0.99 (Lossless Clarity)</span>',
  '<span><?= htmlspecialchars($t[\'modal_ssim\'] ?? \'SSIM > 0.99 (Lossless Clarity)\') ?></span>'
);

content = content.replace(
  '<span>Side-by-Side</span>',
  '<span><?= htmlspecialchars($t[\'modal_side\'] ?? \'Side-by-Side\') ?></span>'
);

content = content.replace(
  '<span>Split Slider</span>',
  '<span><?= htmlspecialchars($t[\'modal_slider\'] ?? \'Split Slider\') ?></span>'
);

content = content.replace(
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider">Original:</span>',
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider"><?= htmlspecialchars($t[\'modal_orig_label\'] ?? \'Original:\') ?></span>'
);

content = content.replace(
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider">Optimized:</span>',
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider"><?= htmlspecialchars($t[\'modal_opt_label\'] ?? \'Optimized:\') ?></span>'
);

content = content.replace(
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider">Savings:</span>',
  '<span class="text-slate-400 uppercase text-[10px] font-bold tracking-wider"><?= htmlspecialchars($t[\'modal_savings_label\'] ?? \'Savings:\') ?></span>'
);

content = content.replace(
  '<span>Before (Original)</span>',
  '<span><?= htmlspecialchars($t[\'modal_before\'] ?? \'Before (Original)\') ?></span>'
);

content = content.replace(
  '<span>After (Optimized)</span>',
  '<span><?= htmlspecialchars($t[\'modal_after\'] ?? \'After (Optimized)\') ?></span>'
);

content = content.replace(
  'Drag slider or use arrow keys to inspect micro-textures',
  '<?= htmlspecialchars($t[\'modal_drag_hint\'] ?? \'Drag slider or use arrow keys to inspect micro-textures\') ?>'
);

content = content.replace(
  '<span class="font-mono text-[11px] text-primary-600 font-bold hidden sm:inline">Left: Original | Right: Optimized</span>',
  '<span class="font-mono text-[11px] text-primary-600 font-bold hidden sm:inline"><?= htmlspecialchars($t[\'modal_slider_legend\'] ?? \'Left: Original | Right: Optimized\') ?></span>'
);

content = content.replace(
  '◀ Original\n              </div>',
  '<?= htmlspecialchars($t[\'modal_tag_orig\'] ?? \'◀ Original\') ?>\n              </div>'
);

content = content.replace(
  'Optimized ▶\n                </div>',
  '<?= htmlspecialchars($t[\'modal_tag_opt\'] ?? \'Optimized ▶\') ?>\n                </div>'
);

content = content.replace(
  '<span>Zero blur or banding. Edges, skin tones & text stay 100% sharp.</span>',
  '<span><?= htmlspecialchars($t[\'modal_guarantee\'] ?? \'Zero blur or banding. Edges, skin tones & text stay 100% sharp.\') ?></span>'
);

content = content.replace(
  'Close Preview\n          </button>',
  '<?= htmlspecialchars($t[\'modal_close\'] ?? \'Close Preview\') ?>\n          </button>'
);

content = content.replace(
  '<span>Download Optimized Image</span>',
  '<span><?= htmlspecialchars($t[\'modal_download\'] ?? \'Download Optimized Image\') ?></span>'
);

fs.writeFileSync(templatePath, content, 'utf-8');
console.log('Successfully patched views/template.php with all localized variables!');
