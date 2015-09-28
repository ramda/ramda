var _arity = require('./internal/_arity');
var _slice = require('./internal/_slice');
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
 * @sig (x1 -> x2 -> ... -> z) -> ((a -> x1), (b -> x2), ...) -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {...Function} transformers A variable number of transformer functions
 * @return {Function} The wrapped function.
 * @example
 *
 *      var double = y => y * 2;
 *      var square = x => x * x;
 *      var addAll = R.unapply(R.sum);
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
 *      var people = [
 *        { name: 'Alice', age: 20 },
 *        { name: 'Bob',   age: 10 },
 *        { name: 'Clara', age: 30 }
 *      ];
 *
 *      //  findByAge :: Number -> [Object] -> Object
 *      var findByAge = R.useWith(R.find, R.propEq('age'), R.identity);
 *      //≅ R.find(R.propEq('age', 10), R.identity(people)
 *      findByAge(10, people) //=>  { name: 'Bob', age: 10 };
 */
module.exports = curry(function useWith(fn /*, transformers */) {
  var transformers = _slice(arguments, 1);
  var tlen = transformers.length;
  return curry(_arity(tlen, function() {
    var args = [], idx = 0;
    while (idx < tlen) {
      args[idx] = transformers[idx](arguments[idx]);
      idx += 1;
    }
    return fn.apply(this, args.concat(_slice(arguments, tlen)));
  }));
});
