'use strict';

var _testing = require('@angular/core/testing');

var _browserGlobals = require('../../utils/browser-globals');

var _lazyMapsApiLoader = require('./lazy-maps-api-loader');

var _mapsApiLoader = require('./maps-api-loader');

describe('Service: LazyMapsAPILoader', function () {
    var documentRef;
    var doc;
    var windowRef;
    beforeEach(function () {
        doc = jasmine.createSpyObj('Document', ['createElement']);
        documentRef = jasmine.createSpyObj('Document', ['getNativeDocument']);
        documentRef.getNativeDocument.and.returnValue(doc);
        windowRef = {};
    });
    it('should create the default script URL', function () {
        _testing.TestBed.configureTestingModule({
            providers: [{ provide: _mapsApiLoader.MapsAPILoader, useClass: _lazyMapsApiLoader.LazyMapsAPILoader }, { provide: _browserGlobals.WindowRef, useValue: windowRef }, { provide: _browserGlobals.DocumentRef, useValue: documentRef }]
        });
        (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.type).toEqual('text/javascript');
            expect(scriptElem.async).toEqual(true);
            expect(scriptElem.defer).toEqual(true);
            expect(scriptElem.src).toBeDefined();
            expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
            expect(scriptElem.src).toContain('v=3');
            expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
    it('should load the script via http when provided', function () {
        var lazyLoadingConf = { protocol: _lazyMapsApiLoader.GoogleMapsScriptProtocol.HTTP };
        _testing.TestBed.configureTestingModule({
            providers: [{ provide: _mapsApiLoader.MapsAPILoader, useClass: _lazyMapsApiLoader.LazyMapsAPILoader }, { provide: _browserGlobals.WindowRef, useValue: windowRef }, { provide: _browserGlobals.DocumentRef, useValue: documentRef }, { provide: _lazyMapsApiLoader.LAZY_MAPS_API_CONFIG, useValue: lazyLoadingConf }]
        });
        (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
            var scriptElem = {};
            doc.createElement.and.returnValue(scriptElem);
            doc.body = jasmine.createSpyObj('body', ['appendChild']);
            loader.load();
            expect(doc.createElement).toHaveBeenCalled();
            expect(scriptElem.src).toContain('http://maps.googleapis.com/maps/api/js');
            expect(scriptElem.src).toContain('v=3');
            expect(scriptElem.src).toContain('callback=angular2GoogleMapsLazyMapsAPILoader');
            expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
        });
    });
});
//# sourceMappingURL=lazy-maps-api-loader.spec.js.map