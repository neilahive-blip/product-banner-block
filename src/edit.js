import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    ToggleControl,
    Placeholder,
    SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit({ attributes, setAttributes }) {
    const {
        productId,
        title,
        text,
        imageId,
        imageUrl,
        useProductImage,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'product-banner-editor',
    });

    // Fetch WooCommerce products
    const { products, isLoadingProducts } = useSelect((select) => {
        const { getEntityRecords, isResolving } = select('core');
        
        return {
            products: getEntityRecords('postType', 'product', {
                per_page: 100,
                status: 'publish',
            }) || [],
            isLoadingProducts: isResolving('getEntityRecords', [
                'postType',
                'product',
                { per_page: 100, status: 'publish' },
            ]),
        };
    }, []);

    // Get selected product details
    const selectedProduct = useSelect(
        (select) => {
            if (!productId) return null;
            return select('core').getEntityRecord('postType', 'product', productId);
        },
        [productId]
    );

    // Update image URL when product or settings change
    useEffect(() => {
        if (useProductImage && selectedProduct && selectedProduct.featured_media) {
            const media = wp.data.select('core').getMedia(selectedProduct.featured_media);
            if (media) {
                setAttributes({ 
                    imageId: selectedProduct.featured_media,
                    imageUrl: media.source_url 
                });
            }
        }
    }, [selectedProduct, useProductImage]);

    const productOptions = [
        { label: __('Select a product...', 'neve'), value: 0 },
        ...products.map((product) => ({
            label: product.title.rendered,
            value: product.id,
        })),
    ];

    const onSelectImage = (media) => {
        setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            useProductImage: false,
        });
    };

    const onRemoveImage = () => {
        setAttributes({
            imageId: 0,
            imageUrl: '',
        });
    };

    // Show placeholder if no product selected
    if (!productId && !title && !text) {
        return (
            <div {...blockProps}>
                <Placeholder
                    icon="megaphone"
                    label={__('Product Banner', 'neve')}
                    instructions={__('Select a product to get started, or add custom content.', 'neve')}
                >
                    <SelectControl
                        value={productId}
                        options={productOptions}
                        onChange={(value) => setAttributes({ productId: parseInt(value) })}
                        disabled={isLoadingProducts}
                    />
                </Placeholder>
            </div>
        );
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Product Settings', 'neve')} initialOpen={true}>
                    <SelectControl
                        label={__('Select Product', 'neve')}
                        value={productId}
                        options={productOptions}
                        onChange={(value) => setAttributes({ productId: parseInt(value) })}
                        disabled={isLoadingProducts}
                        help={__('Choose a WooCommerce product to display', 'neve')}
                    />
                </PanelBody>

                <PanelBody title={__('Content Settings', 'neve')}>
                    <p className="components-base-control__help">
                        {__('Custom title and text will override product details', 'neve')}
                    </p>
                </PanelBody>

                <PanelBody title={__('Image Settings', 'neve')}>
                    <ToggleControl
                        label={__('Use Product Image', 'neve')}
                        checked={useProductImage}
                        onChange={(value) => setAttributes({ useProductImage: value })}
                        help={
                            useProductImage
                                ? __('Using the product featured image', 'neve')
                                : __('Using custom image', 'neve')
                        }
                        disabled={!productId}
                    />

                    {!useProductImage && (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <>
                                        {imageUrl ? (
                                            <div className="product-banner-image-preview">
                                                <img src={imageUrl} alt="" />
                                                <Button
                                                    onClick={onRemoveImage}
                                                    isDestructive
                                                    isSmall
                                                >
                                                    {__('Remove Image', 'neve')}
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="secondary">
                                                {__('Select Image', 'neve')}
                                            </Button>
                                        )}
                                    </>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="product-banner-block-editor-wrapper">
                    <div
                        className="product-banner-block"
                        style={{
                            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                        }}
                    >
                        <div className="product-banner-overlay"></div>
                        <div className="product-banner-content">
                            <RichText
                                tagName="h2"
                                className="product-banner-title"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={
                                    selectedProduct
                                        ? selectedProduct.title.rendered
                                        : __('Enter banner title...', 'neve')
                                }
                            />

                            <RichText
                                tagName="p"
                                className="product-banner-text"
                                value={text}
                                onChange={(value) => setAttributes({ text: value })}
                                placeholder={__('Enter banner description...', 'neve')}
                            />

                            {selectedProduct && (
                                <div className="product-banner-preview-info">
                                    <div className="product-banner-price">
                                        {__('Price will display here', 'neve')}
                                    </div>
                                    <div className="product-banner-button">
                                        {__('Shop Now', 'neve')}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
