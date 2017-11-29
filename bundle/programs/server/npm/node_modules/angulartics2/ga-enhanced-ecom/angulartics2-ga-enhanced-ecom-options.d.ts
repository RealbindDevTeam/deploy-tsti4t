/**
 * Product and Promotion Actions
 *
 * Actions specify how to interpret product and promotion data that you send to Google Analytics.
 */
export declare type GaEnhancedEcomAction = 'click' | 'detail' | 'add' | 'remove' | 'checkout' | 'checkout_option' | 'purchase' | 'refund' | 'promo_click';
/**
 * Impression Data
 *
 * Represents information about a product that has been viewed. It is
 * referred to as an impressionFieldObject and contains the following values.
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#impression-data
 */
export interface GaEnhancedEcomImpressionFieldObject {
    id?: string;
    name?: string;
    list?: string;
    brand?: string;
    category?: string;
    variant?: string;
    position?: number;
    price?: number;
}
/**
 * Product Data
 *
 * Product data represents individual products that were viewed, added
 * to the shopping cart, etc. It is referred to as a productFieldObject
 * and contains the following values.
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-data
 */
export interface GaEnhancedEcomProductFieldObject {
    id?: string;
    name?: string;
    brand?: string;
    category?: string;
    variant?: string;
    price?: number;
    quantity?: number;
    coupon?: string;
    position?: number;
}
/**
 * Promotion Data
 *
 * Represents information about a promotion that has been viewed.
 * It is referred to a promoFieldObject and contains the following values.
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#promotion-data
 */
export interface GaEnhancedEcomPromoFieldObject {
    id?: string;
    name?: string;
    creative?: string;
    position?: string;
}
/**
 * Action Data
 *
 * Represents information about an ecommerce related action
 * that has taken place. It is referred to as an actionFieldObject
 * and contains the following values.
 *
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#action-data
 */
export interface GaEnhancedEcomActionFieldObject {
    id?: string;
    affilation?: string;
    revenue?: number;
    tax?: number;
    shipping?: number;
    coupon?: string;
    list?: string;
    step?: number;
    option?: string;
}
