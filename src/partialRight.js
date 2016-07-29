var __ = require('./__');
var _curry2 = require('./internal/_curry2');
var partial = require('./partial');


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * `partialRight` also accepts the special placeholder value, `R.__`, used to
 * specify "gaps" within the arguments.
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
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 */
module.exports = _curry2(function partialRight(fn, partialArgs) {
  var leftArgs = [];
  var leftN = fn.length - partialArgs.length;
  while (leftN > 0) {
    leftArgs.push(__);
    leftN = leftN - 1;
  }
  return partial(fn, leftArgs.concat(partialArgs));
});
