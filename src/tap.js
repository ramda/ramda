var _curry2 = require('./internal/_curry2');


/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = function(x) { console.log('x is ' + x); };
 *      R.tap(sayX, 100); //=> 100
 *      //-> 'x is 100'
 */
module.exports = _curry2(function tap(fn, x) {
  fn(x);
  return x;
});
