<?php
$step1Svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" width="100%" height="100%">
  <defs>
    <linearGradient id="s1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFF6FF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="s1-primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <linearGradient id="s1-card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="s1-photo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
    <linearGradient id="s1-photo-sun" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
    <filter id="s1-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#1E3A8A" flood-opacity="0.08"/>
    </filter>
    <filter id="s1-card-float" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#1E40AF" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="480" height="300" rx="20" fill="url(#s1-bg)"/>
  
  <!-- Subtle decorative grid dots -->
  <g opacity="0.28" fill="#94A3B8">
    <circle cx="36" cy="36" r="2"/><circle cx="66" cy="36" r="2"/><circle cx="96" cy="36" r="2"/>
    <circle cx="36" cy="66" r="2"/><circle cx="66" cy="66" r="2"/><circle cx="96" cy="66" r="2"/>
    <circle cx="384" cy="234" r="2"/><circle cx="414" cy="234" r="2"/><circle cx="444" cy="234" r="2"/>
    <circle cx="384" cy="264" r="2"/><circle cx="414" cy="264" r="2"/><circle cx="444" cy="264" r="2"/>
  </g>

  <!-- Main Dropzone Container Card -->
  <g filter="url(#s1-shadow)">
    <rect x="36" y="28" width="408" height="244" rx="18" fill="url(#s1-card-grad)" stroke="#DBEAFE" stroke-width="1.5"/>
    <rect x="48" y="40" width="384" height="220" rx="14" fill="#FFFFFF" stroke="#3B82F6" stroke-width="1.8" stroke-dasharray="6 6" opacity="0.9"/>
  </g>

  <!-- Floating Photo Card 2 (Right angled) -->
  <g filter="url(#s1-card-float)" transform="translate(284, 68) rotate(9)">
    <rect width="110" height="118" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="8" y="8" width="94" height="72" rx="6" fill="#F1F5F9"/>
    <path d="M12 68 L40 40 L65 60 L88 34 L98 68 Z" fill="#94A3B8" opacity="0.45"/>
    <circle cx="32" cy="24" r="7" fill="#CBD5E1"/>
    <rect x="8" y="88" width="46" height="18" rx="5" fill="#ECFDF5"/>
    <text x="31" y="101" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#059669" text-anchor="middle">WEBP</text>
  </g>

  <!-- Floating Photo Card 1 (Left angled) -->
  <g filter="url(#s1-card-float)" transform="translate(74, 76) rotate(-7)">
    <rect width="118" height="128" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="8" y="8" width="102" height="82" rx="8" fill="url(#s1-photo-grad)"/>
    <circle cx="34" cy="28" r="8" fill="url(#s1-photo-sun)"/>
    <path d="M8 82 L42 50 L72 74 L90 56 L110 82 Z" fill="#FFFFFF" opacity="0.35"/>
    <path d="M28 88 L58 64 L92 88 Z" fill="#FFFFFF" opacity="0.65"/>
    <rect x="8" y="98" width="38" height="18" rx="5" fill="#EFF6FF"/>
    <text x="27" y="111" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#2563EB" text-anchor="middle">JPG</text>
    <rect x="52" y="98" width="42" height="18" rx="5" fill="#F8FAFC"/>
    <text x="73" y="111" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" fill="#64748B" text-anchor="middle">3.2 MB</text>
  </g>

  <!-- Central Upload Cloud & Action Icon -->
  <g transform="translate(195, 62)">
    <circle cx="45" cy="45" r="44" fill="#DBEAFE" opacity="0.6"/>
    <circle cx="45" cy="45" r="34" fill="url(#s1-primary)"/>
    <path d="M36 43 L45 34 L54 43 M45 35 L45 53" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33 49 A10 10 0 0 1 33 33 A14 14 0 0 1 57 33 A10 10 0 0 1 57 49" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.45"/>
  </g>

  <!-- Text & Call to Action in Center -->
  <g transform="translate(240, 182)" text-anchor="middle">
    <rect x="-92" y="0" width="184" height="36" rx="18" fill="#2563EB"/>
    <text x="0" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF">Select or Drag Images</text>
    <text x="0" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748B">Supports JPG, PNG, WebP &amp; GIF</text>
  </g>

  <!-- Step Badge in top-left -->
  <g transform="translate(54, 46)">
    <rect width="28" height="28" rx="8" fill="#2563EB"/>
    <text x="14" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">1</text>
  </g>
