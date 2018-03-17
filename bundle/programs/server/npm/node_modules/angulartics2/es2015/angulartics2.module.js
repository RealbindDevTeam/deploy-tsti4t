import { NgModule, } from '@angular/core';
import { Angulartics2 } from './angulartics2';
import { Angulartics2On } from './angulartics2On';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
export class Angulartics2Module {
    static forRoot(providers, settings = {}) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { providers, settings } },
                Angulartics2,
                ...providers,
            ],
        };
    }
}
Angulartics2Module.decorators = [
    { type: NgModule, args: [{
                declarations: [Angulartics2On],
                exports: [Angulartics2On],
            },] },
];
Angulartics2Module.ctorParameters = () => [];
//# sourceMappingURL=angulartics2.module.js.map