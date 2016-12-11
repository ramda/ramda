var curryN = require('./curryN');


/**
 * todo
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig :'(
 * @param {Function} A function that returns a function
 * @return {Function} A curried function
 * @see R.curry, R.curryN
 * @example
 *
 *      todo
 */
module.exports = function curryX(f) {
  return curryN(f.length, function() {
    if (arguments.length > f.length) {
      var fArgs = Array.prototype.slice.call(arguments, 0, f.length);
      var gArgs = Array.prototype.slice.call(arguments, f.length);
      var g = f.apply(null, fArgs);
      if (gArgs.length >= g.length) {
        return g.apply(null, gArgs);
      } else {
        return curryN(g.length, g).apply(null, gArgs);
      }
    } else {
      return f.apply(null, arguments);
    }
  });
}
