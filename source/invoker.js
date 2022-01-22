import _curry2 from './internal/_curry2.js';
import _isFunction from './internal/_isFunction.js';
import curryN from './curryN.js';
import toString from './toString.js';


/**
 * Given an `arity` (Number) and a `name` (String) the `invoker` function
 * returns a curried function that takes `arity` arguments and a `context`
 * object. It will "invoke" the `name`'d function (a method) on the `context`
 * object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *      // A function with no arguments
 *      const asJson = invoker(0, "json")
 *      // Just like calling .then((response) => response.json())
 *      fetch("http://example.com/index.json").then(asJson)
 *
 *      // A function with one argument
 *      var sliceFrom = invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *
 *      // A function with two arguments
 *      var sliceFrom6 = invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      // NOTE: You can't simply pass some of the arguments to the initial invoker function.
 *      const firstCreditCardSection = invoker(2, "slice", 0, 4)
 *      firstCreditCardSection("4242 4242 4242 4242") // => Function<...>
 *
 *      // Since invoker returns a curried function, you may partially apply it to create the function you need.
 *      const firstCreditCardSection = invoker(2, "slice")(0, 4)
 *      firstCreditCardSection("4242 4242 4242 4242") // => "4242"
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */
var invoker = _curry2(function invoker(arity, method) {
  return curryN(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});
export default invoker;
