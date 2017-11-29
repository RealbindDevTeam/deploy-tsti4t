import { Injectable } from '@angular/core';
var Angulartics2GoogleAnalyticsEnhancedEcommerce = /** @class */ (function () {
    function Angulartics2GoogleAnalyticsEnhancedEcommerce() {
    }
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @name ecAddImpression
     *
     * @param {GaEnhancedEcomImpressionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddImpression = function (properties) {
        ga('ec:addImpression', properties);
    };
    /**
     * Add product in GA enhanced ecommerce tracking
     * @name ecAddProduct
     *
     * @param {GaEnhancedEcomProductFieldObject} product
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddProduct = function (product) {
        ga('ec:addProduct', product);
    };
    /**
     * Set action in GA enhanced ecommerce tracking
     * @name ecSetAction
     *
     * @param {GaEnhancedEcomAction} action
     * @param {GaEnhancedEcomActionFieldObject} properties
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecSetAction = function (action, properties) {
        ga('ec:setAction', action, properties);
    };
    Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ctorParameters = function () { return []; };
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());
export { Angulartics2GoogleAnalyticsEnhancedEcommerce };
//# sourceMappingURL=angulartics2-ga-enhanced-ecom.js.map