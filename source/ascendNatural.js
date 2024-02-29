import _curry3 from './internal/_curry3.js';


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with natural sorting using localeCompare.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if a occurs before b, `1` if a occurs after b, otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byTitle = R.ascendNatural(R.prop('title'));
 *      const books = [
 *        { author: 'Jay Asher', title: '13 Reasons Why' },
 *        { author: 'Gabriel García Márquez', title: '100 Years of Solitude' },
*         { author: 'Jordan B. Peterson', title: '12 Rules for Life' },
 *      ];
 *      const booksByTitleAsc = R.sort(byTitle, books);
 *        //=> [{ author: 'Jordan B. Peterson', title: '12 Rules for Life' },{ author: 'Jay Asher', title: '13 Reasons Why' }, { author: 'Gabriel García Márquez', title: '100 Years of Solitude' }]
 */
var ascendNatural = _curry3(function ascendNatural(fn, a, b) {
  const aa = fn(a);
  const bb = fn(b);
  return aa.localeCompare(bb, undefined, { numeric: true });
});
export default ascendNatural;
