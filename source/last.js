import _curry1 from './internal/_curry1.js';
import _nth from './internal/_nth.js';


/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String | Undefined
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last([1, 2, 3]);  //=> 3
 *      R.last([1]);        //=> 1
 *      R.last([]);         //=> undefined
 *
 *      R.last('abc');  //=> 'c'
 *      R.last('a');    //=> 'a'
 *      R.last('');     //=> undefined
 */
var last = _curry1(function(list) {
  return _nth(-1, list);
});
export default last;
