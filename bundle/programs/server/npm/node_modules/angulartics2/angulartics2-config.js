var DefaultConfig = (function () {
    function DefaultConfig() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
    }
    return DefaultConfig;
}());
export { DefaultConfig };
//# sourceMappingURL=angulartics2-config.js.map