'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AgmCoreModule = undefined;
exports.coreDirectives = coreDirectives;

var _core = require('@angular/core');

var _map = require('./directives/map');

var _circle = require('./directives/circle');

var _infoWindow = require('./directives/info-window');

var _marker = require('./directives/marker');

var _polygon = require('./directives/polygon');

var _polyline = require('./directives/polyline');

var _polylinePoint = require('./directives/polyline-point');

var _kmlLayer = require('./directives/kml-layer');

var _dataLayer = require('./directives/data-layer');

var _lazyMapsApiLoader = require('./services/maps-api-loader/lazy-maps-api-loader');

var _mapsApiLoader = require('./services/maps-api-loader/maps-api-loader');

var _browserGlobals = require('./utils/browser-globals');

/**
 * @internal
 */
function coreDirectives() {
    return [_map.AgmMap, _marker.AgmMarker, _infoWindow.AgmInfoWindow, _circle.AgmCircle, _polygon.AgmPolygon, _polyline.AgmPolyline, _polylinePoint.AgmPolylinePoint, _kmlLayer.AgmKmlLayer, _dataLayer.AgmDataLayer];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = function () {
    function AgmCoreModule() {}
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: _browserGlobals.BROWSER_GLOBALS_PROVIDERS.concat([{ provide: _mapsApiLoader.MapsAPILoader, useClass: _lazyMapsApiLoader.LazyMapsAPILoader }, { provide: _lazyMapsApiLoader.LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }])
        };
    };
    return AgmCoreModule;
}();
exports.AgmCoreModule = AgmCoreModule;

AgmCoreModule.decorators = [{ type: _core.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() }] }];
/** @nocollapse */
AgmCoreModule.ctorParameters = function () {
    return [];
};
//# sourceMappingURL=core.module.js.map