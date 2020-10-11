(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/api/githubAuthCallback.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config sync recursive":
/*!*********************!*\
  !*** ./config sync ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./config sync recursive\";\n\n//# sourceURL=webpack:///./config_sync?");

/***/ }),

/***/ "./config/getDefaultConfig.ts":
/*!************************************!*\
  !*** ./config/getDefaultConfig.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getDefaultConfig = void 0;\n\nvar debug_1 = __importDefault(__webpack_require__(/*! debug */ \"./node_modules/debug/src/index.js\"));\n\nvar Debug = function Debug(filter) {\n  return debug_1[\"default\"](\"devops:config:getDefaultConfig\" + (!!filter.length ? \":\".concat(filter) : \"\"));\n};\n\nvar debug = Debug(\"\");\n\nvar interfaces_1 = __webpack_require__(/*! ../lib/interfaces */ \"./lib/interfaces/index.ts\");\n\nexports.getDefaultConfig = function () {\n  // TODO Sort out default config\n  var config = {\n    REGION: \"us-east-1\",\n    ALLOWED_METHODS: interfaces_1.methods,\n    ALLOW_NAKED: false\n  };\n  debug(config);\n  return config;\n};\n\n//# sourceURL=webpack:///./config/getDefaultConfig.ts?");

/***/ }),

