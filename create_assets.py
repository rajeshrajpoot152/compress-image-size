from PIL import Image, ImageDraw, ImageFont
import os

images_dir = os.path.join(os.path.dirname(__file__), 'images')
os.makedirs(images_dir, exist_ok=True)

# 1. Generate Favicon (64x64)
fav = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
draw = ImageDraw.Draw(fav)
# Rounded blue rectangle
draw.rounded_rectangle([2, 2, 62, 62], radius=14, fill=(37, 99, 235, 255))
# White inner icon (Image compress / arrow symbol)
draw.polygon([(32, 14), (46, 28), (38, 28), (38, 42), (26, 42), (26, 28), (18, 28)], fill=(255, 255, 255, 255))
draw.rectangle([20, 46, 44, 50], fill=(255, 255, 255, 230))

fav.save(os.path.join(images_dir, 'favicon.png'), 'PNG')
print("favicon.png generated successfully.")

# 2. Generate OG Image (1200x630)
og = Image.new('RGB', (1200, 630), (15, 23, 42)) # Deep slate background
og_draw = ImageDraw.Draw(og)

# Background subtle design gradient blocks
og_draw.rectangle([0, 0, 1200, 8], fill=(37, 99, 235))
og_draw.rounded_rectangle([80, 80, 1120, 550], radius=24, fill=(30, 41, 59), outline=(51, 65, 85), width=2)

# Blue brand badge
og_draw.rounded_rectangle([130, 140, 210, 220], radius=20, fill=(37, 99, 235))
og_draw.polygon([(170, 155), (190, 175), (180, 175), (180, 195), (160, 195), (160, 175), (150, 175)], fill=(255, 255, 255))
og_draw.rectangle([152, 202, 188, 207], fill=(255, 255, 255))

# Brand text & features
# Using default bitmap font or simple text
try:
    font_large = ImageFont.truetype("arial.ttf", 48)
    font_mid = ImageFont.truetype("arial.ttf", 26)
    font_small = ImageFont.truetype("arial.ttf", 20)
except Exception:
    font_large = ImageFont.load_default()
    font_mid = ImageFont.load_default()
    font_small = ImageFont.load_default()

og_draw.text((235, 155), "CompressImageSize.com", fill=(255, 255, 255), font=font_large)
og_draw.text((130, 270), "100% Free & In-Browser Private Image Compressor", fill=(147, 197, 253), font=font_mid)
og_draw.text((130, 320), "• Zero Server Uploads • Instant Client-Side Processing", fill=(203, 213, 225), font=font_small)
og_draw.text((130, 360), "• Lossless Quality (SSIM > 0.98) • Supports JPG, PNG, WebP, GIF", fill=(203, 213, 225), font=font_small)
og_draw.text((130, 400), "• Batch Process 500+ Images in RAM • 10 Global Languages", fill=(203, 213, 225), font=font_small)

# Trust badge pill
og_draw.rounded_rectangle([130, 460, 450, 505], radius=12, fill=(16, 185, 129))
og_draw.text((150, 473), "✓ 100% In-Browser Privacy Guaranteed", fill=(255, 255, 255), font=font_small)

og.save(os.path.join(images_dir, 'og-image.jpg'), 'JPEG', quality=90)
print("og-image.jpg generated successfully.")
