import _curry2 from './internal/_curry2.js';
import _reduce from './internal/_reduce.js';

/**
 * Splits a list into sub-lists, based on the result of calling a key-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx a => (b -> a) -> [b] -> [[b]]
 * @param {Function} fn Function :: a -> Idx
 * @param {Array} list The array to group
 * @return {Array}
 *    An array of arrays where each sub-array contains items for which
 *    the String-returning function has returned the same value.
 * @see R.groupBy, R.partition
 * @example
 *      R.collectBy(R.prop('type'), [
 *        {type: 'breakfast', item: '☕️'},
 *        {type: 'lunch', item: '🌯'},
 *        {type: 'dinner', item: '🍝'},
 *        {type: 'breakfast', item: '🥐'},
 *        {type: 'lunch', item: '🍕'}
 *      ]);
 *
 *      // [ [ {type: 'breakfast', item: '☕️'},
 *      //     {type: 'breakfast', item: '🥐'} ],
 *      //   [ {type: 'lunch', item: '🌯'},
 *      //     {type: 'lunch', item: '🍕'} ],
 *      //   [ {type: 'dinner', item: '🍝'} ] ]
 */
var collectBy = _curry2(function collectBy(fn, list) {
  var group = _reduce(function(o, x) {
    var tag = fn(x);
    if (o[tag] === undefined) { o[tag] = []; }
    o[tag].push(x);
    return o;
  }, Object.create(null), list);
  var newList = [];
  for (var tag in group) { newList.push(group[tag]); }
  if (typeof Object.getOwnPropertySymbols === 'function') {
    var symbols = Object.getOwnPropertySymbols(group);
    for (var i = 0; i < symbols.length; i += 1) {
      newList.push(group[symbols[i]]);
    }
  }
  return newList;
});
export default collectBy;