</svg>
SVG;

$step2Svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" width="100%" height="100%">
  <defs>
    <linearGradient id="s2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EEF2FF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="s2-track" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="60%" stop-color="#2563EB"/>
      <stop offset="60%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <filter id="s2-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#312E81" flood-opacity="0.08"/>
    </filter>
    <filter id="s2-thumb-shadow" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#1E40AF" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="480" height="300" rx="20" fill="url(#s2-bg)"/>
  
  <!-- Subtle decorative grid dots -->
  <g opacity="0.28" fill="#94A3B8">
    <circle cx="36" cy="36" r="2"/><circle cx="66" cy="36" r="2"/><circle cx="96" cy="36" r="2"/>
    <circle cx="384" cy="234" r="2"/><circle cx="414" cy="234" r="2"/><circle cx="444" cy="234" r="2"/>
  </g>

  <!-- Main Settings Panel Card -->
  <g filter="url(#s2-shadow)">
    <rect x="36" y="28" width="408" height="244" rx="18" fill="#FFFFFF" stroke="#E0E7FF" stroke-width="1.5"/>
  </g>

  <!-- Step Badge -->
  <g transform="translate(54, 44)">
    <rect width="28" height="28" rx="8" fill="#4F46E5"/>
    <text x="14" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">2</text>
  </g>

  <!-- Card Title & Live Value Pill -->
  <text x="92" y="63" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#0F172A">Quality &amp; Format Control</text>
  <g transform="translate(322, 44)">
    <rect width="102" height="28" rx="14" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
    <circle cx="14" cy="14" r="4" fill="#2563EB"/>
    <text x="58" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#2563EB" text-anchor="middle">60% Default</text>
  </g>

  <!-- Slider Section -->
  <g transform="translate(54, 98)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B">COMPRESSION LEVEL</text>
    <text x="372" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#2563EB" text-anchor="end">60%</text>
    
    <!-- Track -->
    <rect x="0" y="12" width="372" height="8" rx="4" fill="url(#s2-track)"/>
    
    <!-- Thumb Knob at 60% -->
    <g filter="url(#s2-thumb-shadow)" transform="translate(223, 16)">
      <circle cx="0" cy="0" r="12" fill="#2563EB"/>
      <circle cx="0" cy="0" r="6" fill="#FFFFFF"/>
    </g>

    <!-- Slider Scale Marks -->
    <text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#94A3B8">50% Max</text>
    <text x="223" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#2563EB" text-anchor="middle">60% Default</text>
    <text x="372" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#94A3B8" text-anchor="end">95% Lossless</text>
  </g>

  <!-- Format Selector Chips -->
  <g transform="translate(54, 162)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#64748B">OUTPUT FORMAT</text>
    
    <!-- WebP Chip (Active) -->
    <g transform="translate(0, 10)">
      <rect width="116" height="32" rx="8" fill="#2563EB"/>
      <text x="58" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">★ WebP (Best)</text>
    </g>
    <!-- JPG Chip -->
    <g transform="translate(126, 10)">
      <rect width="116" height="32" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <text x="58" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">JPG / JPEG</text>
    </g>
    <!-- PNG Chip -->
    <g transform="translate(252, 10)">
      <rect width="120" height="32" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1"/>
      <text x="60" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">PNG Lossless</text>
    </g>
  </g>

  <!-- Live Optimization Meter Pill -->
  <g transform="translate(54, 218)">
    <rect width="372" height="36" rx="10" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
    <text x="16" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748B">Estimated size:</text>
    <text x="108" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94A3B8" text-decoration="line-through">2.8 MB</text>
    <text x="160" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#059669">480 KB</text>
    <g transform="translate(284, 8)">
      <rect width="76" height="20" rx="10" fill="#DCFCE7"/>
      <text x="38" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#15803D" text-anchor="middle">-83% SAVED</text>
    </g>
  </g>
