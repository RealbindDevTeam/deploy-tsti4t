import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Mixpanel {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe((x) => this.setUserPropertiesOnce(x));
        this.angulartics2.setSuperProperties.subscribe((x) => this.setSuperProperties(x));
        this.angulartics2.setSuperPropertiesOnce.subscribe((x) => this.setSuperPropertiesOnce(x));
        this.angulartics2.setAlias.subscribe((x) => this.setAlias(x));
    }
    pageTrack(path, location) {
        try {
            mixpanel.track('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            mixpanel.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUsername(userId) {
        try {
            mixpanel.identify(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            mixpanel.people.set(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserPropertiesOnce(properties) {
        try {
            mixpanel.people.set_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperProperties(properties) {
        try {
            mixpanel.register(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperPropertiesOnce(properties) {
        try {
            mixpanel.register_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setAlias(alias) {
        try {
            mixpanel.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Mixpanel.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Mixpanel.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-mixpanel.js.map