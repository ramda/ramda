import _curry3 from './internal/_curry3.js';
import nth from './nth.js';
import equals from './equals.js';


/**
 * Returns `true` if the nth element (or if n is negative the element
 * at index length + n) of the given list or string is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v2.7.2
 * @category Relation
 * @sig Number -> a -> Object -> Boolean
 * @param {Number} offset
 * @param {*} val
 * @param {*} list
 * @return {Boolean}
 * @see R.equals
 * @example
 *
 *      const labels = ['snack', 'seat', 'exam'];
 *      const bobby = ['apple', '1A', 'math'];
 *      const claire = ['apple', '1B', 'economics'];
 *      const fred = ['PB & J', '2a', 'math'];
 *      const jess = ['brisket', '2B', 'english'];
 *      const examinees = {
 *        bobby,
 *        claire,
 *        fred,
 *        jess,
 *      };
 *      const takingMathExam = R.nth(2, 'math');
 *      R.filter(takingMathExamm, examinees); //=> [fred, rusty]
 */
var nthEq = _curry3(function nthEq(offset, val, list) {
  return equals(val, nth(offset, list));
});
export default nthEq;
