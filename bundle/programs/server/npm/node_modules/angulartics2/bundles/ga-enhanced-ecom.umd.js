(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2['ga-enhanced-ecom'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

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
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ctorParameters = function () { return []; };
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());

/**
 * Generated bundle index. Do not edit.
 */

exports.Angulartics2GoogleAnalyticsEnhancedEcommerce = Angulartics2GoogleAnalyticsEnhancedEcommerce;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ga-enhanced-ecom.umd.js.map
