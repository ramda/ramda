import _curry2 from './internal/_curry2';
import _map from './internal/_map';


/**
 * Accepts an object or array of arity 1 functions which will be applied to the supplied
 * data. The results will be returned as an array in the original order.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ([fns], a) -> [b]
 * @param {fns} functions A list of functions.
 * @param {a} the value supplied to all functions
 * @return {Array} a list of results of applying functions to a
 * @see R.converge
 * @example
 *
 *      const average = R.diverge([R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> [28, 7]
 *
 *      const strangeConcat = R.diverge(upper: R.toUpper, lower: R.toLower})
 *      strangeConcat("Yodel") //=> {upper: "YODEL", lower: "yodel"}
 *
 * @symb R.diverge([g, h], a) = [g(a), h(a)]
 */
var diverge = _curry2(function diverge(fns, data) {
  return _map(function(fn) {
    return fn(data);
  }, fns);
});
export default diverge;
