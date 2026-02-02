<?php

/**
 * Plugin Name: Product Banner Block
 * Description: A custom Gutenberg block for WooCommerce product banners
 * Version: 1.0.0
 * Author: Neila sadji
 * Text Domain: neve
 *
 * @package ProductBannerBlock
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function product_banner_block_init()
{
    register_block_type(
        __DIR__ . '/build',
        array(
            'render_callback' => 'render_product_banner_block',
        )
    );
}
add_action('init', 'product_banner_block_init');

/**
 * Render callback for the product banner block.
 *
 * @param array $attributes Block attributes.
 * @return string Block HTML.
 */
function render_product_banner_block($attributes)
{
    $product_id = isset($attributes['productId']) ? intval($attributes['productId']) : 0;
    $title      = isset($attributes['title']) ? esc_html($attributes['title']) : '';
    $text       = isset($attributes['text']) ? wp_kses_post($attributes['text']) : '';
    $image_id   = isset($attributes['imageId']) ? intval($attributes['imageId']) : 0;
    $use_product_image = isset($attributes['useProductImage']) ? $attributes['useProductImage'] : true;
    $button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : __('Shop Now', 'neve');
    $button_style = isset($attributes['buttonStyle']) ? esc_attr($attributes['buttonStyle']) : 'gradient-purple';
    $button_radius = isset($attributes['buttonBorderRadius']) ? intval($attributes['buttonBorderRadius']) : 50;

    // Get product if ID is set
    $product = $product_id ? wc_get_product($product_id) : null;

    if (!$product && !$title && !$text) {
        return '<div class="product-banner-block product-banner-placeholder">
                    <p>' . __('Please configure your product banner in the editor.', 'neve') . '</p>
                </div>';
    }

    // Determine which image to use
    $image_url = '';
    if ($use_product_image && $product) {
        $image_id = $product->get_image_id();
    }

    if ($image_id) {
        $image_url = wp_get_attachment_image_url($image_id, 'large');
    }

    // Get product data
    $product_name = $product ? $product->get_name() : '';
    $product_price = $product ? $product->get_price_html() : '';
    $product_url = $product ? get_permalink($product->get_id()) : '#';

    // Button classes and styles
    $button_class = 'product-banner-button button-style-' . $button_style;
    $button_inline_style = 'border-radius: ' . $button_radius . 'px;';

    // Build the HTML
    ob_start();
?>
    <div class="product-banner-block" style="<?php echo $image_url ? 'background-image: url(' . esc_url($image_url) . ');' : ''; ?>">
        <div class="product-banner-overlay"></div>
        <div class="product-banner-content">
            <?php if ($title) : ?>
                <h2 class="product-banner-title"><?php echo $title; ?></h2>
            <?php elseif ($product_name) : ?>
                <h2 class="product-banner-title"><?php echo esc_html($product_name); ?></h2>
            <?php endif; ?>

            <?php if ($text) : ?>
                <div class="product-banner-text"><?php echo $text; ?></div>
            <?php endif; ?>

            <?php if ($product) : ?>
                <div class="product-banner-price"><?php echo $product_price; ?></div>
                <a href="<?php echo esc_url($product_url); ?>" class="<?php echo esc_attr($button_class); ?>" style="<?php echo esc_attr($button_inline_style); ?>">
                    <?php echo $button_text; ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
<?php
    return ob_get_clean();
}

/**
 * Enqueue block assets for frontend only.
 */
function product_banner_block_frontend_assets()
{
    if (has_block('create-block/product-banner')) {
        wp_enqueue_style(
            'product-banner-block-frontend',
            plugins_url('build/style-index.css', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'product_banner_block_frontend_assets');
