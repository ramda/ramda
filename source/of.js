import _curry2 from './internal/_curry2.js';

/**
 * Given a constructor and a value, returns a new instance of that constructor
 * containing the value.
 *
 * Dispatches to the `fantasy-land/of` method of the constructor first (if present)
 * or to the `of` method last (if present). When neither are present, wraps the
 * value in an array.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig (* -> {*}) -> a -> {a}
 * @param {Object} Ctor A constructor
 * @param {*} val any value
 * @return {*} An instance of the `Ctor` wrapping `val`.
 * @example
 *
 *      R.of(Array, 42);   //=> [42]
 *      R.of(Array, [42]); //=> [[42]]
 *      R.of(Maybe, 42);   //=> Maybe.Just(42)
 */
var of = _curry2(function of(Ctor, val) {
  return (
    typeof Ctor['fantasy-land/of'] === 'function'
      ? Ctor['fantasy-land/of'](val)
      : typeof Ctor.of === 'function'
        ? Ctor.of(val)
        : [val]
  );
});

export default of;
