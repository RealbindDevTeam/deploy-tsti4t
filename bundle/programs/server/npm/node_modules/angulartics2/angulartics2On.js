var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Directive, ElementRef, Input, Injectable, } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Angulartics2 } from './angulartics2';
var Angulartics2On = (function () {
    function Angulartics2On(elRef, angulartics2, eventManager) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.eventManager = eventManager;
        this.angularticsProperties = {};
        this.el = this.elRef.nativeElement;
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.isBrowser()) {
            this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
        }
    };
    Angulartics2On.prototype.isBrowser = function () {
        return typeof (window) !== 'undefined';
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        var action = this.angularticsAction;
        var properties = __assign({}, this.angularticsProperties, { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties,
        });
    };
    Angulartics2On.decorators = [
        { type: Injectable },
        { type: Directive, args: [{
                    selector: '[angulartics2On]'
                },] },
    ];
    Angulartics2On.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Angulartics2, },
        { type: EventManager, },
    ]; };
    Angulartics2On.propDecorators = {
        'angulartics2On': [{ type: Input, args: ['angulartics2On',] },],
        'angularticsAction': [{ type: Input },],
        'angularticsCategory': [{ type: Input },],
        'angularticsLabel': [{ type: Input },],
        'angularticsValue': [{ type: Input },],
        'angularticsProperties': [{ type: Input },],
    };
    return Angulartics2On;
}());
export { Angulartics2On };
//# sourceMappingURL=angulartics2On.js.map