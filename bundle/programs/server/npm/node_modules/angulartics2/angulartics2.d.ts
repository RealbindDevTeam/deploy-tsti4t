import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Angulartics2Settings } from './angulartics2-config';
import { Angulartics2Token } from './angulartics2-token';
export declare class Angulartics2 {
    settings: Angulartics2Settings;
    pageTrack: ReplaySubject<{
        path?: string;
        location?: Location;
    }>;
    eventTrack: ReplaySubject<any>;
    exceptionTrack: ReplaySubject<any>;
    setAlias: ReplaySubject<string>;
    setUsername: ReplaySubject<string | {
        userId: string | number;
    }>;
    setUserProperties: ReplaySubject<any>;
    setUserPropertiesOnce: ReplaySubject<any>;
    setSuperProperties: ReplaySubject<any>;
    setSuperPropertiesOnce: ReplaySubject<any>;
    userTimings: ReplaySubject<any>;
    constructor(location: Location, router: Router, setup: Angulartics2Token);
    trackLocation(location: Location, router: Router): void;
    virtualPageviews(value: boolean): void;
    excludeRoutes(routes: Array<string | RegExp>): void;
    withBase(value: string): void;
    clearIds(value: boolean): void;
    developerMode(value: boolean): void;
    protected trackUrlChange(url: string, location: Location): void;
    protected matchesExcludedRoute(url: string): boolean;
    protected clearUrl(url: string): string;
}
