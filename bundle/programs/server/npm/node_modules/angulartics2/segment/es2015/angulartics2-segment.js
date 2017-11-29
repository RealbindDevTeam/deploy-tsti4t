import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Segment {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setAlias.subscribe((x) => this.setAlias(x));
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    pageTrack(path, location) {
        // TODO : Support optional parameters where the parameter order and type changes their meaning
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    eventTrack(action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    setUserProperties(properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    setAlias(alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Segment.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Segment.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-segment.js.map