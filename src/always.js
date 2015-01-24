var _curry2 = require('./internal/_curry2');


/**
 * Returns a function that always returns the given value.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> (b -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var alwaysFoo = R.always('foo');
 *      alwaysFoo('bar'); //=> 'foo'
 */
module.exports = _curry2(function always(x) { return x; });
