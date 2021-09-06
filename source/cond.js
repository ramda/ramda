import _arity from './internal/_arity.js';
import _curry1 from './internal/_curry1.js';
import map from './map.js';
import max from './max.js';
import reduce from './reduce.js';


/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * **Please note**: This is not a direct substitute for a `switch` statement.
 * Remember that both elements of every pair passed to `cond` are *functions*,
 * and `cond` returns a function.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */
var cond = _curry1(function cond(pairs) {
  var arity = reduce(
    max,
    0,
    map(function (pair) { return typeof pair === 'function' ? pair.length : pair[0].length; }, pairs)
  );
  return _arity(arity, function () {
    var idx = 0;
    while (idx < pairs.length) {
      let pair = pairs[idx]
      if (typeof pair === 'function') {
        let transformer = pair.apply(this, arguments)
        if (transformer) {
          return transformer;
        }
      } else if (Array.isArray(pair)) {
        let predicate = pair[0].apply(this, arguments)
        if (predicate) {
          let args = Array.from(arguments)
          args.push(predicate) // transformer(...arguments, predicate(...arguments))
          return pair[1].apply(this, args);
        }
      }
      idx += 1;
    }
  });
});
export default cond;