/***/ "./config/getUserConfig.ts":
/*!*********************************!*\
  !*** ./config/getUserConfig.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getUserConfig = exports.getBranch = void 0;\n\nvar debug_1 = __importDefault(__webpack_require__(/*! debug */ \"./node_modules/debug/src/index.js\"));\n\nvar Debug = function Debug(filter) {\n  return debug_1[\"default\"](\"devops:config:getUserConfig\" + (!!filter.length ? \":\".concat(filter) : \"\"));\n};\n\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar fs_1 = __webpack_require__(/*! fs */ \"fs\");\n\nvar aws_sdk_1 = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar yaml_1 = __importDefault(__webpack_require__(/*! yaml */ \"./node_modules/yaml/index.js\"));\n\nvar debug = Debug(\"devops:config:getUserConfig\");\n\nvar strings_1 = __webpack_require__(/*! ../lib/strings */ \"./lib/strings/index.ts\");\n\nexports.getBranch = function () {\n  var output;\n\n  try {\n    output = child_process_1.execSync(\"git status\");\n  } catch (_a) {\n    return \"master\";\n  }\n\n  var results = /^On\\sbranch\\s([\\S]*).*/.exec(output.toString());\n\n  if (!results) {\n    throw new Error(\"Cannot determine what branch you are on\");\n  }\n\n  return results[1];\n};\n\nexports.getUserConfig = function (_ref) {\n  var _marked = /*#__PURE__*/regeneratorRuntime.mark(buildPlacesToSearch);\n\n  var cwd = _ref.cwd,\n      searchRoots = _ref.searchRoots;\n  var pathParse = path_1[\"default\"].parse(cwd);\n  var root = pathParse.root;\n  debug({\n    cwd: cwd,\n    pathParse: pathParse,\n    searchRoots: searchRoots\n  });\n\n  if (cwd === path_1[\"default\"].resolve(__dirname, \"..\")) {\n    // load dotenv when working in repo so system\n    // can be used to deploy docs\n    debug(\"loading .env\");\n\n    __webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config();\n  }\n\n  function buildPlacesToSearch() {\n    var buildRecursiveSearch, _places;\n\n    return regeneratorRuntime.wrap(function buildPlacesToSearch$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            buildRecursiveSearch = function buildRecursiveSearch(location) {\n              var search = [];\n\n              var _location = root === \"/\" ? location.slice(1).split(\"/\") : location.replace(root, \"\").split(\"\\\\\");\n\n              debug({\n                location: location,\n                _location: _location\n              });\n\n              do {\n                search.push(root.concat(_location.join(\"/\")));\n\n                _location.pop();\n              } while (_location.length);\n\n              var reversed = search.reverse();\n              debug(\"search.reverse() :\", reversed);\n              return reversed;\n            }; // de-duplicate paths in order of insertion\n\n\n            _places = _toConsumableArray(new Set(searchRoots.map(function (root) {\n              return buildRecursiveSearch(root);\n            }).flat(1)));\n\n          case 2:\n            if (!_places.length) {\n              _context.next = 7;\n              break;\n            }\n\n            _context.next = 5;\n            return _places.shift();\n\n          case 5:\n            _context.next = 2;\n            break;\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _marked);\n  }\n\n  var yamlHandler = function yamlHandler(location) {\n    var file = fs_1.readFileSync(location).toString();\n    return yaml_1[\"default\"].parse(file);\n  };\n\n  var baseHandler = function baseHandler(location) {\n    //eslint-disable-next-line @typescript-eslint/no-var-requires\n    var file = __webpack_require__(\"./config sync recursive\")(location);\n\n    return file.config ? file.config : file[\"default\"] ? file[\"default\"] : file;\n  };\n\n  var handlers = {\n    \"js\": baseHandler,\n    \"ts\": baseHandler,\n    \"json\": baseHandler,\n    \"yml\": yamlHandler,\n    \"yaml\": yamlHandler\n  };\n  var FILE_NAMES = new Set(Object.keys(handlers).map(function (ext) {\n    return \"devops.\" + ext;\n  }));\n  debug(\">>>\\n>>> nomad-devops config filenames\\n>>>\\n\".concat(_toConsumableArray(FILE_NAMES).map(function (loc) {\n    return \">>  \" + loc + \"\\n\";\n  }).join(\"\")));\n  var configFiles = [];\n\n  var listContents = function listContents(dir) {\n    debug(\"listContnts() dir :\", dir);\n    var list = fs_1.readdirSync(dir);\n    debug(\"listContnts() list :\", dir);\n    var pkg = list.find(function (filename) {\n      return filename === \"package.json\";\n    });\n    var configs = list.filter(function (filename) {\n      return FILE_NAMES.has(filename);\n    }).map(function (filename) {\n      return \"\".concat(dir, \"/\").concat(filename);\n    });\n    configFiles.push.apply(configFiles, _toConsumableArray(configs));\n    var contents = {\n      configs: configs\n    };\n    if (pkg) contents.pkg = \"\".concat(dir, \"/package.json\");\n    return contents;\n  };\n\n  var directoriesSearched = [];\n\n  var mergeContentsOfDir = function mergeContentsOfDir(dir) {\n    directoriesSearched.push(dir);\n    var config = {};\n    debug(\"mergeContentsOfDir() dir :\", dir);\n\n    var _listContents = listContents(dir),\n        configs = _listContents.configs,\n        pkg = _listContents.pkg;\n\n    debug(\"mergeContentsOfDir() contents :\", {\n      configs: configs,\n      pkg: pkg\n    });\n\n    var _iterator = _createForOfIteratorHelper(configs),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var _config = _step.value;\n\n        var extension = _config.split(\".\").pop();\n\n        config = Object.assign(Object.assign({}, config), handlers[extension](_config));\n        if (pkg) config.pkg = pkg;\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n\n    return config;\n  };\n\n  var buildConfig = function buildConfig() {\n    var config = {};\n    debug(\"buildConfig() config: \", config);\n\n    var _iterator2 = _createForOfIteratorHelper(buildPlacesToSearch()),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var current = _step2.value;\n        debug(\"buildConfig() current: \", current);\n\n        var _config = mergeContentsOfDir(current);\n\n        config = Object.assign(Object.assign({}, config), _config);\n        debug(\"buildConfig() config: \", config);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n\n    return config;\n  };\n\n  var config = {};\n\n  if (process.env.LAMBDA !== \"true\") {\n    try {\n      config = buildConfig();\n    } catch (err) {\n      console.log(\">>>\\n>>> Error encountered when trying to build nomad-devops config:\\n\", err);\n    }\n  }\n\n  config.BRANCH = process.env.BRANCH || exports.getBranch();\n  if (!config.PROJECT_NAME) config.PROJECT_NAME = strings_1.kebabCaseDomainName(config.ROOT_DOMAIN);\n  config.AWS_SERVICE_CONFIG = Object.keys(config.AWS_SERVICE_CONFIG || {}).length ? config.AWS_SERVICE_CONFIG : {\n    region: config.REGION,\n    accessKeyId: config.AWS_ACCESS_KEY_ID,\n    secretAccessKey: config.AWS_SECRET_ACCESS_KEY\n  };\n  config.cf = new aws_sdk_1.CloudFormation(config.AWS_SERVICE_CONFIG);\n  config.route53 = new aws_sdk_1.Route53(config.AWS_SERVICE_CONFIG);\n  config.s3 = new aws_sdk_1.S3(config.AWS_SERVICE_CONFIG);\n  config.cloudFront = new aws_sdk_1.CloudFront(config.AWS_SERVICE_CONFIG);\n  config.acm = new aws_sdk_1.ACM(config.AWS_SERVICE_CONFIG);\n  config.apiGateway = new aws_sdk_1.APIGateway(config.AWS_SERVICE_CONFIG);\n  config.iam = new aws_sdk_1.IAM(config.AWS_SERVICE_CONFIG);\n  config.ssm = new aws_sdk_1.SSM(config.AWS_SERVICE_CONFIG);\n  debug(\">>>\\n>>> directories searched to find config files\\n>>>\\n\".concat(directoriesSearched.map(function (loc) {\n    return \">>  \" + loc + \"\\n\";\n  }).join(\"\")));\n  var debugConfig = Object.assign({}, config);\n  delete debugConfig.cf;\n  delete debugConfig.route53;\n  delete debugConfig.s3;\n  Debug(\"devops,devops:config\")(\">>>\\n>>> config files found; merged top-down\\n>>> example: {...configs[0], ...configs[1], ...configs[configs.length-1]}\\n>>>\\n\".concat([\"configs = [\"].concat(_toConsumableArray(configFiles.map(function (file) {\n    return \"  \" + file;\n  })), [\"]\"]).map(function (loc) {\n    return \">>  \" + loc + \"\\n\";\n  }).join(\"\"), \">>>\\n>>>\\n\"), debugConfig);\n  return config;\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./config/getUserConfig.ts?");

/***/ }),

/***/ "./config/index.ts":
/*!*************************!*\
  !*** ./config/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.config = void 0;\n\nvar os_1 = __webpack_require__(/*! os */ \"os\");\n\nvar getDefaultConfig_1 = __webpack_require__(/*! ./getDefaultConfig */ \"./config/getDefaultConfig.ts\");\n\nvar getUserConfig_1 = __webpack_require__(/*! ./getUserConfig */ \"./config/getUserConfig.ts\");\n\nvar validateConfig_1 = __webpack_require__(/*! ./validateConfig */ \"./config/validateConfig.ts\");\n\nvar cwd = process.cwd();\nvar SEARCH_ROOTS = [os_1.homedir(), cwd]; // check cwd for package.json and node_modules folder\n// if one doesn't exist check the folder holding node_modules/nomad-devops\n\nvar config = Object.assign(Object.assign({}, getDefaultConfig_1.getDefaultConfig()), getUserConfig_1.getUserConfig({\n  cwd: cwd,\n  searchRoots: SEARCH_ROOTS\n}));\nexports.config = config;\n\nif (config.pkg) {\n  config.pkg = __webpack_require__(\"./config sync recursive\")(config.pkg);\n}\n\nvar errors = validateConfig_1.validateConfig(config);\n\nif (errors.length) {\n  var _iterator = _createForOfIteratorHelper(errors),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var message = _step.value;\n      console.log(\">>> config error: \".concat(message));\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  process.exit(1);\n}\n\n//# sourceURL=webpack:///./config/index.ts?");

