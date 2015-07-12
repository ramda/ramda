var _curry1 = require('./internal/_curry1');
var nth = require('./nth');


/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 */
module.exports = _curry1(function nthArg(n) {
  return function() {
    return nth(n, arguments);
  };
});
