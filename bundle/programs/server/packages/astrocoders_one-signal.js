(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var SentNotifications, OneSignal;

var require = meteorInstall({"node_modules":{"meteor":{"astrocoders:one-signal":{"lib":{"one_signal.js":["babel-runtime/helpers/extends",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/astrocoders_one-signal/lib/one_signal.js                                              //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _extends2 = require("babel-runtime/helpers/extends");                                         //
                                                                                                  //
var _extends3 = _interopRequireDefault(_extends2);                                                //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
SentNotifications = new Mongo.Collection('oneSignalNotifications');                               // 1
OneSignal = {                                                                                     // 3
  _base: 'https://onesignal.com/api/v1/',                                                         // 4
  send: function (method, api, data) {                                                            // 5
    var url = this._base + "/" + api;                                                             // 6
    var apiKey = Meteor.settings.oneSignal.apiKey;                                                // 5
    return HTTP.call(method, url, {                                                               // 9
      data: data,                                                                                 // 10
      headers: {                                                                                  // 11
        Authorization: "Basic " + apiKey                                                          // 12
      }                                                                                           // 11
    });                                                                                           // 9
  }                                                                                               // 15
};                                                                                                // 3
OneSignal.Notifications = {                                                                       // 18
  _api: 'notifications',                                                                          // 19
  create: function (players, data) {                                                              // 20
    var url = "" + this._api;                                                                     // 21
    var appId = Meteor.settings.oneSignal.appId;                                                  // 20
    SentNotifications.insert((0, _extends3.default)({}, data, {                                   // 24
      createdAt: new Date()                                                                       // 26
    }));                                                                                          // 24
    return OneSignal.send('POST', url, (0, _extends3.default)({}, data, {                         // 29
      app_id: appId,                                                                              // 31
      include_player_ids: players                                                                 // 32
    }));                                                                                          // 29
  }                                                                                               // 34
};                                                                                                // 18
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/astrocoders:one-signal/lib/one_signal.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['astrocoders:one-signal'] = {}, {
  OneSignal: OneSignal,
  SentNotifications: SentNotifications
});

})();

//# sourceMappingURL=astrocoders_one-signal.js.map
