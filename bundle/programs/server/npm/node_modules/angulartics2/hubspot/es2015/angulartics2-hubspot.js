import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Hubspot {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof _hsq === 'undefined') {
            _hsq = [];
        }
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    pageTrack(path, location) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['setPath', path]);
            _hsq.push(['trackPageView']);
        }
    }
    eventTrack(action, properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', properties]);
        }
    }
    setUserProperties(properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', properties]);
        }
    }
}
Angulartics2Hubspot.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Hubspot.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-hubspot.js.map