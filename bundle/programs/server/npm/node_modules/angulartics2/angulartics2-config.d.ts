export interface GoogleAnalyticsSettings {
    additionalAccountNames: string[];
    userId: any;
    transport: string;
}
export interface AppInsightsSettings {
    userId: string;
}
export interface GoogleTagManagerSettings {
    userId: any;
}
export interface PageTrackingSettings {
    autoTrackVirtualPages: boolean;
    basePath: string;
    excludedRoutes: (string | RegExp)[];
    clearIds: boolean;
}
export interface Angulartics2Settings {
    pageTracking: Partial<PageTrackingSettings>;
    developerMode: boolean;
    ga: Partial<GoogleAnalyticsSettings>;
    appInsights: Partial<AppInsightsSettings>;
    gtm: Partial<GoogleTagManagerSettings>;
}
export declare class DefaultConfig implements Angulartics2Settings {
    pageTracking: {
        autoTrackVirtualPages: boolean;
        basePath: string;
        excludedRoutes: any[];
        clearIds: boolean;
    };
    developerMode: boolean;
    ga: {};
    appInsights: {};
    gtm: {};
}
