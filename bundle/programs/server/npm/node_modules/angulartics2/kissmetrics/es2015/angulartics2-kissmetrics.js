import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Kissmetrics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (_kmq) === 'undefined') {
            _kmq = [];
        }
        this.angulartics2.pageTrack.subscribe((x) => this.pageTrack(x.path, x.location));
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    pageTrack(path, location) {
        _kmq.push(['record', 'Pageview', { 'Page': path }]);
    }
    eventTrack(action, properties) {
        _kmq.push(['record', action, properties]);
    }
    setUsername(userId) {
        _kmq.push(['identify', userId]);
    }
    setUserProperties(properties) {
        _kmq.push(['set', properties]);
    }
}
Angulartics2Kissmetrics.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Kissmetrics.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-kissmetrics.js.map