/**
 * Makes a comparator function out of a function that reports whether the first element is less than the second.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a, b -> Boolean) -> (a, b -> Number)
 * @param {Function} pred A predicate function of arity two.
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
 * @example
 *
 *      var cmp = R.comparator(function(a, b) {
 *        return a.age < b.age;
 *      });
 *      var people = [
 *        // ...
 *      ];
 *      R.sort(cmp, people);
 */
module.exports = function comparator(pred) {
    return function(a, b) {
        return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
    };
};
