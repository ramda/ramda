var _concat = require('./internal/_concat');
var arity = require('./arity');


/**
 * Wrap a function inside another to allow you to make adjustments to the parameters, or do
 * other processing either before the internal function is called or with its results.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((* -> *) -> ((* -> *), a...) -> (*, a... -> *)
 * @param {Function} fn The function to wrap.
 * @param {Function} wrapper The wrapper function.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var slashify = R.wrap(R.flip(R.add)('/'), function(f, x) {
 *        return R.match(/\/$/, x) ? x : f(x);
 *      });
 *
 *      slashify('a');  //=> 'a/'
 *      slashify('a/'); //=> 'a/'
 */
module.exports = function wrap(fn, wrapper) {
    return arity(fn.length, function() {
        return wrapper.apply(this, _concat([fn], arguments));
    });
};
