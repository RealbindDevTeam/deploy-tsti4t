(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var process = Package.modules.process;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var Logger, TypeScriptCompiler, TypeScript;

var require = meteorInstall({"node_modules":{"meteor":{"barbatus:typescript-compiler":{"logger.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/createClass",function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/barbatus_typescript-compiler/logger.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
var _createClass2 = require("babel-runtime/helpers/createClass");                                                     //
                                                                                                                      //
var _createClass3 = _interopRequireDefault(_createClass2);                                                            //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var util = Npm.require('util');                                                                                       // 1
                                                                                                                      //
var Logger_ = function () {                                                                                           //
  function Logger_() {                                                                                                // 4
    (0, _classCallCheck3.default)(this, Logger_);                                                                     // 4
    this.llevel = process.env.TYPESCRIPT_LOG;                                                                         // 5
  }                                                                                                                   // 6
                                                                                                                      //
  Logger_.prototype.newProfiler = function () {                                                                       //
    function newProfiler(name) {                                                                                      //
      var profiler = new Profiler(name);                                                                              // 9
      if (this.isProfile) profiler.start();                                                                           // 10
      return profiler;                                                                                                // 11
    }                                                                                                                 // 12
                                                                                                                      //
    return newProfiler;                                                                                               //
  }();                                                                                                                //
                                                                                                                      //
  Logger_.prototype.log = function () {                                                                               //
    function log(msg) {                                                                                               //
      if (this.llevel >= 1) {                                                                                         // 27
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {     // 27
          args[_key - 1] = arguments[_key];                                                                           // 26
        }                                                                                                             // 27
                                                                                                                      //
        console.log.apply(null, [msg].concat(args));                                                                  // 28
      }                                                                                                               // 29
    }                                                                                                                 // 30
                                                                                                                      //
    return log;                                                                                                       //
  }();                                                                                                                //
                                                                                                                      //
  Logger_.prototype.debug = function () {                                                                             //
    function debug(msg) {                                                                                             //
      if (this.isDebug) {                                                                                             // 33
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];                                                                         // 32
        }                                                                                                             // 33
                                                                                                                      //
        this.log.apply(this, msg, args);                                                                              // 34
      }                                                                                                               // 35
    }                                                                                                                 // 36
                                                                                                                      //
    return debug;                                                                                                     //
  }();                                                                                                                //
                                                                                                                      //
  Logger_.prototype.assert = function () {                                                                            //
    function assert(msg) {                                                                                            //
      if (this.isAssert) {                                                                                            // 39
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];                                                                         // 38
        }                                                                                                             // 39
                                                                                                                      //
        this.log.apply(this, msg, args);                                                                              // 40
      }                                                                                                               // 41
    }                                                                                                                 // 42
                                                                                                                      //
    return assert;                                                                                                    //
  }();                                                                                                                //
                                                                                                                      //
  (0, _createClass3.default)(Logger_, [{                                                                              //
    key: "isDebug",                                                                                                   //
    get: function () {                                                                                                //
      return this.llevel >= 2;                                                                                        // 15
    }                                                                                                                 // 16
  }, {                                                                                                                //
    key: "isProfile",                                                                                                 //
    get: function () {                                                                                                //
      return this.llevel >= 3;                                                                                        // 19
    }                                                                                                                 // 20
  }, {                                                                                                                //
    key: "isAssert",                                                                                                  //
    get: function () {                                                                                                //
      return this.llevel >= 4;                                                                                        // 23
    }                                                                                                                 // 24
  }]);                                                                                                                //
  return Logger_;                                                                                                     //
}();                                                                                                                  //
                                                                                                                      //
;                                                                                                                     // 43
Logger = new Logger_();                                                                                               // 45
                                                                                                                      //
var Profiler = function () {                                                                                          //
  function Profiler(name) {                                                                                           // 48
    (0, _classCallCheck3.default)(this, Profiler);                                                                    // 48
    this.name = name;                                                                                                 // 49
  }                                                                                                                   // 50
                                                                                                                      //
  Profiler.prototype.start = function () {                                                                            //
    function start() {                                                                                                //
      console.log('%s started', this.name);                                                                           // 53
      console.time(util.format('%s time', this.name));                                                                // 54
      this._started = true;                                                                                           // 55
    }                                                                                                                 // 56
                                                                                                                      //
    return start;                                                                                                     //
  }();                                                                                                                //
                                                                                                                      //
  Profiler.prototype.end = function () {                                                                              //
    function end() {                                                                                                  //
      if (this._started) {                                                                                            // 59
        console.timeEnd(util.format('%s time', this.name));                                                           // 60
      }                                                                                                               // 61
    }                                                                                                                 // 62
                                                                                                                      //
    return end;                                                                                                       //
  }();                                                                                                                //
                                                                                                                      //
  return Profiler;                                                                                                    //
}();                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"file-utils.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/barbatus_typescript-compiler/file-utils.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
  isBare: function () {                                                                                               // 1
    return isBare;                                                                                                    // 1
  },                                                                                                                  // 1
  isMainConfig: function () {                                                                                         // 1
    return isMainConfig;                                                                                              // 1
  },                                                                                                                  // 1
  isConfig: function () {                                                                                             // 1
    return isConfig;                                                                                                  // 1
  },                                                                                                                  // 1
  isServerConfig: function () {                                                                                       // 1
    return isServerConfig;                                                                                            // 1
  },                                                                                                                  // 1
  isDeclaration: function () {                                                                                        // 1
    return isDeclaration;                                                                                             // 1
  },                                                                                                                  // 1
  isWeb: function () {                                                                                                // 1
    return isWeb;                                                                                                     // 1
  },                                                                                                                  // 1
  getExtendedPath: function () {                                                                                      // 1
    return getExtendedPath;                                                                                           // 1
  },                                                                                                                  // 1
  getES6ModuleName: function () {                                                                                     // 1
    return getES6ModuleName;                                                                                          // 1
  },                                                                                                                  // 1
  WarnMixin: function () {                                                                                            // 1
    return WarnMixin;                                                                                                 // 1
  },                                                                                                                  // 1
  extendFiles: function () {                                                                                          // 1
    return extendFiles;                                                                                               // 1
  }                                                                                                                   // 1
});                                                                                                                   // 1
                                                                                                                      //
