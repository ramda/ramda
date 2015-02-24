var _concat = require('./internal/_concat');
var _createPartialApplicator = require('./internal/_createPartialApplicator');
var curry = require('./curry');


/**
 * Accepts as its arguments a function and any number of values and returns a function that,
 * when invoked, calls the original function with all of the values prepended to the
 * original function's arguments list. In some libraries this function is named `applyLeft`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b -> ... -> i -> j -> ... -> m -> n) -> a -> b-> ... -> i -> (j -> ... -> m -> n)
 * @param {Function} fn The function to invoke.
 * @param {...*} [args] Arguments to prepend to `fn` when the returned function is invoked.
 * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn`
 *         with `args` prepended to `fn`'s arguments list.
 * @example
 *
 *      var multiply = function(a, b) { return a * b; };
 *      var double = R.partial(multiply, 2);
 *      double(2); //=> 4
 *
 *      var greet = function(salutation, title, firstName, lastName) {
 *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *      };
 *      var sayHello = R.partial(greet, 'Hello');
 *      var sayHelloToMs = R.partial(sayHello, 'Ms.');
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 */
module.exports = curry(_createPartialApplicator(_concat));
