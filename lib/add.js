/**
 * Adds two numbers (or strings). Equivalent to `a + b` but curried.
 *
 * @func
 * @memberOf R
 * @category math
 * @sig Number -> Number -> Number
 * @sig String -> String -> String
 * @param {Number|String} a The first value.
 * @param {Number|String} b The second value.
 * @return {Number|String} The result of `a + b`.
 * @example
 *
 *      var increment = R.add(1);
 *      increment(10);   //=> 11
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
R.add = _curry2(_add);
