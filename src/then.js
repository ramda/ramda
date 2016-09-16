var _curry2 = require('./internal/_curry2');
var _isFunction = require('./internal/_isFunction');
var toString = require('./toString');


/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> c) -> (Promise a b) -> (Promise c d)
 * @sig (a -> (Promise c d)) -> (Promise a b) -> (Promise c d)
 * @param {Function} onSuccess The function to apply.  Can return a value or a promise.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.fail
 * @example
 *
 *      var makeQuery = (email) => ({ query: { email }});
 *
 *      //getMemberName :: String -> Promise [{firstName, lastName}]
 *      var getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.then(R.pick(['firstName', 'lastName']))
 *      );
 */
module.exports = _curry2(function then(f, p) {
  if (p == null || !_isFunction(p.then)) {
    throw new TypeError(toString(p) + ' does not have a method named "then"');
  }

  return p.then(f);
});
