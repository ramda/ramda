var _curry2 = require('./internal/_curry2');


/**
 * Runs the given function with the resoluton of a promise
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig (a -> *) -> Promize a -> Promise a
 * @param {Function} fn The function to call with `a`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */
module.exports = _curry2(function tapP(fn, promise) {
  return promise
    .then(function (val) {
      fn(val);
      return promise;
  });
});