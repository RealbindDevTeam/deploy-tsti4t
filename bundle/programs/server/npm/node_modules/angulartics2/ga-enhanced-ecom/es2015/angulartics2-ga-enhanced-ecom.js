import { Injectable } from '@angular/core';
export class Angulartics2GoogleAnalyticsEnhancedEcommerce {
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @name ecAddImpression
     *
     * @param {GaEnhancedEcomImpressionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    ecAddImpression(properties) {
        ga('ec:addImpression', properties);
    }
    /**
     * Add product in GA enhanced ecommerce tracking
     * @name ecAddProduct
     *
     * @param {GaEnhancedEcomProductFieldObject} product
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecAddProduct(product) {
        ga('ec:addProduct', product);
    }
    /**
     * Set action in GA enhanced ecommerce tracking
     * @name ecSetAction
     *
     * @param {GaEnhancedEcomAction} action
     * @param {GaEnhancedEcomActionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecSetAction(action, properties) {
        ga('ec:setAction', action, properties);
    }
}
Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2GoogleAnalyticsEnhancedEcommerce.ctorParameters = () => [];
//# sourceMappingURL=angulartics2-ga-enhanced-ecom.js.map