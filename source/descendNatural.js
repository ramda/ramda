import curry from './curry.js';


/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with natural sorting using Intl.Collator.
 *
 * @func
 * @memberOf R
 * @since v0.30.1
 * @category Function
 * @sig Ord b => s -> (a -> b) -> a -> a -> Number
 * @param {String|Array} locales A string with a BCP 47 language tag or an Intl.Locale instance, or an array of such locale identifiers. The runtime's default locale is used when undefined is passed or when none of the specified locale identifiers is supported.
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if a occurs after b, `1` if a occurs before b, otherwise `0`
 * @see R.descend
 * @example
 *
 *      const unsorted = ['3', '1', '10', 'Ørjan', 'Bob', 'Älva'];
 *
 *      R.sort(R.descendNatural('en', R.identity), unsorted);
 *      // => ['Ørjan', 'Bob', 'Älva', '10', '3', '1']
 *
 *      R.sort(R.descendNatural('sv', R.identity), unsorted);
 *      // => ['Ørjan', 'Älva', 'Bob', '10', '3', '1']
 *
 *     R.sort(R.descend(R.identity), unsorted);
 *      // => ['Ørjan', 'Älva', 'Bob', '3', '10', '1']
 */
var descendNatural = curry(function descendNatural(locales, fn, a, b) {
  const aa = fn(a);
  const bb = fn(b);
  return bb.localeCompare(aa, locales, { numeric: true });
});
export default descendNatural;
