import _curry2 from './internal/_curry2';
import _reduce from './internal/_reduce';

/**
 * Splits a list into sub-lists, based on the result of calling a String-returning function on each element,
 * and grouping the results according to values returned.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> String) -> [a] -> [[a]]
 * @param {Function} fn Function :: a -> String
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
  }, {}, list);
  var newList = [];
  for (var tag in group) { newList.push(group[tag]); }
  return newList;
});
export default collectBy;
