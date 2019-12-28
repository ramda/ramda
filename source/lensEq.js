import _curry3 from './internal/_curry3';
import view from './view';
import equals from './equals';


/**
 * Returns `true` if the property, path, index, the lens focused on, is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Relation
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> Boolean
 * @param {Lens} lens
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.lensSatisfies
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', family: { father: 'Jones' }};
 *      const kids = ['abby', 'fred', 'rusty', 'alois'];
 *
 *      const ageLens = R.lens(R.prop('age'), R.assoc('age'));
 *      const hairPropLens = R.lensProp('hair');
 *      const fatherPathLens = R.lensPath(['family', 'father']);
 *      const secondIndexLens = R.lensIndex(1);
 *
 *      R.lensEq(ageLens, 7, abby); //=> true
 *      R.lensEq(hairPropLens, 'blond', abby); //=> true
 *      R.lensEq(fatherPathLens, 'Jones', abby); //=> true
 *      R.lensEq(secondIndexLens, 'fred', kids); //=> true
 */
var lensEq = _curry3(function lensEq(lens, val, obj) {
  return equals(view(lens, obj), val);
});
export default lensEq;