/***/ }),

/***/ "./config/validateConfig.ts":
/*!**********************************!*\
  !*** ./config/validateConfig.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.validateConfig = void 0;\n\nexports.validateConfig = function (config) {\n  var errors = []; // now validate the config to make sure its good... for another day\n\n  if (!config.GITHUB_ACCESS_TOKEN) {\n    errors.push(\"no config.GITHUB_ACCESS_TOKEN found\");\n  }\n\n  if (!config.AWS_SERVICE_CONFIG.accessKeyId) {\n    errors.push(\"no config.AWS_ACCESS_KEY_ID found\");\n  }\n\n  if (!config.AWS_SERVICE_CONFIG.secretAccessKey) {\n    errors.push(\"no config.AWS_SECRET_ACCESS_KEY found\");\n  }\n\n  if (!config.ROOT_DOMAIN) {\n    errors.push(\"no config.ROOT_DOMAIN found\");\n  }\n\n  return errors;\n};\n\n//# sourceURL=webpack:///./config/validateConfig.ts?");

/***/ }),

/***/ "./lib/api/githubAuthCallback.ts":
/*!***************************************!*\
  !*** ./lib/api/githubAuthCallback.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.handler = void 0;\n\nvar simple_oauth2_1 = __webpack_require__(/*! simple-oauth2 */ \"./node_modules/simple-oauth2/index.js\");\n\nvar oauthProvider = \"github\";\n\nexports.handler = function (event, _, callback) {\n  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var _a, oauth2, originPattern, code, options, message, content, result, token;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            oauth2 = simple_oauth2_1.create({\n              client: {\n                id: process.env.OAUTH_CLIENT_ID,\n                secret: process.env.OAUTH_CLIENT_SECRET\n              },\n              auth: {\n                tokenHost: \"https://github.com\",\n                tokenPath: \"/login/oauth/access_token\",\n                authorizePath: \"/login/oauth/authorize\"\n              }\n            });\n            originPattern = process.env.OAUTH_ORIGIN || \"\";\n\n            if (originPattern.length) {\n              _context.next = 5;\n              break;\n            }\n\n            throw new Error(\"Will not run without a safe ORIGIN pattern in production.\");\n\n          case 5:\n            code = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.code;\n            options = {\n              code: code\n            }; // if (oauthProvider === \"gitlab\") {\n            //   options.client_id = process.env.OAUTH_CLIENT_ID;\n            //   options.client_secret = process.env.OAUTH_CLIENT_SECRET;\n            //   options.grant_type = \"authorization_code\";\n            //   options.redirect_uri = process.env.REDIRECT_URL;\n            // }\n\n            _context.prev = 7;\n            _context.next = 10;\n            return oauth2.authorizationCode.getToken(options);\n\n          case 10:\n            result = _context.sent;\n            token = oauth2.accessToken.create(result);\n            message = \"success\";\n            content = {\n              token: token.token.access_token,\n              provider: oauthProvider\n            };\n            _context.next = 21;\n            break;\n\n          case 16:\n            _context.prev = 16;\n            _context.t0 = _context[\"catch\"](7);\n            console.error(\"Access Token Error\", _context.t0.message);\n            message = \"error\";\n            content = JSON.stringify(_context.t0);\n\n          case 21:\n            callback(null, {\n              statusCode: 200,\n              headers: {\n                \"Content-Type\": \"text/html\"\n              },\n              body: \"<script>\\n(function() {\\n  function recieveMessage(e) {\\n    console.log(\\\"recieveMessage %o\\\", e)\\n    if (!e.origin.match(\".concat(JSON.stringify(originPattern), \")) {\\n      console.log('Invalid origin: %s', e.origin);\\n      return;\\n    }\\n    // send message to main window with da app\\n    window.opener.postMessage(\\n      'authorization:\").concat(oauthProvider, \":\").concat(message, \":\").concat(JSON.stringify(content), \"',\\n      e.origin\\n    )\\n  }\\n  window.addEventListener(\\\"message\\\", recieveMessage, false)\\n  // Start handshare with parent\\n  console.log(\\\"Sending message: %o\\\", \\\"\").concat(oauthProvider, \"\\\")\\n  window.opener.postMessage(\\\"authorizing:\").concat(oauthProvider, \"\\\", \\\"*\\\")\\n})()\\n</script>\")\n            });\n            _context.next = 27;\n            break;\n\n          case 24:\n            _context.prev = 24;\n            _context.t1 = _context[\"catch\"](0);\n            callback(_context.t1);\n\n          case 27:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 24], [7, 16]]);\n  }));\n};\n\n//# sourceURL=webpack:///./lib/api/githubAuthCallback.ts?");

/***/ }),

