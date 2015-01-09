var _concat = require('./internal/_concat');
var arity = require('./arity');


/**
 * Wrap a function inside another to allow you to make adjustments to the parameters, or do
 * other processing either before the internal function is called or with its results.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
 * @param {Function} fn The function to wrap.
 * @param {Function} wrapper The wrapper function.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var greet = function(name) {return 'Hello ' + name;};
 *
 *      var shoutedGreet = wrap(greet, function(greet, name) {
 *          return greet.name().toUpperCase();
 *      });
 *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
 *
 *      var shortenedGreet = wrap(greet, function(greet, name) {
 *          return greet(name.substring(0, 3));
 *      });
 *      shortenedGreet("Robert"); //=> "Hello Rob"
 *
 */
module.exports = function wrap(fn, wrapper) {
    return arity(fn.length, function() {
        return wrapper.apply(this, _concat([fn], arguments));
    });
};
