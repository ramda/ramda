import _curry1 from './internal/_curry1';
import pair from './pair';

/**
 * Takes a list and returns a sequence of each element in the input sequence and
 * its predecessor, with the exception of the first element which is only
 * returned as the predecessor of the second element.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a,b,c] -> [[a,b],[b,c]]
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.pairwise([1, 2, 3]); //=> [[1,2], [2,3]]
 */
var pairwise = _curry1(function(list) {
  var pairs = [];
  var l = list.length - 1;
  for (var i = 0; i < l; i = i + 1) {
    pairs.push(pair(list[i], list[i + 1]));
  }
  return pairs;
});

export default pairwise;
