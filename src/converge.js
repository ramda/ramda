var _map = require('./internal/_map');
var _slice = require('./internal/_slice');


/**
 * Accepts at least three functions and returns a new function. When invoked, this new
 * function will invoke the first function, `after`, passing as its arguments the
 * results of invoking the subsequent functions with whatever arguments are passed to
 * the new function.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((*... -> c) -> (((* -> a), (* -> b), ...) -> c)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {...Function} functions A variable number of functions.
 * @return {Function} A new function.
 * @example
 *
 *      var add = function(a, b) { return a + b; };
 *      var multiply = function(a, b) { return a * b; };
 *      var subtract = function(a, b) { return a - b; };
 *
 *      //≅ multiply( add(1, 2), subtract(1, 2) );
 *      R.converge(multiply, add, subtract)(1, 2); //=> -3
 *
 *      var add3 = function(a, b, c) { return a + b + c; };
 *      R.converge(add3, multiply, add, subtract)(1, 2); //=> 4
 */
module.exports = function(after) {
    var fns = _slice(arguments, 1);
    return function() {
        var args = arguments;
        return after.apply(this, _map(function(fn) {
            return fn.apply(this, args);
        }, fns));
    };
};
