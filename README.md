# Product Banner Block for WooCommerce

A beautiful, customizable Gutenberg block for creating eye-catching product banners in WordPress with WooCommerce.

## Features

- 🛍️ **WooCommerce Integration** - Select any product from your store
- 🖼️ **Flexible Images** - Use product image or upload custom banner image
- ✏️ **Custom Content** - Override with custom title and description
- 🎨 **Beautiful Design** - Modern, responsive design with gradient overlays
- 📱 **Fully Responsive** - Looks great on all devices
- ⚡ **Performance Optimized** - Server-side rendering for fast loading

## Installation

### Step 1: Upload to WordPress

1. Copy the entire `product-banner-block` folder to your WordPress plugins directory:
   ```
   wp-content/plugins/product-banner-block/
   ```

2. Or upload as a ZIP file through WordPress admin (Plugins → Add New → Upload Plugin)

### Step 2: Install Dependencies

Navigate to the plugin folder and install npm dependencies:

```bash
cd wp-content/plugins/product-banner-block
npm install
```

### Step 3: Build the Block

Build the production files:

```bash
npm run build
```

Or for development with auto-rebuild:

```bash
npm start
```

### Step 4: Activate

1. Go to WordPress Admin → Plugins
2. Find "Product Banner Block"
3. Click "Activate"

## Usage

### Adding the Block

1. Edit any page or post in WordPress
2. Click the (+) button to add a block
3. Search for "Product Banner"
4. Click to insert the block

### Configuring the Block

#### In the Editor:

1. **Click inside the block** to edit the title and text directly
2. Use the **sidebar panel** (right side) for additional settings

#### Sidebar Settings:

**Product Settings**
- Select a WooCommerce product from the dropdown

**Content Settings**
- Edit title and description inline
- Custom content overrides product details

**Image Settings**
- Toggle "Use Product Image" on/off
- When off, click "Select Image" to upload custom banner
- Image dimensions: recommended 1920x600px or wider

### Block Features

The block automatically displays:
- Product title (or custom title)
- Custom description text
- Product price
- "Shop Now" button (links to product page)
- Background image with beautiful gradient overlay

## Customization

### Styling

To customize the appearance, you can add custom CSS to your theme:

```css
/* Change button colors */
.product-banner-button {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}

/* Change overlay opacity */
.product-banner-overlay {
    background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
}

/* Adjust text colors */
.product-banner-title {
    color: #your-color;
}
```

### Development

For development work:

```bash
# Watch for changes and auto-rebuild
npm start

# Format code
npm run format

# Lint JavaScript
npm run lint:js
```

## File Structure

```
product-banner-block/
├── src/
│   ├── block.json          # Block metadata
│   ├── index.js            # Main entry point
│   ├── edit.js             # Editor component
│   ├── save.js             # Save function
│   ├── style.scss          # Frontend styles
│   └── editor.scss         # Editor styles
├── build/                  # Compiled files (generated)
├── product-banner-block.php # Main PHP file
├── package.json            # Dependencies
└── README.md              # This file
```

## Requirements

- WordPress 6.0 or higher
- WooCommerce 7.0 or higher
- PHP 7.4 or higher
- Node.js 18.0 or higher (for development)

## Troubleshooting

### Block doesn't appear in editor
- Make sure WooCommerce is installed and activated
- Check that you've run `npm install` and `npm run build`
- Clear your browser cache

### Images not displaying
- Check file permissions on uploads folder
- Verify image URLs are accessible
- Try re-uploading the image

### Product dropdown is empty
- Ensure you have published WooCommerce products
- Check WooCommerce is properly configured

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Built for the Neve child theme by ThemeIsle
Based on WordPress @wordpress/create-block

## License

GPL v2 or later

## Support

For issues or questions, please use the WordPress support forums or contact ThemeIsle support.
