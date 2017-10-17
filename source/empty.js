import Z from 'sanctuary-type-classes';

import _curry1 from './internal/_curry1';


/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), and String (`''`). Other
 * types are supported if they implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig Monoid m => m -> m
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */
var empty = _curry1(function empty(x) {
  return Z.empty(x.constructor);
});
export default empty;
