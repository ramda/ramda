import _curry2 from './internal/_curry2.js';
import _isString from './internal/_isString.js';
import _isArray from './internal/_isArray.js';
import _isFunction from './internal/_isFunction.js';
import toString from './toString.js';
import andThen from './andThen.js';

var symbolIterator = Symbol == null || Symbol.iterator == null ? 'Symbol(Symbol.iterator)' : Symbol.iterator;

var _isIterator = function(a) {
  return a[symbolIterator] != null;
};

/**
 * Returns a single Promise that resolves to an array of the results of the input promises.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Function
 * @sig ([a] -> b) -> [a] -> (Promise e b)
 * @param {Function} f The function which will be called with an array.
 * @param {*} ps a value or an array.
 * @return {Promise} The result of calling `Promise.all(ps).then(f)`
 * @example
 *     const foo = Promise.resolve('foo')
 *     const bar = Promise.resolve('bar')
 *
 *     R.allThen(xs => xs.join ('|'))([foo, bar])
 *      .then (console .log) //~> "foo|bar"
 *
 */
var allThen = _curry2(function allThen(f, ps) {
  if (Promise == null || !_isFunction(Promise.all)) {
    throw new Error('Promise is not defined');
  }

  if (!(_isString(ps) || _isArray(ps) || _isIterator(ps))) {
    throw new TypeError(toString(ps) + ' is not iterable');
  }

  return andThen(f, Promise.all(ps));
});

export default allThen;
