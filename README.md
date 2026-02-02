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

To customize the appearance, you can add custom CSS to your theme

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

Based on WordPress @wordpress/create-block

## License

GPL v2 or later

