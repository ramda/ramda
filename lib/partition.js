var _curry2 = require('./_curry2');
var reduce = require('./reduce');


/**
 * Takes a predicate and a list and returns the pair of lists of
 * elements which do and do not satisfy the predicate, respectively.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a],[a]]
 * @param {Function} pred A predicate to determine which array the element belongs to.
 * @param {Array} list The array to partition.
 * @return {Array} A nested array, containing first an array of elements that satisfied the predicate,
 *         and second an array of elements that did not satisfy.
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      //=> [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 */
module.exports = _curry2(function partition(pred, list) {
    return reduce(function(acc, elt) {
        acc[pred(elt) ? 0 : 1].push(elt);
        return acc;
    }, [[], []], list);
});
