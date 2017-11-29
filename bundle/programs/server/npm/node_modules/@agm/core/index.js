'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directives = require('./directives');

Object.keys(_directives).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _directives[key];
    }
  });
});

var _services = require('./services');

Object.keys(_services).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _services[key];
    }
  });
});

var _core = require('./core.module');

Object.defineProperty(exports, 'AgmCoreModule', {
  enumerable: true,
  get: function get() {
    return _core.AgmCoreModule;
  }
});