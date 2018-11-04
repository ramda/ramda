import _curry2 from './internal/_curry2';


/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 *
 * Dispatches to the `of` method of the first argument, if present.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig (* -> {*}) -> a -> {a}
 * @param {Object} ctor A constructor
 * @param {*} val any value
 * @return {*} An instance of the `ctor` wrapping `val`.
 * @example
 *
 *      R.of(Array, null); //=> [null]
 *      R.of(Array, [42]); //=> [[42]]
 *      R.of(Maybe, 42);   //=> Maybe.Just(42)
 */

var of = _curry2(function of(Ctor, val) {
  return (
    typeof Ctor['fantasy-land/of'] === 'function' ?
      Ctor['fantasy-land/of'](val) :
    typeof Ctor.of === 'function' ?
      Ctor.of(val) :
    [val]
  );
});
export default of;
