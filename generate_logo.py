import os
from PIL import Image, ImageDraw, ImageFont

images_dir = os.path.join(os.path.dirname(__file__), 'images')
os.makedirs(images_dir, exist_ok=True)

# 1. Generate images/logo.svg (Infinitely scalable, crisp vector logo)
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 64" width="360" height="64" fill="none">
  <defs>
    <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <filter id="logoShadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2563eb" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Logo App Icon -->
  <g filter="url(#logoShadow)">
    <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#logoGrad)"/>
    <!-- Photo landscape mountain & sun icon -->
    <path d="M19 38l6.5-6.5a1.5 1.5 0 012.1 0L39 43" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33 34l3.5-3.5a1.5 1.5 0 012.1 0L45 37" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="36" cy="22" r="3" fill="#ffffff"/>
    <!-- Compression Arrows Accent -->
    <path d="M18 19l4 4m0 0l4-4m-4 4V16" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Typography: CompressImageSize -->
  <text x="68" y="42" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-weight="800" font-size="26" letter-spacing="-0.5" fill="#2563eb">Compress</text>
  <text x="198" y="42" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-weight="800" font-size="26" letter-spacing="-0.5" fill="#0f172a">ImageSize</text>

  <!-- Free Badge Pill -->
  <rect x="306" y="24" width="44" height="20" rx="10" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.2"/>
  <text x="328" y="38" text-anchor="middle" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-weight="800" font-size="10" letter-spacing="0.5" fill="#059669">FREE</text>
</svg>'''

with open(os.path.join(images_dir, 'logo.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_content)
print("images/logo.svg generated.")


# 2. Generate High-Res Retina images/logo.png (720x128 @2x)
font_path = 'C:/Windows/Fonts/Poppins-ExtraBold.ttf'
if not os.path.exists(font_path):
    font_path = 'C:/Windows/Fonts/arialbd.ttf'

font_logo = ImageFont.truetype(font_path, 52)
font_badge = ImageFont.truetype('C:/Windows/Fonts/Poppins-Bold.ttf' if os.path.exists('C:/Windows/Fonts/Poppins-Bold.ttf') else font_path, 20)

width, height = 720, 128
logo_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(logo_img)

# App icon background with rounded rect (96x96)
icon_x, icon_y, icon_size = 16, 16, 96
draw.rounded_rectangle([icon_x, icon_y, icon_x + icon_size, icon_y + icon_size], radius=28, fill=(37, 99, 235, 255))

# White internal icon (Mountain & Sun + Compress arrows)
# Sun
draw.ellipse([icon_x + 58, icon_y + 24, icon_x + 72, icon_y + 38], fill=(255, 255, 255, 255))
# Mountains
draw.polygon([(icon_x + 20, icon_y + 76), (icon_x + 46, icon_y + 46), (icon_x + 64, icon_y + 64), (icon_x + 72, icon_y + 54), (icon_x + 88, icon_y + 76)], fill=(255, 255, 255, 255))
# Subtle compression arrow indicator at top left
draw.line([(icon_x + 28, icon_y + 28), (icon_x + 40, icon_y + 40)], fill=(147, 197, 253, 255), width=4)
draw.line([(icon_x + 40, icon_y + 40), (icon_x + 32, icon_y + 40)], fill=(147, 197, 253, 255), width=4)
draw.line([(icon_x + 40, icon_y + 40), (icon_x + 40, icon_y + 32)], fill=(147, 197, 253, 255), width=4)

# Text: "Compress" in #2563eb (Blue)
text_x = 136
text_y = 36
draw.text((text_x, text_y), "Compress", fill=(37, 99, 235, 255), font=font_logo)

# Measure width of "Compress"
bbox_compress = draw.textbbox((text_x, text_y), "Compress", font=font_logo)
compress_w = bbox_compress[2] - bbox_compress[0]

# Text: "ImageSize" in #0f172a (Dark Slate)
text_slate_x = text_x + compress_w + 6
draw.text((text_slate_x, text_y), "ImageSize", fill=(15, 23, 42, 255), font=font_logo)

# Measure width of "ImageSize"
bbox_imagesize = draw.textbbox((text_slate_x, text_y), "ImageSize", font=font_logo)
imagesize_w = bbox_imagesize[2] - bbox_imagesize[0]

# "FREE" Badge Pill
badge_x = text_slate_x + imagesize_w + 16
badge_y = text_y + 14
badge_w = 88
badge_h = 40
draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=20, fill=(236, 253, 245, 255), outline=(167, 243, 208, 255), width=2)
# Badge text centered
draw.text((badge_x + 18, badge_y + 8), "FREE", fill=(5, 150, 105, 255), font=font_badge)

logo_img.save(os.path.join(images_dir, 'logo.png'), 'PNG')
print("images/logo.png generated.")


# 3. Generate Square App Icon images/logo-icon.png (128x128)
icon_img = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
icon_draw = ImageDraw.Draw(icon_img)
icon_draw.rounded_rectangle([4, 4, 124, 124], radius=34, fill=(37, 99, 235, 255))
icon_draw.ellipse([80, 32, 98, 50], fill=(255, 255, 255, 255))
icon_draw.polygon([(26, 98), (56, 58), (80, 84), (92, 70), (112, 98)], fill=(255, 255, 255, 255))
icon_draw.line([(34, 34), (50, 50)], fill=(147, 197, 253, 255), width=5)
icon_draw.line([(50, 50), (40, 50)], fill=(147, 197, 253, 255), width=5)
icon_draw.line([(50, 50), (50, 40)], fill=(147, 197, 253, 255), width=5)
icon_img.save(os.path.join(images_dir, 'logo-icon.png'), 'PNG')
print("images/logo-icon.png generated.")
