/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;} else {return Array.from(arr);}}

const defaults = require('../defaults');
const nullthrows = require('fbjs/lib/nullthrows');
const parallel = require('async/parallel');
const seq = require('async/seq');
const virtualModule = require('./module').virtual;






















exports.createBuildSetup = function (
graph,
postProcessModules) {let
  translateDefaultsPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : x => x;return (

    (entryPoints, options, callback) => {var _options$getPolyfills =




      options.getPolyfills;const getPolyfills = _options$getPolyfills === undefined ? (_ref) => {let platform = _ref.platform;return [];} : _options$getPolyfills;var _options$optimize = options.optimize;const optimize = _options$optimize === undefined ? false : _options$optimize;var _options$platform = options.platform;const platform = _options$platform === undefined ? defaults.platforms[0] : _options$platform;
      const graphOptions = { optimize };

      const graphWithOptions =
      (entry, cb) => graph(entry, platform, graphOptions, cb);
      const graphOnlyModules = seq(graphWithOptions, getModules);

      parallel({
        graph: cb => graphWithOptions(entryPoints, (error, result) => {
          if (error) {
            cb(error);
            return;
          }
          /* $FlowFixMe: not undefined if there is no error */const
          modules = result.modules,entryModules = result.entryModules;
          const prModules = postProcessModules(modules, [].concat(_toConsumableArray(entryPoints)));
          cb(null, { modules: prModules, entryModules });
        }),
        moduleSystem: cb => graphOnlyModules(
        [translateDefaultsPath(defaults.moduleSystem)],
        cb),

        polyfills: cb => graphOnlyModules(
        getPolyfills({ platform }).map(translateDefaultsPath),
        cb) },

      (
      error,
      result) =>
      {
        if (error) {
          callback(error);
          return;
        }var _nullthrows =





        nullthrows(result),_nullthrows$graph = _nullthrows.graph;const modules = _nullthrows$graph.modules,entryModules = _nullthrows$graph.entryModules,moduleSystem = _nullthrows.moduleSystem,polyfills = _nullthrows.polyfills;

        const preludeScript = prelude(optimize);
        const prependedScripts = [preludeScript].concat(_toConsumableArray(moduleSystem), _toConsumableArray(polyfills));
        callback(null, {
          entryModules,
          modules: prependedScripts.concat(modules),
          prependedScripts });

      });
    });};

const getModules = (x, cb) => cb(null, x.modules);

function* concat() {for (var _len = arguments.length, iterables = Array(_len), _key = 0; _key < _len; _key++) {iterables[_key] = arguments[_key];}
  for (const it of iterables) {
    yield* it;
  }
}

function prelude(optimize) {
  return virtualModule(
  `var __DEV__=${String(!optimize)},` +
  '__BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now();');

}