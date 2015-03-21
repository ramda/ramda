var _curry2 = require('./internal/_curry2');


/**
 * Returns the second argument if it is not null or undefined. If it is null
 * or undefined, the first (default) argument is returned.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} val The default value.
 * @param {b} val The value to return if it is not null or undefined
 * @return {*} The the second value or the default value
 * @example
 *
 *      var defaultTo42 = defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 */
module.exports = _curry2(function defaultTo(d, v) {
  return v == null ? d : v;
});
