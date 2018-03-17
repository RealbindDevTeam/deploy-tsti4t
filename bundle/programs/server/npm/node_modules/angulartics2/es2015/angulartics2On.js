import { Directive, ElementRef, Input, Injectable, } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Angulartics2 } from './angulartics2';
export class Angulartics2On {
    constructor(elRef, angulartics2, eventManager) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.eventManager = eventManager;
        this.angularticsProperties = {};
        this.el = this.elRef.nativeElement;
    }
    ngAfterContentInit() {
        if (this.isBrowser()) {
            this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', (event) => this.eventTrack(event));
        }
    }
    isBrowser() {
        return typeof (window) !== 'undefined';
    }
    eventTrack(event) {
        const action = this.angularticsAction;
        const properties = Object.assign({}, this.angularticsProperties, { eventType: event.type });
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
            action,
            properties,
        });
    }
}
Angulartics2On.decorators = [
    { type: Injectable },
    { type: Directive, args: [{
                selector: '[angulartics2On]'
            },] },
];
Angulartics2On.ctorParameters = () => [
    { type: ElementRef, },
    { type: Angulartics2, },
    { type: EventManager, },
];
Angulartics2On.propDecorators = {
    'angulartics2On': [{ type: Input, args: ['angulartics2On',] },],
    'angularticsAction': [{ type: Input },],
    'angularticsCategory': [{ type: Input },],
    'angularticsLabel': [{ type: Input },],
    'angularticsValue': [{ type: Input },],
    'angularticsProperties': [{ type: Input },],
};
//# sourceMappingURL=angulartics2On.js.map