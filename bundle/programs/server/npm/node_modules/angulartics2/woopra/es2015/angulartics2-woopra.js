import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Woopra {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (woopra) === 'undefined') {
            console.warn('Woopra not found');
        }
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    pageTrack(path, location) {
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
    }
    eventTrack(action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
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
    }
}
Angulartics2Woopra.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Woopra.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-woopra.js.map