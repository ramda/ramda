import hasPath from './hasPath.js';
import _isPlaceholder from './internal/_isPlaceholder.js';
import _filter from './internal/_filter';
import _curry2 from './internal/_curry2';

/**
 * Returns a curried equivalent of the provided function with named parameters.
 * Has all the capabilities of curry, but with named parameters. Supports nested paths as well.
 * All paths entered as the first argument must be fulfilled before the function is executed.
 * The following are equivalent, though returned order is not guaranteed:
 *
 *   - `g({ a: 1 })({ b: 2 })({ c: 3 })`
 *   - `g({ a: 1 })({ b: 2, c: 3 })`
 *   - `g({ b: 2, c: 3 })({ a: 1 })`
 *   - `g({ c: 3, b: 2, a: 1 })`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Array} paths Array of required paths in object argument.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.path, R.curryN, R.curry, R.partial
 * @example
 *
 *      const addFourNumbers = ({ a, b, c, e }) => a + b + c.d + e;
 *
 *      const curriedAddFourNumbers = R.namedCurry([['a'], ['b'], ['c', 'd'], ['e']], addFourNumbers);
 *      const f = curriedAddFourNumbers({ b: 1, c: { d: 2 } });
 *      const g = f({ a: 3 });
 *      g({ e: 4 }); //=> 10
 */

function accumulate(paths, props) {
  return _filter((p) => {
    return !hasPath(p, props);
  }, paths);
}

function curryPaths(paths, fn, acc) {
  return (props) => {
    const needed = accumulate(paths, props);
    const nextObj = Object.assign({}, acc, props);

    return needed.length ? curryPaths(needed, fn, nextObj) : fn.call(this, nextObj);
  };
}

var namedCurry = _curry2(function(paths, fn) {
  return curryPaths(paths, fn, {});
});

export default namedCurry;
