/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 * @example
 *
 *      var addThree = function(a, b, c) {
 *        return a + b + c;
 *      };
 *
 *      var curriedAddThree = _curry3(addThree);
 */
function _curry3(fn) {
    return function(a, b, c) {
        switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return _curry2(function(b, c) {
                    return fn(a, b, c);
                });
            case 2:
                return function(c) {
                    return fn(a, b, c);
                };
            default:
                return fn(a, b, c);
        }
    };
}
