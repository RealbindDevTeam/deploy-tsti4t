import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
var Angulartics2Woopra = /** @class */ (function () {
    function Angulartics2Woopra(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (woopra) === 'undefined') {
            console.warn('Woopra not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Woopra.prototype.pageTrack = function (path, location) {
        try {
            woopra.track('pv', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.eventTrack = function (action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.setUserProperties = function (properties) {
        try {
            if (properties.email) {
                woopra.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Angulartics2Woopra.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Woopra;
}());
export { Angulartics2Woopra };
//# sourceMappingURL=angulartics2-woopra.js.map