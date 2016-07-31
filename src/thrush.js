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
 *      var t42 = R.thrush(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 *
 *      // with lenses
 *      var state = {
 *        firstName: "Bruce",
 *        lastName: "Wayne",
 *      };
 *      var tState = R.thrush(state);
 *      var lastName = lensProp('lastName');
 *
 *      tState(R.view(lastName)); //=> "Wayne"
 *
 *      var overState = R.compose(tState, over);
 *      overState(lastName, R.toUpper); //=> {"firstName": "Hello", "lastName": "WORLD"}
 */
module.exports = _curry2(function thrush(x, f) { return f(x); });
