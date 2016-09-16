var _curry2 = require('./internal/_curry2');
var _isFunction = require('./internal/_isFunction');
var toString = require('./toString');


/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (b -> c) -> (Promise a b) -> (Promise c d)
 * @sig (b -> (Promise c d)) -> (Promise a b) -> (Promise c d)
 * @param {Function} onFailure The function to apply.  Can return a value or a promise.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.then
 * @example
 *
 *      var failedFetch = (id) => Promise.reject('bad ID');
 *      var useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
 *
 *      //recoverFromFailure :: String -> Promise [{firstName, lastName}]
 *      var recoverFromFailure = R.pipe(
 *        failedFetch(12345),
 *        R.fail(useDefault),
 *        R.then(R.pick(['firstName', 'lastName']))
 *      );
 */
module.exports = _curry2(function fail(f, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError(toString(p) + ' does not have a method named "then"');
  }

  return p.then(null, f);
});
