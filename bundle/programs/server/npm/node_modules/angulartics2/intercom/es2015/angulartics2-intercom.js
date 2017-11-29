import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Intercom {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe((x) => this.setUserProperties(x));
    }
    pageTrack(path, location) {
        try {
            this.eventTrack('Pageview', {
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
            Intercom('trackEvent', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            if (properties.userId && !properties.user_id) {
                properties.user_id = properties.userId;
            }
            Intercom('boot', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Intercom.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Intercom.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-intercom.js.map