/***/ "./lib/interfaces/HttpStatusCode.ts":
/*!******************************************!*\
  !*** ./lib/interfaces/HttpStatusCode.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.StatusCode = void 0;\n/**\n * Hypertext Transfer Protocol (HTTP) response status codes.\n * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}\n */\n\nvar StatusCode;\n\n(function (StatusCode) {\n  /**\n   * The server has received the request headers and the client should proceed to send the request body\n   * (in the case of a request for which a body needs to be sent; for example, a POST request).\n   * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.\n   * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request\n   * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.\n   */\n  StatusCode[StatusCode[\"CONTINUE\"] = 100] = \"CONTINUE\";\n  /**\n   * The requester has asked the server to switch protocols and the server has agreed to do so.\n   */\n\n  StatusCode[StatusCode[\"SWITCHING_PROTOCOLS\"] = 101] = \"SWITCHING_PROTOCOLS\";\n  /**\n   * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.\n   * This code indicates that the server has received and is processing the request, but no response is available yet.\n   * This prevents the client from timing out and assuming the request was lost.\n   */\n\n  StatusCode[StatusCode[\"PROCESSING\"] = 102] = \"PROCESSING\";\n  /**\n   * Standard response for successful HTTP requests.\n   * The actual response will depend on the request method used.\n   * In a GET request, the response will contain an entity corresponding to the requested resource.\n   * In a POST request, the response will contain an entity describing or containing the result of the action.\n   */\n\n  StatusCode[StatusCode[\"OK\"] = 200] = \"OK\";\n  /**\n   * The request has been fulfilled, resulting in the creation of a new resource.\n   */\n\n  StatusCode[StatusCode[\"CREATED\"] = 201] = \"CREATED\";\n  /**\n   * The request has been accepted for processing, but the processing has not been completed.\n   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.\n   */\n\n  StatusCode[StatusCode[\"ACCEPTED\"] = 202] = \"ACCEPTED\";\n  /**\n   * SINCE HTTP/1.1\n   * The server is a transforming proxy that received a 200 OK from its origin,\n   * but is returning a modified version of the origin\"s response.\n   */\n\n  StatusCode[StatusCode[\"NON_AUTHORITATIVE_INFORMATION\"] = 203] = \"NON_AUTHORITATIVE_INFORMATION\";\n  /**\n   * The server successfully processed the request and is not returning any content.\n   */\n\n  StatusCode[StatusCode[\"NO_CONTENT\"] = 204] = \"NO_CONTENT\";\n  /**\n   * The server successfully processed the request, but is not returning any content.\n   * Unlike a 204 response, this response requires that the requester reset the document view.\n   */\n\n  StatusCode[StatusCode[\"RESET_CONTENT\"] = 205] = \"RESET_CONTENT\";\n  /**\n   * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.\n   * The range header is used by HTTP clients to enable resuming of interrupted downloads,\n   * or split a download into multiple simultaneous streams.\n   */\n\n  StatusCode[StatusCode[\"PARTIAL_CONTENT\"] = 206] = \"PARTIAL_CONTENT\";\n  /**\n   * The message body that follows is an XML message and can contain a number of separate response codes,\n   * depending on how many sub-requests were made.\n   */\n\n  StatusCode[StatusCode[\"MULTI_STATUS\"] = 207] = \"MULTI_STATUS\";\n  /**\n   * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,\n   * and are not being included again.\n   */\n\n  StatusCode[StatusCode[\"ALREADY_REPORTED\"] = 208] = \"ALREADY_REPORTED\";\n  /**\n   * The server has fulfilled a request for the resource,\n   * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.\n   */\n\n  StatusCode[StatusCode[\"IM_USED\"] = 226] = \"IM_USED\";\n  /**\n   * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).\n   * For example, this code could be used to present multiple video format options,\n   * to list files with different filename extensions, or to suggest word-sense disambiguation.\n   */\n\n  StatusCode[StatusCode[\"MULTIPLE_CHOICES\"] = 300] = \"MULTIPLE_CHOICES\";\n  /**\n   * This and all future requests should be directed to the given URI.\n   */\n\n  StatusCode[StatusCode[\"MOVED_PERMANENTLY\"] = 301] = \"MOVED_PERMANENTLY\";\n  /**\n   * This is an example of industry practice contradicting the standard.\n   * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect\n   * (the original describing phrase was \"Moved Temporarily\"), but popular browsers implemented 302\n   * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307\n   * to distinguish between the two behaviours. However, some Web applications and frameworks\n   * use the 302 status code as if it were the 303.\n   */\n\n  StatusCode[StatusCode[\"FOUND\"] = 302] = \"FOUND\";\n  /**\n   * SINCE HTTP/1.1\n   * The response to the request can be found under another URI using a GET method.\n   * When received in response to a POST (or PUT/DELETE), the client should presume that\n   * the server has received the data and should issue a redirect with a separate GET message.\n   */\n\n  StatusCode[StatusCode[\"SEE_OTHER\"] = 303] = \"SEE_OTHER\";\n  /**\n   * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.\n   * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.\n   */\n\n  StatusCode[StatusCode[\"NOT_MODIFIED\"] = 304] = \"NOT_MODIFIED\";\n  /**\n   * SINCE HTTP/1.1\n   * The requested resource is available only through a proxy, the address for which is provided in the response.\n   * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.\n   */\n\n  StatusCode[StatusCode[\"USE_PROXY\"] = 305] = \"USE_PROXY\";\n  /**\n   * No longer used. Originally meant \"Subsequent requests should use the specified proxy.\"\n   */\n\n  StatusCode[StatusCode[\"SWITCH_PROXY\"] = 306] = \"SWITCH_PROXY\";\n  /**\n   * SINCE HTTP/1.1\n   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.\n   * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.\n   * For example, a POST request should be repeated using another POST request.\n   */\n\n  StatusCode[StatusCode[\"TEMPORARY_REDIRECT\"] = 307] = \"TEMPORARY_REDIRECT\";\n  /**\n   * The request and all future requests should be repeated using another URI.\n   * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.\n   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.\n   */\n\n  StatusCode[StatusCode[\"PERMANENT_REDIRECT\"] = 308] = \"PERMANENT_REDIRECT\";\n  /**\n   * The server cannot or will not process the request due to an apparent client error\n   * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).\n   */\n\n  StatusCode[StatusCode[\"BAD_REQUEST\"] = 400] = \"BAD_REQUEST\";\n  /**\n   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet\n   * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the\n   * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means\n   * \"unauthenticated\",i.e. the user does not have the necessary credentials.\n   */\n\n  StatusCode[StatusCode[\"UNAUTHORIZED\"] = 401] = \"UNAUTHORIZED\";\n  /**\n   * Reserved for future use. The original intention was that this code might be used as part of some form of digital\n   * cash or micro payment scheme, but that has not happened, and this code is not usually used.\n   * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.\n   */\n\n  StatusCode[StatusCode[\"PAYMENT_REQUIRED\"] = 402] = \"PAYMENT_REQUIRED\";\n  /**\n   * The request was valid, but the server is refusing action.\n   * The user might not have the necessary permissions for a resource.\n   */\n\n  StatusCode[StatusCode[\"FORBIDDEN\"] = 403] = \"FORBIDDEN\";\n  /**\n   * The requested resource could not be found but may be available in the future.\n   * Subsequent requests by the client are permissible.\n   */\n\n  StatusCode[StatusCode[\"NOT_FOUND\"] = 404] = \"NOT_FOUND\";\n  /**\n   * A request method is not supported for the requested resource;\n   * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.\n   */\n\n  StatusCode[StatusCode[\"METHOD_NOT_ALLOWED\"] = 405] = \"METHOD_NOT_ALLOWED\";\n  /**\n   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.\n   */\n\n  StatusCode[StatusCode[\"NOT_ACCEPTABLE\"] = 406] = \"NOT_ACCEPTABLE\";\n  /**\n   * The client must first authenticate itself with the proxy.\n   */\n\n  StatusCode[StatusCode[\"PROXY_AUTHENTICATION_REQUIRED\"] = 407] = \"PROXY_AUTHENTICATION_REQUIRED\";\n  /**\n   * The server timed out waiting for the request.\n   * According to HTTP specifications:\n   * \"The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.\"\n   */\n\n  StatusCode[StatusCode[\"REQUEST_TIMEOUT\"] = 408] = \"REQUEST_TIMEOUT\";\n  /**\n   * Indicates that the request could not be processed because of conflict in the request,\n   * such as an edit conflict between multiple simultaneous updates.\n   */\n\n  StatusCode[StatusCode[\"CONFLICT\"] = 409] = \"CONFLICT\";\n  /**\n   * Indicates that the resource requested is no longer available and will not be available again.\n   * This should be used when a resource has been intentionally removed and the resource should be purged.\n   * Upon receiving a 410 status code, the client should not request the resource in the future.\n   * Clients such as search engines should remove the resource from their indices.\n   * Most use cases do not require clients and search engines to purge the resource, and a \"404 Not Found\" may be used instead.\n   */\n\n  StatusCode[StatusCode[\"GONE\"] = 410] = \"GONE\";\n  /**\n   * The request did not specify the length of its content, which is required by the requested resource.\n   */\n\n  StatusCode[StatusCode[\"LENGTH_REQUIRED\"] = 411] = \"LENGTH_REQUIRED\";\n  /**\n   * The server does not meet one of the preconditions that the requester put on the request.\n   */\n\n  StatusCode[StatusCode[\"PRECONDITION_FAILED\"] = 412] = \"PRECONDITION_FAILED\";\n  /**\n   * The request is larger than the server is willing or able to process. Previously called \"Request Entity Too Large\".\n   */\n\n  StatusCode[StatusCode[\"PAYLOAD_TOO_LARGE\"] = 413] = \"PAYLOAD_TOO_LARGE\";\n  /**\n   * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,\n   * in which case it should be converted to a POST request.\n   * Called \"Request-URI Too Long\" previously.\n   */\n\n  StatusCode[StatusCode[\"URI_TOO_LONG\"] = 414] = \"URI_TOO_LONG\";\n  /**\n   * The request entity has a media type which the server or resource does not support.\n   * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.\n   */\n\n  StatusCode[StatusCode[\"UNSUPPORTED_MEDIA_TYPE\"] = 415] = \"UNSUPPORTED_MEDIA_TYPE\";\n  /**\n   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.\n   * For example, if the client asked for a part of the file that lies beyond the end of the file.\n   * Called \"Requested Range Not Satisfiable\" previously.\n   */\n\n  StatusCode[StatusCode[\"RANGE_NOT_SATISFIABLE\"] = 416] = \"RANGE_NOT_SATISFIABLE\";\n  /**\n   * The server cannot meet the requirements of the Expect request-header field.\n   */\n\n  StatusCode[StatusCode[\"EXPECTATION_FAILED\"] = 417] = \"EXPECTATION_FAILED\";\n  /**\n   * This code was defined in 1998 as one of the traditional IETF April Fools\" jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,\n   * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by\n   * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.\n   */\n\n  StatusCode[StatusCode[\"I_AM_A_TEAPOT\"] = 418] = \"I_AM_A_TEAPOT\";\n  /**\n   * The request was directed at a server that is not able to produce a response (for example because a connection reuse).\n   */\n\n  StatusCode[StatusCode[\"MISDIRECTED_REQUEST\"] = 421] = \"MISDIRECTED_REQUEST\";\n  /**\n   * The request was well-formed but was unable to be followed due to semantic errors.\n   */\n\n  StatusCode[StatusCode[\"UNPROCESSABLE_ENTITY\"] = 422] = \"UNPROCESSABLE_ENTITY\";\n  /**\n   * The resource that is being accessed is locked.\n   */\n\n  StatusCode[StatusCode[\"LOCKED\"] = 423] = \"LOCKED\";\n  /**\n   * The request failed due to failure of a previous request (e.g., a PROPPATCH).\n   */\n\n  StatusCode[StatusCode[\"FAILED_DEPENDENCY\"] = 424] = \"FAILED_DEPENDENCY\";\n  /**\n   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.\n   */\n\n  StatusCode[StatusCode[\"UPGRADE_REQUIRED\"] = 426] = \"UPGRADE_REQUIRED\";\n  /**\n   * The origin server requires the request to be conditional.\n   * Intended to prevent \"the \"lost update\" problem, where a client\n   * GETs a resource\"s state, modifies it, and PUTs it back to the server,\n   * when meanwhile a third party has modified the state on the server, leading to a conflict.\"\n   */\n\n  StatusCode[StatusCode[\"PRECONDITION_REQUIRED\"] = 428] = \"PRECONDITION_REQUIRED\";\n  /**\n   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.\n   */\n\n  StatusCode[StatusCode[\"TOO_MANY_REQUESTS\"] = 429] = \"TOO_MANY_REQUESTS\";\n  /**\n   * The server is unwilling to process the request because either an individual header field,\n   * or all the header fields collectively, are too large.\n   */\n\n  StatusCode[StatusCode[\"REQUEST_HEADER_FIELDS_TOO_LARGE\"] = 431] = \"REQUEST_HEADER_FIELDS_TOO_LARGE\";\n  /**\n   * A server operator has received a legal demand to deny access to a resource or to a set of resources\n   * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.\n   */\n\n  StatusCode[StatusCode[\"UNAVAILABLE_FOR_LEGAL_REASONS\"] = 451] = \"UNAVAILABLE_FOR_LEGAL_REASONS\";\n  /**\n   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.\n   */\n\n  StatusCode[StatusCode[\"INTERNAL_SERVER_ERROR\"] = 500] = \"INTERNAL_SERVER_ERROR\";\n  /**\n   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.\n   * Usually this implies future availability (e.g., a new feature of a web-service API).\n   */\n\n  StatusCode[StatusCode[\"NOT_IMPLEMENTED\"] = 501] = \"NOT_IMPLEMENTED\";\n  /**\n   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.\n   */\n\n  StatusCode[StatusCode[\"BAD_GATEWAY\"] = 502] = \"BAD_GATEWAY\";\n  /**\n   * The server is currently unavailable (because it is overloaded or down for maintenance).\n   * Generally, this is a temporary state.\n   */\n\n  StatusCode[StatusCode[\"SERVICE_UNAVAILABLE\"] = 503] = \"SERVICE_UNAVAILABLE\";\n  /**\n   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.\n   */\n\n  StatusCode[StatusCode[\"GATEWAY_TIMEOUT\"] = 504] = \"GATEWAY_TIMEOUT\";\n  /**\n   * The server does not support the HTTP protocol version used in the request\n   */\n\n  StatusCode[StatusCode[\"HTTP_VERSION_NOT_SUPPORTED\"] = 505] = \"HTTP_VERSION_NOT_SUPPORTED\";\n  /**\n   * Transparent content negotiation for the request results in a circular reference.\n   */\n\n  StatusCode[StatusCode[\"VARIANT_ALSO_NEGOTIATES\"] = 506] = \"VARIANT_ALSO_NEGOTIATES\";\n  /**\n   * The server is unable to store the representation needed to complete the request.\n   */\n\n  StatusCode[StatusCode[\"INSUFFICIENT_STORAGE\"] = 507] = \"INSUFFICIENT_STORAGE\";\n  /**\n   * The server detected an infinite loop while processing the request.\n   */\n\n  StatusCode[StatusCode[\"LOOP_DETECTED\"] = 508] = \"LOOP_DETECTED\";\n  /**\n   * Further extensions to the request are required for the server to fulfill it.\n   */\n\n  StatusCode[StatusCode[\"NOT_EXTENDED\"] = 510] = \"NOT_EXTENDED\";\n  /**\n   * The client needs to authenticate to gain network access.\n   * Intended for use by intercepting proxies used to control access to the network (e.g., \"captive portals\" used\n   * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).\n   */\n\n  StatusCode[StatusCode[\"NETWORK_AUTHENTICATION_REQUIRED\"] = 511] = \"NETWORK_AUTHENTICATION_REQUIRED\";\n})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));\n\n//# sourceURL=webpack:///./lib/interfaces/HttpStatusCode.ts?");

/***/ }),

/***/ "./lib/interfaces/Method.ts":
/*!**********************************!*\
  !*** ./lib/interfaces/Method.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.methods = void 0;\nvar ALLOWED_METHODS;\n\n(function (ALLOWED_METHODS) {\n  ALLOWED_METHODS[ALLOWED_METHODS[\"GET\"] = 0] = \"GET\";\n  ALLOWED_METHODS[ALLOWED_METHODS[\"POST\"] = 1] = \"POST\";\n  ALLOWED_METHODS[ALLOWED_METHODS[\"PUT\"] = 2] = \"PUT\";\n  ALLOWED_METHODS[ALLOWED_METHODS[\"PATCH\"] = 3] = \"PATCH\";\n  ALLOWED_METHODS[ALLOWED_METHODS[\"DELETE\"] = 4] = \"DELETE\";\n})(ALLOWED_METHODS || (ALLOWED_METHODS = {}));\n\nvar methods = new Set();\nexports.methods = methods;\n\nfor (var _i = 0, _Object$keys = Object.keys(ALLOWED_METHODS); _i < _Object$keys.length; _i++) {\n  var method = _Object$keys[_i];\n  if (isNaN(+method)) methods.add(method);\n}\n\n//# sourceURL=webpack:///./lib/interfaces/Method.ts?");

/***/ }),

