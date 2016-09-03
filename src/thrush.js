var _curry2 = require('./internal/_curry2');

/**
 * When applied fully :
 * - A function that take a value and a function,
 *   and apply the function to the value.
 *
 * When applied partially :
 * - A function that just wrap a value into a function.
 *   It's the T combinator,
 *   you can retreive this value with I combinator (also R.identity)
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value to wrap.
 * @param {Function} f The function to apply.
 * @return {*} Tun result of applying f on x.
 * @example
 *
 *      // First example
 *      var t42 = R.thrush(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 *
 *      // Second example
 *      var url = { pathname: 'http://localhost/index.html', query: '?firstName=Bruce&lastName=Wayne' };
 *
 *      R.thrush(url)(
 *        R.compose(R.join(''), R.values)
 *      ); //=> http://localhost/index.html?firstName=Bruce&lastName=Wayne
 */
module.exports = _curry2(function thrush(x, f) { return f(x); });
