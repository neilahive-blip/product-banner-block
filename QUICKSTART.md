# 🚀 Quick Start Guide - Product Banner Block

## What You Have

A complete Gutenberg block that lets you create beautiful product banners with:
- WooCommerce product selection
- Custom title & text
- Choice of product image or custom image
- Automatic pricing display
- "Shop Now" button

## Installation Steps (5 minutes)

### 1. Copy Files to WordPress

Copy the entire `product-banner-block` folder to:
```
wp-content/plugins/product-banner-block/
```

### 2. Install Dependencies

Open terminal/command prompt and navigate to the plugin folder:

```bash
cd /path/to/wordpress/wp-content/plugins/product-banner-block
npm install
```

Wait for installation to complete (this installs WordPress build tools).

### 3. Build the Block

Still in the same folder, run:

```bash
npm run build
```

This creates the `build` folder with compiled files.

### 4. Activate Plugin

1. Go to WordPress Admin
2. Navigate to Plugins
3. Find "Product Banner Block"
4. Click "Activate"

## How to Use

### Adding to a Page/Post:

1. Edit any page or post
2. Click the (+) button
3. Search "Product Banner"
4. Insert the block

### Configuring:

**Right Sidebar Panel:**
- **Product Settings** → Select your WooCommerce product
- **Image Settings** → Choose product image or upload custom

**In the Editor:**
- Click the title to edit
- Click the description to edit
- Changes save automatically

### What Gets Displayed:

✅ Title (custom or product name)  
✅ Description (your custom text)  
✅ Product price (automatic from WooCommerce)  
✅ "Shop Now" button (links to product)  
✅ Beautiful background image with overlay

## Customization

The block includes professional styling, but you can customize via:
- WordPress Customizer (Additional CSS)
- Your theme's style.css
- Or edit `src/style.scss` and rebuild

## Development Mode

For active development with auto-reload:

```bash
npm start
```

This watches for file changes and rebuilds automatically.

## File Overview

**Core Files:**
- `product-banner-block.php` - Main plugin file (registers block)
- `src/edit.js` - Editor interface (what you see in Gutenberg)
- `src/style.scss` - Frontend styles (what visitors see)
- `src/block.json` - Block configuration

**Build Process:**
- `npm run build` - Production build
- `npm start` - Development mode with hot reload

## Need Help?

**No products showing?**
- Make sure WooCommerce is installed
- Create and publish at least one product

**Block not appearing?**
- Run `npm run build` again
- Clear browser cache
- Check browser console for errors

**Want to customize colors?**
- Edit `src/style.scss`
- Modify gradient colors in `.product-banner-button`
- Run `npm run build` to see changes

## Next Steps

1. ✅ Install and activate
2. ✅ Create some WooCommerce products (if you haven't)
3. ✅ Add the block to a page
4. ✅ Select a product and customize
5. ✅ Publish and view!

Enjoy your beautiful product banners! 🎉