/***/ "./lib/interfaces/index.ts":
/*!*********************************!*\
  !*** ./lib/interfaces/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function get() {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) {\n    if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\n  }\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./HttpStatusCode */ \"./lib/interfaces/HttpStatusCode.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./Method */ \"./lib/interfaces/Method.ts\"), exports);\n\n//# sourceURL=webpack:///./lib/interfaces/index.ts?");

/***/ }),

/***/ "./lib/strings/capitalizeFirstLetter.ts":
/*!**********************************************!*\
  !*** ./lib/strings/capitalizeFirstLetter.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.capitalizeFirstLetter = void 0;\n\nexports.capitalizeFirstLetter = function () {\n  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"\";\n\n  if (typeof input !== \"string\" || input === \"\") {\n    throw new Error(\"must supply a valid string\");\n  } // look for kebab-case and recursively capitalize first letter\n\n\n  if (input.indexOf(\"-\") !== -1) {\n    var words = input.split(\"-\");\n    var capitalized = words.map(function (word) {\n      return exports.capitalizeFirstLetter(word);\n    });\n    return capitalized.join(\"\");\n  }\n\n  return input[0].toUpperCase() + input.slice(1);\n};\n\n//# sourceURL=webpack:///./lib/strings/capitalizeFirstLetter.ts?");

/***/ }),

