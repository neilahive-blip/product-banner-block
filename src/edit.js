import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  useBlockProps,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
  ToggleControl,
  Placeholder,
  SelectControl,
  TextControl,
  RangeControl,
  ButtonGroup,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
  const {
    productId,
    title,
    text,
    imageId,
    imageUrl,
    useProductImage,
    buttonText,
    buttonStyle,
    buttonBorderRadius,
  } = attributes;

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const blockProps = useBlockProps({
    className: "product-banner-editor",
  });

  // Fetch WooCommerce products with search
  const { products, isLoadingProducts } = useSelect(
    (select) => {
      const { getEntityRecords, isResolving } = select("core");

      const query = {
        per_page: 100,
        status: "publish",
      };

      // Add search parameter if searching
      if (searchQuery && searchQuery.length > 0) {
        query.search = searchQuery;
      }

      return {
        products: getEntityRecords("postType", "product", query) || [],
        isLoadingProducts: isResolving("getEntityRecords", [
          "postType",
          "product",
          query,
        ]),
      };
    },
    [searchQuery]
  );

  // Get selected product details
  const selectedProduct = useSelect(
    (select) => {
      if (!productId) return null;
      return select("core").getEntityRecord("postType", "product", productId);
    },
    [productId]
  );

  // Update image URL when product or settings change
  useEffect(() => {
    if (useProductImage && selectedProduct && selectedProduct.featured_media) {
      const media = wp.data
        .select("core")
        .getMedia(selectedProduct.featured_media);
      if (media) {
        setAttributes({
          imageId: selectedProduct.featured_media,
          imageUrl: media.source_url,
        });
      }
    }
  }, [selectedProduct, useProductImage]);

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
      imageUrl: "",
    });
  };

  // Button style presets
  const buttonStyles = [
    { label: __("Gradient Purple", "neve"), value: "gradient-purple" },
    { label: __("Gradient Blue", "neve"), value: "gradient-blue" },
    { label: __("Gradient Red", "neve"), value: "gradient-red" },
    { label: __("Gradient Green", "neve"), value: "gradient-green" },
    { label: __("Solid Black", "neve"), value: "solid-black" },
    { label: __("Solid White", "neve"), value: "solid-white" },
    { label: __("Outline", "neve"), value: "outline" },
  ];

  // Get button style class
  const getButtonClass = () => {
    return `product-banner-button button-style-${buttonStyle}`;
  };

  // Get button inline styles
  const getButtonStyle = () => {
    return {
      borderRadius: `${buttonBorderRadius}px`,
    };
  };

  // Render product search/select interface
  const renderProductSelector = () => {
    return (
      <div className="product-banner-product-selector">
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <Button
            variant={!showSearch ? "primary" : "secondary"}
            onClick={() => setShowSearch(false)}
          >
            {__("Select", "neve")}
          </Button>
          <Button
            variant={showSearch ? "primary" : "secondary"}
            onClick={() => setShowSearch(true)}
          >
            {__("Search", "neve")}
          </Button>
        </div>

        {showSearch ? (
          <div className="product-banner-search">
            <TextControl
              label={__("Search Products", "neve")}
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder={__("Type to search...", "neve")}
              help={__("Search by product name", "neve")}
            />
            {isLoadingProducts && (
              <p className="components-base-control__help">
                {__("Searching...", "neve")}
              </p>
            )}
            {!isLoadingProducts && products.length === 0 && searchQuery && (
              <p className="components-base-control__help">
                {__("No products found", "neve")}
              </p>
            )}
            <div className="product-banner-search-results">
              {products.map((product) => (
                <Button
                  key={product.id}
                  className={`product-search-item ${
                    productId === product.id ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    setAttributes({ productId: product.id });
                    setSearchQuery("");
                    setShowSearch(false);
                  }}
                  variant={productId === product.id ? "primary" : "secondary"}
                >
                  {product.title.rendered}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <SelectControl
            label={__("Select Product", "neve")}
            value={productId}
            options={[
              { label: __("Select a product...", "neve"), value: 0 },
              ...products.map((product) => ({
                label: product.title.rendered,
                value: product.id,
              })),
            ]}
            onChange={(value) => setAttributes({ productId: parseInt(value) })}
            disabled={isLoadingProducts}
            help={__("Choose a WooCommerce product to display", "neve")}
          />
        )}

        {selectedProduct && (
          <div className="product-banner-selected-info">
            <strong>{__("Selected:", "neve")}</strong>{" "}
            {selectedProduct.title.rendered}
            <Button
              isSmall
              isDestructive
              onClick={() => setAttributes({ productId: 0 })}
            >
              {__("Clear", "neve")}
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Show placeholder if no product selected
  if (!productId && !title && !text) {
    return (
      <div {...blockProps}>
        <Placeholder
          icon="megaphone"
          label={__("Product Banner", "neve")}
          instructions={__(
            "Select a product to get started, or add custom content.",
            "neve"
          )}
        >
          {renderProductSelector()}
        </Placeholder>
      </div>
    );
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Product Settings", "neve")} initialOpen={true}>
          {renderProductSelector()}
        </PanelBody>

        <PanelBody title={__("Button Settings", "neve")}>
          <TextControl
            label={__("Button Text", "neve")}
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            placeholder={__("Shop Now", "neve")}
            help={__("Customize the button text", "neve")}
          />

          <SelectControl
            label={__("Button Style", "neve")}
            value={buttonStyle}
            options={buttonStyles}
            onChange={(value) => setAttributes({ buttonStyle: value })}
            help={__("Choose a button style preset", "neve")}
          />

          <RangeControl
            label={__("Border Radius", "neve")}
            value={buttonBorderRadius}
            onChange={(value) => setAttributes({ buttonBorderRadius: value })}
            min={0}
            max={50}
            help={__("Adjust button corner roundness", "neve")}
          />

          <div className="product-banner-button-preview">
            <p>
              <strong>{__("Preview:", "neve")}</strong>
            </p>
            <div className={getButtonClass()} style={getButtonStyle()}>
              {buttonText || __("Shop Now", "neve")}
            </div>
          </div>
        </PanelBody>

        <PanelBody title={__("Content Settings", "neve")}>
          <p className="components-base-control__help">
            {__("Custom title and text will override product details", "neve")}
          </p>
        </PanelBody>

        <PanelBody title={__("Image Settings", "neve")}>
          <ToggleControl
            label={__("Use Product Image", "neve")}
            checked={useProductImage}
            onChange={(value) => setAttributes({ useProductImage: value })}
            help={
              useProductImage
                ? __("Using the product featured image", "neve")
                : __("Using custom image", "neve")
            }
            disabled={!productId}
          />

          {!useProductImage && (
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={["image"]}
                value={imageId}
                render={({ open }) => (
                  <>
                    {imageUrl ? (
                      <div className="product-banner-image-preview">
                        <img src={imageUrl} alt="" />
                        <Button onClick={onRemoveImage} isDestructive isSmall>
                          {__("Remove Image", "neve")}
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={open} variant="secondary">
                        {__("Select Image", "neve")}
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
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
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
                    : __("Enter banner title...", "neve")
                }
              />

              <RichText
                tagName="p"
                className="product-banner-text"
                value={text}
                onChange={(value) => setAttributes({ text: value })}
                placeholder={__("Enter banner description...", "neve")}
              />

              {selectedProduct && (
                <div className="product-banner-preview-info">
                  <div className="product-banner-price">
                    {__("Price will display here", "neve")}
                  </div>
                  <div className={getButtonClass()} style={getButtonStyle()}>
                    {buttonText || __("Shop Now", "neve")}
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
