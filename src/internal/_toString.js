var _map = require('./_map');
var _quote = require('./_quote');
var _toISOString = require('./_toISOString');
var keys = require('../keys');
var reject = require('../reject');
var test = require('../test');


module.exports = function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    var idx = 0;
    while (idx < xs.length) {
      if (xs[idx] === y) {
        return '<Circular>';
      }
      idx += 1;
    }
    return _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function(obj, keys) {
    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(test(/^\d+$/), keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + _quote(_toISOString(x)) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      return (typeof x.constructor === 'function' && x.constructor.name !== 'Object' &&
              typeof x.toString === 'function' && x.toString() !== '[object Object]') ?
             x.toString() :  // Function, RegExp, user-defined types
             '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
};