/***/ "./lib/strings/changeCaseDomainName.ts":
/*!*********************************************!*\
  !*** ./lib/strings/changeCaseDomainName.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.kebabCaseDomainName = exports.pascalCaseDomainName = exports.camelCaseDomainName = void 0;\n\nexports.camelCaseDomainName = function (domain) {\n  return domain.split(\".\").map(function (segment, index) {\n    if (index !== 0) {\n      return segment[0].toUpperCase() + segment.substr(1);\n    }\n\n    return segment;\n  }).join(\"\");\n};\n\nexports.pascalCaseDomainName = function (domain) {\n  return domain.split(\".\").map(function (segment) {\n    return segment[0].toUpperCase() + segment.substr(1);\n  }).join(\"\");\n};\n\nexports.kebabCaseDomainName = function (domain) {\n  return domain.split(\".\").join(\"-\");\n};\n\n//# sourceURL=webpack:///./lib/strings/changeCaseDomainName.ts?");

/***/ }),

/***/ "./lib/strings/displayNameServerMessage.ts":
/*!*************************************************!*\
  !*** ./lib/strings/displayNameServerMessage.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.displayNameServerMessage = void 0;\n\nvar formatNs = function formatNs(nameServers) {\n  var stringified = \"\";\n  var i = 0;\n\n  var _iterator = _createForOfIteratorHelper(nameServers),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var ns = _step.value;\n      stringified += \">   \".concat(++i, \") \").concat(ns, \"\\n\");\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  return stringified;\n};\n\nexports.displayNameServerMessage = function (domain, nslookup, zoneInfo) {\n  var defaultList = [\"\", \"\", \"\", \"\"];\n  var lookup = formatNs(nslookup && nslookup.size ? _toConsumableArray(nslookup) : defaultList);\n  var zone = formatNs(zoneInfo && zoneInfo.size ? _toConsumableArray(zoneInfo) : defaultList);\n  return \">>>\\n  >>>\\n  >>>\\n  >>> We noticed that the name servers that return from nslookup\\n  >>>\\n  >\\n  \" + lookup + \">\\n  >>>\\n  >>> for \".concat(domain, \" don't match the name servers\\n  >>> associated with the deployed system. This also occurs when\\n  >>> setting things up for the first time. Please update\\n  >>> your domain registrar to use the following name servers\\n  >>>\\n  >\\n  \") + zone + \">\\n  >>>\\n  >>> If you are unsure how to make that happen, you can find\\n  >>> information on how to do this at\\n  >>>\\n  >>> https://devops.nomad.house\\n  >>> - or - \\n  >>> https://github.com/matthewkeil/nomad-devops\\n  >>>\\n  >>>\";\n};\n\n//# sourceURL=webpack:///./lib/strings/displayNameServerMessage.ts?");

/***/ }),

