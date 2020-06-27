import curryN from './curryN.js';
import curry from './curry.js';
import fromPairs from './fromPairs.js';
import toPairs from './toPairs.js';
import _isPlaceholder from './internal/_isPlaceholder.js';
import filter from './filter.js';
import concat from './concat.js';
import compose from './compose.js';
import keys from './keys.js';

/**
 * Returns a curried equivalent of the provided function with named parameters.
 * Has all the capabilities of curryN, but with named parameters.
 * The following are equivalent, though returned order is not guaranteed:
 *
 *   - `g({ a: 1 })({ b: 2 })({ c: 3 })`
 *   - `g({ a: 1 })({ b: 2, c: 3 })`
 *   - `g({ b: 2, c: 3 })({ a: 1 })`
 *   - `g({ c: 3, b: 2, a: 1 })`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g({ a: 3, b: 2, c: 1 })`
 *   - `g({ a: 3, b: _, c: 1 })({ b: 2 })`
 *   - `g({ a: _, b: _, c: _ })({ b: 2, a: 3 })({ c: 1 })`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.curry, R.partial
 * @example
 *
 *      const addFourNumbers = ({ a, b, c, d }) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.namedCurryN(4, addFourNumbers);
 *      const f = curriedAddFourNumbers({ b: 1, c: _ });
 *      const g = f({ a: 3 });
 *      g({ d: 4, c: 2 }); //=> 10
 */

function filterPlaceholders(mappedPairs) {
  return filter(function([, val]) {
    return !_isPlaceholder(val);
  }, mappedPairs);
}

function prepareEntries(acc, mappedPairs) {
  return compose(curry(concat)(acc), filterPlaceholders)(mappedPairs);
}

function partialFn(curriedFn, len, acc, props) {
  const mappedPairs = toPairs(props);
  const propsAsEntries = prepareEntries(acc, mappedPairs);

  return keys(propsAsEntries).length >= len ?
    curriedFn.apply(this, propsAsEntries) :
    curry(partialFn)(curriedFn, len, propsAsEntries);
}

function fnToRun(fn, ...args) {
  return fn.call(this, fromPairs(args));
}

function namedCurryN(num = 0, fn) {
  const curriedFnToRun = curryN(2, fnToRun)(fn);
  return curry(partialFn)(curriedFnToRun, num, []);
}

export default namedCurryN;
