var _concat = require('./_concat');
var _createPartialApplicator = require('./_createPartialApplicator');
var flip = require('./flip');


/**
 * Accepts as its arguments a function and any number of values and returns a function that,
 * when invoked, calls the original function with all of the values appended to the original
 * function's arguments list.
 *
 * Note that `rPartial` is the opposite of `lPartial`: `rPartial` fills `fn`'s arguments
 * from the right to the left.  In some libraries this function is named `applyRight`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b-> ... -> i -> j -> ... -> m -> n) -> j -> ... -> m -> n -> (a -> b-> ... -> i)
 * @param {Function} fn The function to invoke.
 * @param {...*} [args] Arguments to append to `fn` when the returned function is invoked.
 * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn` with
 *         `args` appended to `fn`'s arguments list.
 * @example
 *
 *      var greet = function(salutation, title, firstName, lastName) {
 *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *      };
 *      var greetMsJaneJones = R.rPartial(greet, 'Ms.', 'Jane', 'Jones');
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 */
module.exports = _createPartialApplicator(flip(_concat));
