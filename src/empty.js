var _curry1 = require('./internal/_curry1');
var _hasMethod = require('./internal/_hasMethod');


/**
 * `empty` returns an empty list for any argument, except when the argument satisfies the
 * Fantasy-land Monoid spec. In that case, this function will return the result of invoking
 * `empty` on that Monoid.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig * -> []
 * @return {Array} An empty array.
 * @example
 *
 *      R.empty([1,2,3,4,5]); //=> []
 */
module.exports = _curry1(function empty(x) {
  return _hasMethod('empty', x) ? x.empty() : [];
});
