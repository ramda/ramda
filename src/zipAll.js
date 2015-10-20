var _curry1 = require('./internal/_curry1');

/**
* Creates a new list out of the lists supplied by matching
* equally positioned items from both lists. The returned list is
* truncated to the length of the shorter of the two input lists.
*
* @func
* @memberOf R
* @category List
* @sig [a] -> [a]
* @param {Array} List of arrays to consider
* @return {Array} The list made by paring up same indexed elements of supplied list.
* @example
*
* R.zipAll([[1, 2, 3], ['a', 'b', 'c'], ['A', 'B', 'C']]) //=> [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C']]
*/
module.exports = _curry1(function zipAll(list) {
  var rv = [];
  var idx = list.length - 1;
  var len = list[0].length || 0;
  while (list[idx]) {
    len = Math.min(len, list[idx].length);
    idx -= 1;
  }

  idx = 0;
  var j = 0;
  while (idx < len) {
    rv[idx] = [];
    j = 0;
    while (j < list.length) {
      rv[idx].push(list[j][idx]);
      j += 1;
    }
    idx += 1;
  }
  return rv;
});