var colors = Npm.require('colors');                                                                                   // 1
                                                                                                                      //
function isBare(inputFile) {                                                                                          // 3
  var fileOptions = inputFile.getFileOptions();                                                                       // 4
  return fileOptions && fileOptions.bare;                                                                             // 5
}                                                                                                                     // 6
                                                                                                                      //
function isMainConfig(inputFile) {                                                                                    // 9
  if (!isWeb(inputFile)) return false;                                                                                // 10
  var filePath = inputFile.getPathInPackage();                                                                        // 12
  return (/^tsconfig\.json$/.test(filePath)                                                                           // 13
  );                                                                                                                  // 13
}                                                                                                                     // 14
                                                                                                                      //
function isConfig(inputFile) {                                                                                        // 16
  var filePath = inputFile.getPathInPackage();                                                                        // 17
  return (/tsconfig\.json$/.test(filePath)                                                                            // 18
  );                                                                                                                  // 18
}                                                                                                                     // 19
                                                                                                                      //
function isServerConfig(inputFile) {                                                                                  // 22
  if (isWeb(inputFile)) return false;                                                                                 // 23
  var filePath = inputFile.getPathInPackage();                                                                        // 25
  return (/^server\/tsconfig\.json$/.test(filePath)                                                                   // 26
  );                                                                                                                  // 26
}                                                                                                                     // 27
                                                                                                                      //
function isDeclaration(inputFile) {                                                                                   // 30
  return TypeScript.isDeclarationFile(inputFile.getBasename());                                                       // 31
}                                                                                                                     // 32
                                                                                                                      //
function isWeb(inputFile) {                                                                                           // 34
  var arch = inputFile.getArch();                                                                                     // 35
  return (/^web/.test(arch)                                                                                           // 36
  );                                                                                                                  // 36
}                                                                                                                     // 37
                                                                                                                      //
function getExtendedPath(inputFile) {                                                                                 // 40
  var packageName = inputFile.getPackageName();                                                                       // 41
  packageName = packageName ? packageName.replace(':', '_') + '/' : '';                                               // 42
  var inputFilePath = inputFile.getPathInPackage();                                                                   // 44
  return packageName + inputFilePath;                                                                                 // 45
}                                                                                                                     // 46
                                                                                                                      //
function getES6ModuleName(inputFile) {                                                                                // 48
  var extended = getExtendedPath(inputFile);                                                                          // 49
  return TypeScript.removeTsExt(extended);                                                                            // 50
}                                                                                                                     // 51
                                                                                                                      //
