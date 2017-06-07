var _curry2 = require('./internal/_curry2');
var compose = require('./compose');
var defaultTo = require('./defaultTo');


/**
 * Creates a new function(`'fn`) from an existing one(`fn`) by adding a default returned
 * value(`defaultVal`). If the result of `fn` is not `null`, `undefined` or `NaN`, it
 * will be returned by `'fn`; otherwise, `defaultVal` will be returned.
 *
 * @func
 * @memberOf R
 * @category Function
 * @category List
 * @sig b -> (a -> b) -> (a -> b)
 * @param {b} defaultVal `defaultVal` will be returned ultimately if `fn`'s result is not `null`, `undefined` or `NaN`.
 * @param {Function} fn original function
 * @return {Function} function with a default returned value
 * @example
 *
 *      var nthDefaulted = R.addDefault('defaultVal', R.nth);
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      nthDefaulted(1, list); //=> 'bar'
 *      nthDefaulted(-1, list); //=> 'quux'
 *      nthDefaulted(-99, list); //=> defaultVal
 */
module.exports = _curry2(function addDefault(defaultVal, func) {
  return compose(
    defaultTo(defaultVal),
    func
  );
});
