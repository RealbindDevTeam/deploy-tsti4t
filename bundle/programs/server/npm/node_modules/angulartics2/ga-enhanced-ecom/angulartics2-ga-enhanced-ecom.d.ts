import { GaEnhancedEcomProductFieldObject, GaEnhancedEcomAction, GaEnhancedEcomActionFieldObject, GaEnhancedEcomImpressionFieldObject } from './angulartics2-ga-enhanced-ecom-options';
export declare class Angulartics2GoogleAnalyticsEnhancedEcommerce {
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @name ecAddImpression
     *
     * @param {GaEnhancedEcomImpressionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    ecAddImpression(properties: GaEnhancedEcomImpressionFieldObject): void;
    /**
     * Add product in GA enhanced ecommerce tracking
     * @name ecAddProduct
     *
     * @param {GaEnhancedEcomProductFieldObject} product
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecAddProduct(product: GaEnhancedEcomProductFieldObject): void;
    /**
     * Set action in GA enhanced ecommerce tracking
     * @name ecSetAction
     *
     * @param {GaEnhancedEcomAction} action
     * @param {GaEnhancedEcomActionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecSetAction(action: GaEnhancedEcomAction, properties: GaEnhancedEcomActionFieldObject): void;
}