var WarnMixin = {                                                                                                     // 53
  warn: function (error) {                                                                                            // 54
    console.log(error.sourcePath + " (" + error.line + ", " + error.column + "): " + error.message);                  // 55
  },                                                                                                                  // 56
  logError: function (error) {                                                                                        // 57
    console.log(colors.red(error.sourcePath + " (" + error.line + ", " + error.column + "): " + error.message));      // 58
  }                                                                                                                   // 60
};                                                                                                                    // 53
                                                                                                                      //
function extendFiles(inputFiles, fileMixin) {                                                                         // 63
  inputFiles.forEach(function (inputFile) {                                                                           // 64
    return _.defaults(inputFile, fileMixin);                                                                          // 64
  });                                                                                                                 // 64
}                                                                                                                     // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"typescript-compiler.js":["babel-runtime/helpers/classCallCheck","./file-utils","./utils",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/barbatus_typescript-compiler/typescript-compiler.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                               //
                                                                                                                      //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var getExtendedPath = void 0,                                                                                         // 1
    isDeclaration = void 0,                                                                                           // 1
    isConfig = void 0,                                                                                                // 1
    isMainConfig = void 0,                                                                                            // 1
    isServerConfig = void 0,                                                                                          // 1
    isBare = void 0,                                                                                                  // 1
    getES6ModuleName = void 0,                                                                                        // 1
    WarnMixin = void 0,                                                                                               // 1
    extendFiles = void 0,                                                                                             // 1
    isWeb = void 0;                                                                                                   // 1
module.watch(require("./file-utils"), {                                                                               // 1
  getExtendedPath: function (v) {                                                                                     // 1
    getExtendedPath = v;                                                                                              // 1
  },                                                                                                                  // 1
  isDeclaration: function (v) {                                                                                       // 1
    isDeclaration = v;                                                                                                // 1
  },                                                                                                                  // 1
  isConfig: function (v) {                                                                                            // 1
    isConfig = v;                                                                                                     // 1
  },                                                                                                                  // 1
  isMainConfig: function (v) {                                                                                        // 1
    isMainConfig = v;                                                                                                 // 1
  },                                                                                                                  // 1
  isServerConfig: function (v) {                                                                                      // 1
    isServerConfig = v;                                                                                               // 1
  },                                                                                                                  // 1
  isBare: function (v) {                                                                                              // 1
    isBare = v;                                                                                                       // 1
  },                                                                                                                  // 1
  getES6ModuleName: function (v) {                                                                                    // 1
    getES6ModuleName = v;                                                                                             // 1
  },                                                                                                                  // 1
  WarnMixin: function (v) {                                                                                           // 1
    WarnMixin = v;                                                                                                    // 1
  },                                                                                                                  // 1
  extendFiles: function (v) {                                                                                         // 1
    extendFiles = v;                                                                                                  // 1
  },                                                                                                                  // 1
  isWeb: function (v) {                                                                                               // 1
    isWeb = v;                                                                                                        // 1
  }                                                                                                                   // 1
}, 0);                                                                                                                // 1
var getShallowHash = void 0;                                                                                          // 1
module.watch(require("./utils"), {                                                                                    // 1
  getShallowHash: function (v) {                                                                                      // 1
    getShallowHash = v;                                                                                               // 1
  }                                                                                                                   // 1
}, 1);                                                                                                                // 1
                                                                                                                      //
var async = Npm.require('async');                                                                                     // 1
                                                                                                                      //
var path = Npm.require('path');                                                                                       // 2
                                                                                                                      //
var fs = Npm.require('fs');                                                                                           // 3
                                                                                                                      //
var Future = Npm.require('fibers/future');                                                                            // 4
                                                                                                                      //
var _Npm$require = Npm.require('meteor-typescript'),                                                                  //
    TSBuild = _Npm$require.TSBuild,                                                                                   //
    validateTsConfig = _Npm$require.validateTsConfig,                                                                 //
    getExcludeRegExp = _Npm$require.getExcludeRegExp;                                                                 //
                                                                                                                      //
var _Npm$require2 = Npm.require('crypto'),                                                                            //
    createHash = _Npm$require2.createHash;                                                                            //
                                                                                                                      //
// Default exclude paths.                                                                                             // 31
var defExclude = new RegExp(getExcludeRegExp(['node_modules/**'])); // What to exclude when compiling for the server.
// typings/main and typings/browser seem to be not used                                                               // 36
// at all but let keep them for just in case.                                                                         // 37
                                                                                                                      //
