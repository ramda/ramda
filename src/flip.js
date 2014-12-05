var _concat = require('./internal/_concat');
var _noArgsException = require('./internal/_noArgsException');
var _slice = require('./internal/_slice');


/**
 * Returns a new function much like the supplied one, except that the first two arguments'
 * order is reversed.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = function(a, b, c) {
 *        return ([]).concat(a, b, c);
 *      };
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 */
module.exports = function flip(fn) {
    return function(a, b) {
        switch (arguments.length) {
            case 0: throw _noArgsException();
            case 1: return function(b) { return fn.apply(this, [b, a].concat(_slice(arguments, 1))); };
            default: return fn.apply(this, _concat([b, a], _slice(arguments, 2)));
        }
    };
};