/***/ "./lib/strings/getDomainName.ts":
/*!**************************************!*\
  !*** ./lib/strings/getDomainName.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.buildDomainName = void 0;\n\nexports.buildDomainName = function (_ref) {\n  var branch = _ref.branch,\n      subDomain = _ref.subDomain,\n      rootDomain = _ref.rootDomain,\n      _ref$allowNaked = _ref.allowNaked,\n      allowNaked = _ref$allowNaked === void 0 ? false : _ref$allowNaked;\n  var url = [];\n\n  if (branch !== \"master\") {\n    url.push(branch);\n  }\n\n  if (subDomain && subDomain.length) {\n    url.push.apply(url, _toConsumableArray(subDomain.split(\".\").filter(function (zone) {\n      return !!zone;\n    })));\n  }\n\n  if (!url.length && !allowNaked) {\n    url.push(\"www\");\n  }\n\n  url.push.apply(url, _toConsumableArray(rootDomain.split(\".\").filter(function (zone) {\n    return !!zone;\n  })));\n  return url.join(\".\");\n};\n\n//# sourceURL=webpack:///./lib/strings/getDomainName.ts?");

/***/ }),

/***/ "./lib/strings/getStackName.ts":
/*!*************************************!*\
  !*** ./lib/strings/getStackName.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getStackName = void 0;\n\nvar config_1 = __webpack_require__(/*! ../../config */ \"./config/index.ts\");\n\nvar changeCaseDomainName_1 = __webpack_require__(/*! ./changeCaseDomainName */ \"./lib/strings/changeCaseDomainName.ts\");\n\nexports.getStackName = function (_ref) {\n  var stack = _ref.stack,\n      branch = _ref.branch;\n  return stack === \"core\" ? \"\".concat(changeCaseDomainName_1.kebabCaseDomainName(config_1.config.ROOT_DOMAIN), \"-\").concat(stack) : \"\".concat(config_1.config.PROJECT_NAME, \"-\").concat(stack, \"-\").concat(branch);\n};\n\n//# sourceURL=webpack:///./lib/strings/getStackName.ts?");