</svg>
SVG;

$step3Svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" width="100%" height="100%">
  <defs>
    <linearGradient id="s3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECFDF5"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>
    <linearGradient id="s3-btn" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="s3-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#064E3B" flood-opacity="0.08"/>
    </filter>
    <filter id="s3-btn-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#059669" flood-opacity="0.28"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="480" height="300" rx="20" fill="url(#s3-bg)"/>
  
  <!-- Subtle decorative grid dots -->
  <g opacity="0.28" fill="#94A3B8">
    <circle cx="36" cy="36" r="2"/><circle cx="66" cy="36" r="2"/><circle cx="96" cy="36" r="2"/>
    <circle cx="384" cy="234" r="2"/><circle cx="414" cy="234" r="2"/><circle cx="444" cy="234" r="2"/>
  </g>

  <!-- Main Success Card -->
  <g filter="url(#s3-shadow)">
    <rect x="36" y="28" width="408" height="244" rx="18" fill="#FFFFFF" stroke="#D1FAE5" stroke-width="1.5"/>
  </g>

  <!-- Step Badge -->
  <g transform="translate(54, 44)">
    <rect width="28" height="28" rx="8" fill="#059669"/>
    <text x="14" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">3</text>
  </g>

  <!-- Status Header -->
  <g transform="translate(92, 44)">
    <text x="0" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#0F172A">Compression Finished!</text>
  </g>
  <g transform="translate(316, 44)">
    <rect width="108" height="28" rx="14" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
    <circle cx="14" cy="14" r="4" fill="#10B981"/>
    <text x="60" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">100% Ready</text>
  </g>

  <!-- Completed File Row Preview -->
  <g transform="translate(54, 88)">
    <rect width="372" height="56" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
    
    <!-- Thumbnail Icon with check -->
    <rect x="12" y="10" width="36" height="36" rx="8" fill="#EFF6FF"/>
    <path d="M20 28 L27 34 L40 18" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    
    <!-- File Details -->
    <text x="58" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#0F172A">photo-optimized.webp</text>
    <text x="58" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="500" fill="#64748B">Original 2.8 MB  •  Saved 83%</text>

    <!-- Size pill -->
    <g transform="translate(284, 15)">
      <rect width="76" height="26" rx="13" fill="#DCFCE7"/>
      <text x="38" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#15803D" text-anchor="middle">480 KB</text>
    </g>
  </g>

  <!-- Big Instant Download Action Button -->
  <g filter="url(#s3-btn-shadow)" transform="translate(54, 160)">
    <rect width="372" height="50" rx="14" fill="url(#s3-btn)"/>
    
    <!-- Download Icon -->
    <g transform="translate(65, 14)">
      <path d="M11 4 L11 16 M5 10 L11 16 L17 10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M2 19 L20 19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Button Text -->
    <text x="196" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">Download All (ZIP / Single)</text>
  </g>

  <!-- Security & Privacy Guarantee Footer -->
  <g transform="translate(240, 244)" text-anchor="middle">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748B">Instant Download • 100% Private (No Cloud Storage)</text>
  </g>
</svg>
SVG;

$targetDir = dirname(__DIR__) . '/images';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

file_put_contents($targetDir . '/step-1.svg', $step1Svg);
file_put_contents($targetDir . '/step-2.svg', $step2Svg);
file_put_contents($targetDir . '/step-3.svg', $step3Svg);

echo "Step SVGs successfully written to images directory!\n";
