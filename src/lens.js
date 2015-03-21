var _curry2 = require('./internal/_curry2');


/**
 * Creates a lens. Supply a function to `get` values from inside an object, and a `set`
 * function to change values on an object. (n.b.: This can, and should, be done without
 * mutating the original object!) The lens is a function wrapped around the input `get`
 * function, with the `set` function attached as a property on the wrapper. A `map`
 * function is also attached to the returned function that takes a function to operate
 * on the specified (`get`) property, which is then `set` before returning. The attached
 * `set` and `map` functions are curried.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (k -> v) -> (v -> a -> *) -> (a -> b)
 * @param {Function} get A function that gets a value by property name
 * @param {Function} set A function that sets a value by property name
 * @return {Function} the returned function has `set` and `map` properties that are
 *         also curried functions.
 * @example
 *
 *     var headLens = R.lens(
 *       function get(arr) { return arr[0]; },
 *       function set(val, arr) { return [val].concat(arr.slice(1)); }
 *     );
 *     headLens([10, 20, 30, 40]); //=> 10
 *     headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
 *     headLens.map(function(x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
 *
 *     var phraseLens = R.lens(
 *       function get(obj) { return obj.phrase; },
 *       function set(val, obj) {
 *         var out = R.clone(obj);
 *         out.phrase = val;
 *         return out;
 *       }
 *     );
 *     var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!'};
 *     var obj2 = { phrase: "What's all this, then?"};
 *     phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
 *     phraseLens(obj2); // => "What's all this, then?"
 *     phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
 *     phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
 */
module.exports = _curry2(function lens(get, set) {
  var lns = function(a) { return get(a); };
  lns.set = _curry2(set);
  lns.map = _curry2(function(fn, a) { return set(fn(get(a)), a); });
  return lns;
});
