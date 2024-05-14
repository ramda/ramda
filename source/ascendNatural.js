import curry from './curry.js';


/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with natural sorting using localeCompare.
 *
 * @func
 * @memberOf R
 * @since v0.30.1
 * @category Function
 * @sig Ord b => s -> (a -> b) -> a -> a -> Number
 * @param {String|Array} locales A string with a BCP 47 language tag, or an array of such strings. Corresponds to the locales parameter of the Intl.Collator() constructor.
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if a occurs before b, `1` if a occurs after b, otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const unsorted = ['3', '1', '10', 'Ørjan', 'Bob', 'Älva'];
 *
 *      R.sort(R.ascendNatural('en', R.identity), unsorted);
 *      // => ['1', '3', '10', 'Älva', 'Bob', 'Ørjan']
 *
 *      R.sort(R.ascendNatural('sv', R.identity), unsorted);
 *      // => ['1', '3', '10', 'Bob', 'Älva', 'Ørjan']
 *
 *     R.sort(R.ascend(R.identity), unsorted);
 *      // => ['1', '10', '3', 'Bob', 'Älva', 'Ørjan']
 */
var ascendNatural = curry(function ascendNatural(locales, fn, a, b) {
  const aa = fn(a);
  const bb = fn(b);
  return aa.localeCompare(bb, locales, { numeric: true });
});
export default ascendNatural;
