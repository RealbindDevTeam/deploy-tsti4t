'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KmlLayerManager = undefined;

var _core = require('@angular/core');

var _Observable = require('rxjs/Observable');

var _googleMapsApiWrapper = require('./../google-maps-api-wrapper');

/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    KmlLayerManager.prototype.addKmlLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex
            });
        });
        this._layers.set(layer, newLayer);
    };
    KmlLayerManager.prototype.setOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) {
            return l.setOptions(options);
        });
    };
    KmlLayerManager.prototype.deleteKmlLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    KmlLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return _Observable.Observable.create(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) {
                    return _this._zone.run(function () {
                        return observer.next(e);
                    });
                });
            });
        });
    };
    return KmlLayerManager;
}();
exports.KmlLayerManager = KmlLayerManager;

KmlLayerManager.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
KmlLayerManager.ctorParameters = function () {
    return [{ type: _googleMapsApiWrapper.GoogleMapsAPIWrapper }, { type: _core.NgZone }];
};
//# sourceMappingURL=kml-layer-manager.js.map