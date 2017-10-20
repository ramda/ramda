import Z from 'sanctuary-type-classes';

import _curry2 from './internal/_curry2';


/**
 * Returns a singleton of the type indicated by the
 * [type representative](https://github.com/fantasyland/fantasy-land#type-representatives)
 * (the first argument) containing the given value (the second argument).
 *
 * The type representative may be `Array`, `Function`, or any representative of a type
 * which satisfies [Applicative](https://github.com/fantasyland/fantasy-land#applicative).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig Applicative f => TypeRep f -> a -> f a
 * @param {*} typeRep
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.of(Array, null); //=> [null]
 *      R.of(Array, [42]); //=> [[42]]
 *      R.of(Maybe, 'yo'); //=> Just('yo')
 */
var of = _curry2(Z.of);
export default of;
