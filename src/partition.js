var _curry2 = require('./internal/_curry2');


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
  var pass = [];
  var fail = [];
  var idx = -1;
  var len = list.length;
  while (++idx < len) {
    var val = list[idx];
    (pred(val) ? pass : fail).push(val);
  }
  return [pass, fail];
});
