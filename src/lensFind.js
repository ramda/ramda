var __ = require('./__');
var _curry1 = require('./internal/_curry1');
var _curry3 = require('./internal/_curry3');
var findIndex = require('./findIndex');
var map = require('./map');
var update = require('./update');


/**
 * Returns a lens whose focus is the first element that matches the predicate
 *
 * @func
 * @memberOf R
 * @category
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (a -> Boolean) -> Lens s a
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      var xLens = R.lensFind(R.propEq('a', 1));
 *
 *      R.view(xLens, xs);                    //=> {a: 1}
 *      R.set(xLens, {b: 4}, xs);             //=> [{b: 4}, {a: 2}, {a: 3}]
 *      R.over(xLens, R.assoc('a', -1), xs);  //=> [{a: -1}, {a: 2}, {a: 3}]
 */

module.exports = _curry3(function lensFind(pred, toFunctorFn, list) {
    var i = findIndex(pred, list);
    return map(
      _curry1(update(i, __, list)),
      toFunctorFn(list[i])
    );
});
