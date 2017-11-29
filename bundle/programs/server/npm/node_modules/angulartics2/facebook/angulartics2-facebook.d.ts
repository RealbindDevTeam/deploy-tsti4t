import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2Facebook {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action Required action associated with the event
     * @param properties
     */
    eventTrack(action: string, properties: any): void;
}
