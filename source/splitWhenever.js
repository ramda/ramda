 import _curryN from './internal/_curryN';
/**
 * Splits an array into slices on every occurrence of a value.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig a -> [a] -> [[a]]
 * @sig a -> [a] -> Boolean -> [[a]]
 * @param {Number} n
 * @param {Array} list
 * @param {Boolean} incDelimiter
 * @return {Array}
 * @example
 *
 *      R.splitWhenever(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7],true); //=> [[1],[2,3],[2,4,5],[2,6,7]]
 *      R.splitWhenever(2, [1, 2, 3 ,2, 4, 5, 2, 6, 7]); //=> [[1],[3],[4,5],[6,7]]
 */
var splitWhenever = _curryN(2, [], function splitWhenever(n, list, incDelimiter) {
  var acc = [];
  var curr = [];
  for(var i=0;i<list.length;i++){
      curr.push(list[i]);
    if( i < list.length-1 && list[i+1] === n || i===list.length-1){
      if(incDelimiter === true){
          acc.push(curr)
      } 
      else{
        (curr[0] === n  && curr.length > 1 ) && curr.shift();
        !(curr.length === 1 && curr[0] === n ) && acc.push(curr)
      }
      curr = []; 
      }
    }
    return acc
});
export default splitWhenever;
