var _curry1 = require('./internal/_curry1');
var lens = require('./lens');


/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @category Object
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */
module.exports = _curry1(function lensProp(k) {
  return lens(
    function(_o) {
      var o = _o == null ? {} : _o;
      return o[k];
    },
    function(v, _o) {
      var o = _o == null ? {} : _o;
      var result = {};
      for (var p in o) {
        result[p] = o[p];
      }
      result[k] = v;
      return result;
    }
  );
});
