import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
export class Angulartics2Facebook {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.eventTrack.subscribe((x) => this.eventTrack(x.action, x.properties));
    }
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action Required action associated with the event
     * @param properties
     */
    eventTrack(action, properties) {
        properties = properties || {};
        const eventList = [
            'ViewContent',
            'Search',
            'AddToCart',
            'AddToWishlist',
            'InitiateCheckout',
            'AddPaymentInfo',
            'Purchase',
            'Lead',
            'CompleteRegistration'
        ];
        if (typeof fbq !== 'undefined' && fbq) {
            eventList.indexOf(action) === -1 ?
                fbq('trackCustom', action, properties) :
                fbq('track', action, properties);
        }
    }
}
Angulartics2Facebook.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Angulartics2Facebook.ctorParameters = () => [
    { type: Angulartics2, },
];
//# sourceMappingURL=angulartics2-facebook.js.map