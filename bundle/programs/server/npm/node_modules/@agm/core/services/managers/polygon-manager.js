'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PolygonManager = undefined;

var _core = require('@angular/core');

var _Observable = require('rxjs/Observable');

var _googleMapsApiWrapper = require('../google-maps-api-wrapper');

var PolygonManager = function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setPaths(polygon.paths);
            });
        });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) {
            l.setOptions(options);
        });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return _Observable.Observable.create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) {
                    return _this._zone.run(function () {
                        return observer.next(e);
                    });
                });
            });
        });
    };
    return PolygonManager;
}();
exports.PolygonManager = PolygonManager;

PolygonManager.decorators = [{ type: _core.Injectable }];
/** @nocollapse */
PolygonManager.ctorParameters = function () {
    return [{ type: _googleMapsApiWrapper.GoogleMapsAPIWrapper }, { type: _core.NgZone }];
};
//# sourceMappingURL=polygon-manager.js.map