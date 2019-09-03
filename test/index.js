var R = require('../source');
var eq = require('./shared/eq');
var fs = require('fs');
var path = require('path');


function sourceMethods(dir) {
  var isJsFile = function(file) { return file.match(/\.js$/); };
  var isIndex = R.equals('index.js');
  var removeJsEnding = function(file) { return file.replace('.js', ''); };
  return fs.readdirSync(dir).filter(R.both(R.complement(isIndex), isJsFile)).map(removeJsEnding);
}

/**
 * Convention is
 *  * Actual API—all `./es/*.js` files are top level API methods
 *  * Exported API—object in `./es/index.js` to be exported
 *  * Actual and exported APIs should be the same
 *
 * Two cases, when exported and actual APIs might differ
 *  1. newly added API `./es/method.js` is forgotten to be added into './es/index.js'
 *  2. API method is deprecated and actual source file from `./es/` removed,
 *     while continues to exist in `./es/index.js`
 *
 * 1st case is detected in first assertion, and detailed in second one
 *
 * 2st case doesnt need detection, because NodeJS will throw an error
 * if you would attempt to require non existing file
 */
describe('API surface', function() {
  if (typeof require.resolve !== 'function') {
    return;
  }
  var exported = Object.keys(R).filter(function(key) {
    return key !== '__esModule';
  });
  var actual = sourceMethods(path.dirname(require.resolve('../source')));

  it('both APIs are in sync', function() {
    eq(actual.length, exported.length);
  });

  it('list of not exported API methods is empty', function() {
    function isNotExported(method) { return exported.indexOf(method) === -1; }
    eq(actual.filter(isNotExported), []);
  });
});