/***/ }),

/***/ "./lib/strings/index.ts":
/*!******************************!*\
  !*** ./lib/strings/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function get() {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) {\n    if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\n  }\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./capitalizeFirstLetter */ \"./lib/strings/capitalizeFirstLetter.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./changeCaseDomainName */ \"./lib/strings/changeCaseDomainName.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./displayNameServerMessage */ \"./lib/strings/displayNameServerMessage.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./getDomainName */ \"./lib/strings/getDomainName.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./getStackName */ \"./lib/strings/getStackName.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./normalizeDomain */ \"./lib/strings/normalizeDomain.ts\"), exports);\n\n__exportStar(__webpack_require__(/*! ./toKebabCase */ \"./lib/strings/toKebabCase.ts\"), exports);\n\n//# sourceURL=webpack:///./lib/strings/index.ts?");

/***/ }),

/***/ "./lib/strings/normalizeDomain.ts":
/*!****************************************!*\
  !*** ./lib/strings/normalizeDomain.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.normalizeDomain = void 0;\n\nexports.normalizeDomain = function (domain) {\n  return domain.toLowerCase().split(\".\").filter(function (zone) {\n    return !!zone;\n  }).join(\".\");\n};\n\n//# sourceURL=webpack:///./lib/strings/normalizeDomain.ts?");

/***/ }),

/***/ "./lib/strings/toKebabCase.ts":
/*!************************************!*\
  !*** ./lib/strings/toKebabCase.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toKebabCase = void 0;\n\nexports.toKebabCase = function (string) {\n  return string.replace(/([a-z0-9])([A-Z])/g, \"$1-$2\").replace(/([A-Z])([A-Z])(?=[a-z])/g, \"$1-$2\").toLowerCase();\n};\n\n//# sourceURL=webpack:///./lib/strings/toKebabCase.ts?");

/***/ }),

/***/ "./node_modules/cloudform/index.js":
/*!*****************************************!*\
  !*** ./node_modules/cloudform/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HostedZone = void 0;\n\nconst cloudform_1 = __webpack_require__(/*! cloudform */ \"./node_modules/cloudform/index.js\");\n\nconst config_1 = __webpack_require__(/*! ../../config */ \"./config/index.ts\");\n\nexports.HostedZone = {\n  Type: \"Custom::HostedZone\",\n  Properties: {\n    ServiceToken: cloudform_1.Fn.ImportValue(\"NomadDevopsCustomResourceProvider\"),\n    Name: config_1.config.ROOT_DOMAIN,\n    HostedZoneConfig: {\n      Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`\n    }\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/cloudform/index.js?");

/***/ }),

/***/ "./node_modules/debug/src/index.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HostedZone = void 0;\n\nconst cloudform_1 = __webpack_require__(/*! cloudform */ \"./node_modules/cloudform/index.js\");\n\nconst config_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../config'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nexports.HostedZone = {\n  Type: \"Custom::HostedZone\",\n  Properties: {\n    ServiceToken: cloudform_1.Fn.ImportValue(\"NomadDevopsCustomResourceProvider\"),\n    Name: config_1.config.ROOT_DOMAIN,\n    HostedZoneConfig: {\n      Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`\n    }\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/debug/src/index.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HostedZone = void 0;\n\nconst cloudform_1 = __webpack_require__(/*! cloudform */ \"./node_modules/cloudform/index.js\");\n\nconst config_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '../../config'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nexports.HostedZone = {\n  Type: \"Custom::HostedZone\",\n  Properties: {\n    ServiceToken: cloudform_1.Fn.ImportValue(\"NomadDevopsCustomResourceProvider\"),\n    Name: config_1.config.ROOT_DOMAIN,\n    HostedZoneConfig: {\n      Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`\n    }\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./node_modules/simple-oauth2/index.js":
/*!*********************************************!*\
  !*** ./node_modules/simple-oauth2/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HostedZone = void 0;\n\nconst cloudform_1 = __webpack_require__(/*! cloudform */ \"./node_modules/cloudform/index.js\");\n\nconst config_1 = __webpack_require__(/*! ../../config */ \"./config/index.ts\");\n\nexports.HostedZone = {\n  Type: \"Custom::HostedZone\",\n  Properties: {\n    ServiceToken: cloudform_1.Fn.ImportValue(\"NomadDevopsCustomResourceProvider\"),\n    Name: config_1.config.ROOT_DOMAIN,\n    HostedZoneConfig: {\n      Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`\n    }\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/simple-oauth2/index.js?");

/***/ }),

/***/ "./node_modules/yaml/index.js":
/*!************************************!*\
  !*** ./node_modules/yaml/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HostedZone = void 0;\n\nconst cloudform_1 = __webpack_require__(/*! cloudform */ \"./node_modules/cloudform/index.js\");\n\nconst config_1 = __webpack_require__(/*! ../../config */ \"./config/index.ts\");\n\nexports.HostedZone = {\n  Type: \"Custom::HostedZone\",\n  Properties: {\n    ServiceToken: cloudform_1.Fn.ImportValue(\"NomadDevopsCustomResourceProvider\"),\n    Name: config_1.config.ROOT_DOMAIN,\n    HostedZoneConfig: {\n      Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`\n    }\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/yaml/index.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ })));