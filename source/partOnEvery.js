 import _curry2 from './internal/_curry2';

/**
 * Partitions a collection into slices on every occurrence of a value.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> [a] -> Boolean -> [[a]]
 * @param {Number} n
 * @param {Array} list
 * @param {Boolean} incDelimator
 * @return {Array}
 * @example
 *
 *      R.partOnEvery(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7]); //=> [[1],[2,3],[2,4,5],[2,6,7]]
 *      R.partOnEvery(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7],true); //=> [[1],[3],[4,5],[6,7]]
 */
var partOnEvery = _curry2(function partOnEvery(n, list,incDelimator) {
    const acc = [];
    let curr = [];
    for(let i=0;i<list.length;i++){

      incDelimator && list[i] !== n && curr.push(list[i]);
      !incDelimator  && curr.push(list[i]);
      if( i < list.length-1 && list[i+1] === n || i===list.length-1){
          acc.push(curr);
          curr = []; 
        }
      }
      return acc
});
export default partOnEvery;
