var op = require('./op');

/**
 * mathMod behaves like the modulo operator should mathematically (euclidean), unlike the `%`
 * operator (and by extension, R.modulo). So while "-17 % 5" is -2,
 * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
 * when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.moduloBy
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `undefined` for its first argument.
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      // note: In this example, `_`  is just an `undefined` value.  You could use `void 0` instead
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */
module.exports = op(function mathMod(m, p) {
    var rem = m % p;
    return rem < 0 ? rem + Math.abs(p) : rem;
});
