import _arity from './internal/_arity.js';
import _curry2 from './internal/_curry2.js';
import insertAll from './insertAll.js';

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */
var partialRight = _curry2(function partialRight(fn, partialArgs) {
  if (partialArgs.length >= fn.length) {
    return fn.apply(this, partialArgs);
  } else {
    var restLength = fn.length - partialArgs.length;
    return _arity(restLength, function() {
      return fn.apply(this, insertAll(restLength, partialArgs, arguments));
    });
  }
});

export default partialRight;
