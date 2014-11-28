var _slice = require('./_slice');
var arity = require('./arity');
var curry = require('./curry');


/**
 * Accepts a function `fn` and any number of transformer functions and returns a new
 * function. When the new function is invoked, it calls the function `fn` with parameters
 * consisting of the result of calling each supplied handler on successive arguments to the
 * new function.
 *
 * If more arguments are passed to the returned function than transformer functions, those
 * arguments are passed directly to `fn` as additional parameters. If you expect additional
 * arguments that don't need to be transformed, although you can ignore them, it's best to
 * pass an identity function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((* -> *), (* -> *)...) -> (* -> *)
 * @param {Function} fn The function to wrap.
 * @param {...Function} transformers A variable number of transformer functions
 * @return {Function} The wrapped function.
 * @example
 *
 *      // Example 1:
 *
 *      // Number -> [Person] -> [Person]
 *      var byAge = R.useWith(R.filter, R.propEq('age'), R.identity);
 *
 *      var kids = [
 *          {name: 'Abbie', age: 6},
 *          {name: 'Brian', age: 5},
 *          {name: 'Chris', age: 6},
 *          {name: 'David', age: 4},
 *          {name: 'Ellie', age: 5}
 *      ];
 *
 *      byAge(5, kids); //=> [{name: 'Brian', age: 5}, {name: 'Ellie', age: 5}]
 *
 *
 *      // Example 2:
 *
 *      var double = function(y) { return y * 2; };
 *      var square = function(x) { return x * x; };
 *      var add = function(a, b) { return a + b; };
 *      // Adds any number of arguments together
 *      var addAll = function() {
 *        return R.reduce(add, 0, arguments);
 *      };
 *
 *      // Basic example
 *      var addDoubleAndSquare = R.useWith(addAll, double, square);
 *
 *      //≅ addAll(double(10), square(5));
 *      addDoubleAndSquare(10, 5); //=> 45
 *
 *      // Example of passing more arguments than transformers
 *      //≅ addAll(double(10), square(5), 100);
 *      addDoubleAndSquare(10, 5, 100); //=> 145
 *
 *      // But if you're expecting additional arguments that don't need transformation, it's best
 *      // to pass transformer functions so the resulting function has the correct arity
 *      var addDoubleAndSquareWithExtraParams = R.useWith(addAll, double, square, R.identity);
 *      //≅ addAll(double(10), square(5), R.identity(100));
 *      addDoubleAndSquare(10, 5, 100); //=> 145
 */
module.exports = function useWith(fn /*, transformers */) {
    var transformers = _slice(arguments, 1);
    var tlen = transformers.length;
    return curry(arity(tlen, function() {
        var args = [], idx = -1;
        while (++idx < tlen) {
            args[args.length] = transformers[idx](arguments[idx]);
        }
        return fn.apply(this, args.concat(_slice(arguments, tlen)));
    }));
};