var exlWebRegExp = new RegExp(getExcludeRegExp(['typings/main/**', 'typings/main.d.ts'])); // What to exclude when compiling for the client.
                                                                                                                      //
var exlMainRegExp = new RegExp(getExcludeRegExp(['typings/browser/**', 'typings/browser.d.ts']));                     // 42
var COMPILER_REGEXP = /(\.d.ts|\.ts|\.tsx|\.tsconfig)$/;                                                              // 45
                                                                                                                      //
TypeScriptCompiler = function () {                                                                                    // 47
  function TypeScriptCompiler(extraOptions, maxParallelism) {                                                         // 48
    (0, _classCallCheck3.default)(this, TypeScriptCompiler);                                                          // 48
    TypeScript.validateExtraOptions(extraOptions);                                                                    // 49
    this.extraOptions = extraOptions;                                                                                 // 51
    this.maxParallelism = maxParallelism || 10;                                                                       // 52
    this.serverOptions = null;                                                                                        // 53
    this.tsconfig = TypeScript.getDefaultOptions();                                                                   // 54
    this.cfgHash = null;                                                                                              // 55
    this.diagHash = new Set();                                                                                        // 56
    this.archSet = new Set();                                                                                         // 57
  }                                                                                                                   // 58
                                                                                                                      //
  TypeScriptCompiler.prototype.getFilesToProcess = function () {                                                      // 47
    function getFilesToProcess(inputFiles) {                                                                          // 47
      var pexclude = Logger.newProfiler('exclude');                                                                   // 61
      inputFiles = this._filterByDefault(inputFiles);                                                                 // 63
                                                                                                                      //
      this._processConfig(inputFiles);                                                                                // 65
                                                                                                                      //
      inputFiles = this._filterByConfig(inputFiles);                                                                  // 67
                                                                                                                      //
      if (inputFiles.length) {                                                                                        // 69
        var arch = inputFiles[0].getArch();                                                                           // 70
        inputFiles = this._filterByArch(inputFiles, arch);                                                            // 71
      }                                                                                                               // 72
                                                                                                                      //
      pexclude.end();                                                                                                 // 74
      return inputFiles;                                                                                              // 76
    }                                                                                                                 // 77
                                                                                                                      //
    return getFilesToProcess;                                                                                         // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype.getBuildOptions = function () {                                                        // 47
    function getBuildOptions(inputFiles) {                                                                            // 47
      this._processConfig(inputFiles);                                                                                // 80
                                                                                                                      //
      var inputFile = inputFiles[0];                                                                                  // 82
      var compilerOptions = this.tsconfig.compilerOptions; // Make a copy.                                            // 79
                                                                                                                      //
      compilerOptions = Object.assign({}, compilerOptions);                                                           // 85
                                                                                                                      //
      if (!isWeb(inputFile) && this.serverOptions) {                                                                  // 86
        Object.assign(compilerOptions, this.serverOptions);                                                           // 87
      } // Apply extra options.                                                                                       // 88
                                                                                                                      //
                                                                                                                      //
      if (this.extraOptions) {                                                                                        // 91
        Object.assign(compilerOptions, this.extraOptions);                                                            // 92
      }                                                                                                               // 93
                                                                                                                      //
      var arch = inputFile.getArch();                                                                                 // 95
      var _tsconfig = this.tsconfig,                                                                                  // 79
          typings = _tsconfig.typings,                                                                                // 79
          useCache = _tsconfig.useCache;                                                                              // 79
      return {                                                                                                        // 97
        arch: arch,                                                                                                   // 97
        compilerOptions: compilerOptions,                                                                             // 97
        typings: typings,                                                                                             // 97
        useCache: useCache                                                                                            // 97
      };                                                                                                              // 97
    }                                                                                                                 // 98
                                                                                                                      //
    return getBuildOptions;                                                                                           // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype.processFilesForTarget = function () {                                                  // 47
    function processFilesForTarget(inputFiles, getDepsContent) {                                                      // 47
      var _this = this;                                                                                               // 100
                                                                                                                      //
      extendFiles(inputFiles, WarnMixin);                                                                             // 101
      var options = this.getBuildOptions(inputFiles);                                                                 // 103
      Logger.log('compiler options: %j', options.compilerOptions);                                                    // 104
      inputFiles = this.getFilesToProcess(inputFiles);                                                                // 106
      if (!inputFiles.length) return;                                                                                 // 108
      var pcompile = Logger.newProfiler('compilation');                                                               // 110
      var filePaths = inputFiles.map(function (file) {                                                                // 111
        return getExtendedPath(file);                                                                                 // 111
      });                                                                                                             // 111
      Logger.log('compile files: %s', filePaths);                                                                     // 112
      var pbuild = Logger.newProfiler('tsBuild');                                                                     // 114
                                                                                                                      //
      var defaultGet = this._getContentGetter(inputFiles);                                                            // 115
                                                                                                                      //
      var getContent = function (filePath) {                                                                          // 116
        return getDepsContent && getDepsContent(filePath) || defaultGet(filePath);                                    // 116
      };                                                                                                              // 116
                                                                                                                      //
      var tsBuild = new TSBuild(filePaths, getContent, options);                                                      // 118
      pbuild.end();                                                                                                   // 119
      var pfiles = Logger.newProfiler('tsEmitFiles');                                                                 // 121
      var future = new Future(); // Don't emit typings.                                                               // 122
                                                                                                                      //
      var compileFiles = inputFiles.filter(function (file) {                                                          // 124
        return !isDeclaration(file);                                                                                  // 124
      });                                                                                                             // 124
      var throwSyntax = false;                                                                                        // 125
      var results = new Map();                                                                                        // 126
      async.eachLimit(compileFiles, this.maxParallelism, function (file, done) {                                      // 127
        var co = options.compilerOptions;                                                                             // 128
        var filePath = getExtendedPath(file);                                                                         // 130
        var pemit = Logger.newProfiler('tsEmit');                                                                     // 131
        var result = tsBuild.emit(filePath);                                                                          // 132
        results.set(file, result);                                                                                    // 133
        pemit.end();                                                                                                  // 134
        throwSyntax = throwSyntax | _this._processDiagnostics(file, result.diagnostics, co);                          // 136
        done();                                                                                                       // 139
      }, future.resolver());                                                                                          // 140
      pfiles.end();                                                                                                   // 142
      future.wait();                                                                                                  // 144
                                                                                                                      //
      if (!throwSyntax) {                                                                                             // 146
        results.forEach(function (result, file) {                                                                     // 147
          var module = options.compilerOptions.module;                                                                // 148
                                                                                                                      //
          _this._addJavaScript(file, result, module === 'none');                                                      // 149
        });                                                                                                           // 150
      }                                                                                                               // 151
                                                                                                                      //
      pcompile.end();                                                                                                 // 153
    }                                                                                                                 // 154
                                                                                                                      //
    return processFilesForTarget;                                                                                     // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._getContentGetter = function () {                                                      // 47
    function _getContentGetter(inputFiles) {                                                                          // 47
      var filesMap = new Map();                                                                                       // 157
      inputFiles.forEach(function (inputFile, index) {                                                                // 158
        filesMap.set(getExtendedPath(inputFile), index);                                                              // 159
      });                                                                                                             // 160
      return function (filePath) {                                                                                    // 162
        var index = filesMap.get(filePath);                                                                           // 163
                                                                                                                      //
        if (index === undefined) {                                                                                    // 164
          var filePathNoRootSlash = filePath.replace(/^\//, '');                                                      // 165
          index = filesMap.get(filePathNoRootSlash);                                                                  // 166
        }                                                                                                             // 167
                                                                                                                      //
        return index !== undefined ? inputFiles[index].getContentsAsString() : null;                                  // 168
      };                                                                                                              // 170
    }                                                                                                                 // 171
                                                                                                                      //
    return _getContentGetter;                                                                                         // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._addJavaScript = function () {                                                         // 47
    function _addJavaScript(inputFile, tsResult, forceBare) {                                                         // 47
      var source = inputFile.getContentsAsString();                                                                   // 174
      var inputPath = inputFile.getPathInPackage();                                                                   // 175
      var outputPath = TypeScript.removeTsExt(inputPath) + '.js';                                                     // 176
      var toBeAdded = {                                                                                               // 177
        sourcePath: inputPath,                                                                                        // 178
        path: outputPath,                                                                                             // 179
        data: tsResult.code,                                                                                          // 180
        hash: tsResult.hash,                                                                                          // 181
        sourceMap: tsResult.sourceMap,                                                                                // 182
        bare: forceBare || isBare(inputFile)                                                                          // 183
      };                                                                                                              // 177
      inputFile.addJavaScript(toBeAdded);                                                                             // 185
    }                                                                                                                 // 186
                                                                                                                      //
    return _addJavaScript;                                                                                            // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._processDiagnostics = function () {                                                    // 47
    function _processDiagnostics(inputFile, diagnostics, tsOptions) {                                                 // 47
      var _this2 = this;                                                                                              // 188
                                                                                                                      //
      // Remove duplicated warnings for shared files                                                                  // 189
      // by saving hashes of already shown warnings.                                                                  // 190
      var reduce = function (diagnostic, cb) {                                                                        // 191
        var dob = {                                                                                                   // 192
          message: diagnostic.message,                                                                                // 193
          sourcePath: getExtendedPath(inputFile),                                                                     // 194
          line: diagnostic.line,                                                                                      // 195
          column: diagnostic.column                                                                                   // 196
        };                                                                                                            // 192
        var arch = inputFile.getArch(); // TODO: find out how to get list of architectures.                           // 198
                                                                                                                      //
        _this2.archSet.add(arch);                                                                                     // 200
                                                                                                                      //
        var shown = false;                                                                                            // 202
                                                                                                                      //
        for (var _iterator = _this2.archSet.keys(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;                                                                                                   // 203
                                                                                                                      //
          if (_isArray) {                                                                                             // 203
            if (_i >= _iterator.length) break;                                                                        // 203
            _ref = _iterator[_i++];                                                                                   // 203
          } else {                                                                                                    // 203
            _i = _iterator.next();                                                                                    // 203
            if (_i.done) break;                                                                                       // 203
            _ref = _i.value;                                                                                          // 203
          }                                                                                                           // 203
                                                                                                                      //
          var key = _ref;                                                                                             // 203
                                                                                                                      //
          if (key !== arch) {                                                                                         // 204
            dob.arch = key;                                                                                           // 205
                                                                                                                      //
            var _hash = getShallowHash(dob);                                                                          // 206
                                                                                                                      //
            if (_this2.diagHash.has(_hash)) {                                                                         // 207
              shown = true;                                                                                           // 208
              break;                                                                                                  // 208
            }                                                                                                         // 209
          }                                                                                                           // 210
        }                                                                                                             // 211
                                                                                                                      //
        if (!shown) {                                                                                                 // 213
          dob.arch = arch;                                                                                            // 214
          var hash = getShallowHash(dob);                                                                             // 215
                                                                                                                      //
          _this2.diagHash.add(hash);                                                                                  // 216
                                                                                                                      //
          cb(dob);                                                                                                    // 217
        }                                                                                                             // 218
      }; // Always throw syntax errors.                                                                               // 219
                                                                                                                      //
                                                                                                                      //
      var throwSyntax = !!diagnostics.syntacticErrors.length;                                                         // 222
      diagnostics.syntacticErrors.forEach(function (diagnostic) {                                                     // 223
        reduce(diagnostic, function (dob) {                                                                           // 224
          inputFile.error(dob);                                                                                       // 225
        });                                                                                                           // 226
      });                                                                                                             // 227
      var packageName = inputFile.getPackageName();                                                                   // 229
      if (packageName) return throwSyntax; // And log out other errors except package files.                          // 230
                                                                                                                      //
      if (tsOptions && tsOptions.diagnostics) {                                                                       // 233
        diagnostics.semanticErrors.forEach(function (diagnostic) {                                                    // 234
          reduce(diagnostic, function (dob) {                                                                         // 235
            return inputFile.warn(dob);                                                                               // 235
          });                                                                                                         // 235
        });                                                                                                           // 236
      }                                                                                                               // 237
                                                                                                                      //
      return throwSyntax;                                                                                             // 239
    }                                                                                                                 // 240
                                                                                                                      //
    return _processDiagnostics;                                                                                       // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._getFileModuleName = function () {                                                     // 47
    function _getFileModuleName(inputFile, options) {                                                                 // 47
      if (options.module === 'none') return null;                                                                     // 243
      return getES6ModuleName(inputFile);                                                                             // 245
    }                                                                                                                 // 246
                                                                                                                      //
    return _getFileModuleName;                                                                                        // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._processConfig = function () {                                                         // 47
    function _processConfig(inputFiles) {                                                                             // 47
      for (var _iterator2 = inputFiles, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;                                                                                                    // 249
                                                                                                                      //
        if (_isArray2) {                                                                                              // 249
          if (_i2 >= _iterator2.length) break;                                                                        // 249
          _ref2 = _iterator2[_i2++];                                                                                  // 249
        } else {                                                                                                      // 249
          _i2 = _iterator2.next();                                                                                    // 249
          if (_i2.done) break;                                                                                        // 249
          _ref2 = _i2.value;                                                                                          // 249
        }                                                                                                             // 249
                                                                                                                      //
        var inputFile = _ref2;                                                                                        // 249
                                                                                                                      //
        // Parse root config.                                                                                         // 250
        if (isMainConfig(inputFile)) {                                                                                // 251
          var source = inputFile.getContentsAsString();                                                               // 252
          var hash = inputFile.getSourceHash(); // If hashes differ, create new tsconfig.                             // 253
                                                                                                                      //
          if (hash !== this.cfgHash) {                                                                                // 255
            this.tsconfig = this._parseConfig(source);                                                                // 256
            this.cfgHash = hash;                                                                                      // 257
          }                                                                                                           // 258
        } // Parse server config.                                                                                     // 259
        // Take only target and lib values.                                                                           // 262
                                                                                                                      //
                                                                                                                      //
        if (isServerConfig(inputFile)) {                                                                              // 263
          var _source = inputFile.getContentsAsString();                                                              // 264
                                                                                                                      //
          var _parseConfig2 = this._parseConfig(_source),                                                             // 263
              compilerOptions = _parseConfig2.compilerOptions;                                                        // 263
                                                                                                                      //
          if (compilerOptions) {                                                                                      // 266
            var target = compilerOptions.target,                                                                      // 266
                lib = compilerOptions.lib;                                                                            // 266
            this.serverOptions = {                                                                                    // 268
              target: target,                                                                                         // 268
              lib: lib                                                                                                // 268
            };                                                                                                        // 268
          }                                                                                                           // 269
        }                                                                                                             // 270
      }                                                                                                               // 271
    }                                                                                                                 // 272
                                                                                                                      //
    return _processConfig;                                                                                            // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._parseConfig = function () {                                                           // 47
    function _parseConfig(cfgContent) {                                                                               // 47
      var tsconfig = null;                                                                                            // 275
                                                                                                                      //
      try {                                                                                                           // 277
        tsconfig = JSON.parse(cfgContent);                                                                            // 278
        validateTsConfig(tsconfig);                                                                                   // 280
      } catch (err) {                                                                                                 // 281
        throw new Error("Format of the tsconfig is invalid: " + err);                                                 // 282
      }                                                                                                               // 283
                                                                                                                      //
      var exclude = tsconfig.exclude || [];                                                                           // 285
                                                                                                                      //
      try {                                                                                                           // 286
        var regExp = getExcludeRegExp(exclude);                                                                       // 287
        tsconfig.exclude = regExp && new RegExp(regExp);                                                              // 288
      } catch (err) {                                                                                                 // 289
        throw new Error("Format of an exclude path is invalid: " + err);                                              // 290
      }                                                                                                               // 291
                                                                                                                      //
      return tsconfig;                                                                                                // 293
    }                                                                                                                 // 294
                                                                                                                      //
    return _parseConfig;                                                                                              // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._filterByDefault = function () {                                                       // 47
    function _filterByDefault(inputFiles) {                                                                           // 47
      inputFiles = inputFiles.filter(function (inputFile) {                                                           // 297
        var path = inputFile.getPathInPackage();                                                                      // 298
        return COMPILER_REGEXP.test(path) && !defExclude.test('/' + path);                                            // 299
      });                                                                                                             // 300
      return inputFiles;                                                                                              // 301
    }                                                                                                                 // 302
                                                                                                                      //
    return _filterByDefault;                                                                                          // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._filterByConfig = function () {                                                        // 47
    function _filterByConfig(inputFiles) {                                                                            // 47
      var _this3 = this;                                                                                              // 304
                                                                                                                      //
      var resultFiles = inputFiles;                                                                                   // 305
                                                                                                                      //
      if (this.tsconfig.exclude) {                                                                                    // 306
        resultFiles = resultFiles.filter(function (inputFile) {                                                       // 307
          var path = inputFile.getPathInPackage(); // There seems to an issue with getRegularExpressionForWildcard:   // 308
          // result regexp always starts with /.                                                                      // 310
                                                                                                                      //
          return !_this3.tsconfig.exclude.test('/' + path);                                                           // 311
        });                                                                                                           // 312
      }                                                                                                               // 313
                                                                                                                      //
      return resultFiles;                                                                                             // 314
    }                                                                                                                 // 315
                                                                                                                      //
    return _filterByConfig;                                                                                           // 47
  }();                                                                                                                // 47
                                                                                                                      //
  TypeScriptCompiler.prototype._filterByArch = function () {                                                          // 47
    function _filterByArch(inputFiles, arch) {                                                                        // 47
      check(arch, String); /**                                                                                        // 318
                            * Include only typings that current arch needs,                                           //
                            * typings/main is for the server only and                                                 //
                            * typings/browser - for the client.                                                       //
                            */                                                                                        //
      var filterRegExp = /^web/.test(arch) ? exlWebRegExp : exlMainRegExp;                                            // 325
      inputFiles = inputFiles.filter(function (inputFile) {                                                           // 326
        var path = inputFile.getPathInPackage();                                                                      // 327
        return !filterRegExp.test('/' + path);                                                                        // 328
      });                                                                                                             // 329
      return inputFiles;                                                                                              // 331
    }                                                                                                                 // 332
                                                                                                                      //
    return _filterByArch;                                                                                             // 47
  }();                                                                                                                // 47
                                                                                                                      //
  return TypeScriptCompiler;                                                                                          // 47
}();                                                                                                                  // 47
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"typescript.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/barbatus_typescript-compiler/typescript.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var meteorTS = Npm.require('meteor-typescript');                                                                      // 1
                                                                                                                      //
TypeScript = {                                                                                                        // 3
  validateOptions: function (options) {                                                                               // 4
    if (!options) return;                                                                                             // 5
    meteorTS.validateAndConvertOptions(options);                                                                      // 7
  },                                                                                                                  // 8
  // Extra options are the same compiler options                                                                      // 10
  // but passed in the compiler constructor.                                                                          // 11
  validateExtraOptions: function (options) {                                                                          // 12
    if (!options) return;                                                                                             // 13
    meteorTS.validateAndConvertOptions({                                                                              // 15
      compilerOptions: options                                                                                        // 16
    });                                                                                                               // 15
  },                                                                                                                  // 18
  getDefaultOptions: meteorTS.getDefaultOptions,                                                                      // 20
  compile: function (source, options) {                                                                               // 22
    options = options || meteorTS.getDefaultOptions();                                                                // 23
    return meteorTS.compile(source, options);                                                                         // 24
  },                                                                                                                  // 25
  setCacheDir: function (cacheDir) {                                                                                  // 27
    meteorTS.setCacheDir(cacheDir);                                                                                   // 28
  },                                                                                                                  // 29
  isDeclarationFile: function (filePath) {                                                                            // 31
    return (/^.*\.d\.ts$/.test(filePath)                                                                              // 32
    );                                                                                                                // 32
  },                                                                                                                  // 33
  removeTsExt: function (path) {                                                                                      // 35
    return path && path.replace(/(\.tsx|\.ts)$/g, '');                                                                // 36
  }                                                                                                                   // 37
};                                                                                                                    // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/barbatus_typescript-compiler/utils.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({                                                                                                       // 1
  getShallowHash: function () {                                                                                       // 1
    return getShallowHash;                                                                                            // 1
  }                                                                                                                   // 1
});                                                                                                                   // 1
                                                                                                                      //
var _Npm$require = Npm.require('crypto'),                                                                             //
    createHash = _Npm$require.createHash;                                                                             //
                                                                                                                      //
function getShallowHash(ob) {                                                                                         // 3
  var hash = createHash('sha1');                                                                                      // 4
  var keys = Object.keys(ob);                                                                                         // 5
  keys.sort();                                                                                                        // 6
  keys.forEach(function (key) {                                                                                       // 8
    hash.update(key).update('' + ob[key]);                                                                            // 9
  });                                                                                                                 // 10
  return hash.digest('hex');                                                                                          // 12
}                                                                                                                     // 13
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/barbatus:typescript-compiler/logger.js");
require("./node_modules/meteor/barbatus:typescript-compiler/file-utils.js");
require("./node_modules/meteor/barbatus:typescript-compiler/typescript-compiler.js");
require("./node_modules/meteor/barbatus:typescript-compiler/typescript.js");
require("./node_modules/meteor/barbatus:typescript-compiler/utils.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['barbatus:typescript-compiler'] = {}, {
  TypeScript: TypeScript,
  TypeScriptCompiler: TypeScriptCompiler
});

})();

//# sourceMappingURL=barbatus_typescript-compiler.js.map
