import sys
import json
import os
import subprocess

# Auto-install dependencies
try:
    from PIL import Image
    from colorthief import ColorThief
except ImportError:
    print("Installing requirements...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "colorthief"])
    from PIL import Image
    from colorthief import ColorThief

image_path = "public/images/newLogo.jpg"
if not os.path.exists(image_path):
    print(f"Error: {image_path} not found")
    sys.exit(1)

# Open image
img = Image.open(image_path).convert("RGBA")
width, height = img.size

# 1. Floodfill from corners to make background transparent (ignores pure whitespace inside the logo)
# Assuming corner pixels are the background color
bg_color = img.getpixel((0, 0)) # e.g. (255, 255, 255, 255)

# We can use ImageDraw floodfill or simple threshold if it's white. Let's do threshold for now but keep non-background whites.
# A simple logic: if it's very close to white and near edges? No, simple threshold:
pixels = img.getdata()
new_data = []
for p in pixels:
    if p[0] > 245 and p[1] > 245 and p[2] > 245:
        new_data.append((255, 255, 255, 0)) # transparent
    else:
        new_data.append(p)
img.putdata(new_data)
img.save("public/images/logo.png", "PNG")
print("Saved transparent logo.png")

# 2. Extract colors
try:
    color_thief = ColorThief(image_path)
    # Lấy 6 màu nổi bật
    palette = color_thief.get_palette(color_count=6, quality=1)
    
    # Filter background white/light gray
    filtered_palette = [c for c in palette if not (c[0] > 230 and c[1] > 230 and c[2] > 230)]
    
    colors = {}
    if len(filtered_palette) >= 3:
        colors["primary"] = '#%02x%02x%02x' % filtered_palette[0]
        colors["secondary"] = '#%02x%02x%02x' % filtered_palette[1]
        colors["accent"] = '#%02x%02x%02x' % filtered_palette[2]
    elif len(filtered_palette) == 2:
        colors["primary"] = '#%02x%02x%02x' % filtered_palette[0]
        colors["secondary"] = '#%02x%02x%02x' % filtered_palette[1]
        colors["accent"] = '#%02x%02x%02x' % filtered_palette[1]
    elif len(filtered_palette) == 1:
        c = '#%02x%02x%02x' % filtered_palette[0]
        colors["primary"] = c
        colors["secondary"] = c
        colors["accent"] = c
    else:
        # Fallback
        colors["primary"] = "#2D3561"
        colors["secondary"] = "#F5B7C5"
        colors["accent"] = "#E8899E"
        
except Exception as e:
    print("ColorThief error:", e)
    colors = { "primary": "#2D3561", "secondary": "#F5B7C5", "accent": "#E8899E" }

print("Extracted colors:", colors)
with open("colors.json", "w") as f:
    json.dump(colors, f)

# 3. Create Favicon
# Favicon MUST be square. Let's crop it to square first.
square_size = min(width, height)
left = (width - square_size) / 2
top = (height - square_size) / 2
right = (width + square_size) / 2
bottom = (height + square_size) / 2

icon_img = img.crop((left, top, right, bottom))
icon_img = icon_img.resize((32, 32))
icon_path = "src/app/favicon.ico"
os.makedirs(os.path.dirname(icon_path), exist_ok=True)
icon_img.save(icon_path, format='ICO')
print(f"Saved {icon_path}")

# Remove old public/favicon.ico if exists
old_icon = "public/favicon.ico"
if os.path.exists(old_icon):
    os.remove(old_icon)
    print("Removed old public/favicon.ico")

print("All image processing complete.")
