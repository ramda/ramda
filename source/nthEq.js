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
 * @sig Number -> a -> [a] -> Boolean
 * @sig Number -> String -> String -> Boolean
 * @param {Number} offset
 * @param {*} val
 * @param {*} list
 * @return {Boolean}
 * @see R.nth, R.equals
 * @example
 *
 *      const labels = {
 *        snack: 0,
 *        seat: 1,
 *        exam: 2,
 *      };
 *      const examinees = {
 *        bobby: ['apple', '1A', 'math'],
 *        claire: ['apple', '1B', 'economics'],
 *        fred: ['PB & J', '2A', 'math'],
 *        jess: ['brisket', '2B', 'english'],
 *      };
 *      const takingMathExam = R.nthEq(labels.exam, 'math');
 *      const seatsForMathExam = R.pipe(
 *        R.filter(takingMathExam), //=> {"bobby": ["apple", "1A", "math"], "fred": ["PB & J", "2A", "math"]}
 *        R.values, //=>[["apple", "1A", "math"], ["PB & J", "2A", "math"]]
 *        R.map(R.nth(labels.seat)) //=>["1A", "2A"]
 *      );
 *      seatsForMathExam(examinees) //=>["1A", "2A"]
 */
var nthEq = _curry3(function nthEq(offset, val, list) {
  return equals(val, nth(offset, list));
});
export default nthEq;
