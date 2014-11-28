var _slice = require('./_slice');
var curryN = require('./curryN');


/**
 * Turns a named method with a specified arity into a function
 * that can be called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `len + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (Number, String) -> (a... -> c -> b)
 * @param {Number} len Number of arguments the returned function should take
 *        before the target object.
 * @param {Function} method Name of the method to call.
 * @return {Function} A new curried function.
 * @example
 *
 *      var sliceFrom = R.invokerN(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invokerN(2, 'slice', 6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 */
module.exports = function invokerN(arity, method) {
    var initialArgs = _slice(arguments, 2);
    var len = arity - initialArgs.length;
    return curryN(len + 1, function() {
        var target = arguments[len];
        var args = initialArgs.concat(_slice(arguments, 0, len));
        return target[method].apply(target, args);
    });
};
