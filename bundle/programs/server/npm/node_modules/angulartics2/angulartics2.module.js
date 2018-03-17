import { NgModule, } from '@angular/core';
import { Angulartics2 } from './angulartics2';
import { Angulartics2On } from './angulartics2On';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
var Angulartics2Module = (function () {
    function Angulartics2Module() {
    }
    Angulartics2Module.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                Angulartics2
            ].concat(providers),
        };
    };
    Angulartics2Module.decorators = [
        { type: NgModule, args: [{
                    declarations: [Angulartics2On],
                    exports: [Angulartics2On],
                },] },
    ];
    Angulartics2Module.ctorParameters = function () { return []; };
    return Angulartics2Module;
}());
export { Angulartics2Module };
//# sourceMappingURL=angulartics2.module.js.map