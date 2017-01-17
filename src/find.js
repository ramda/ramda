var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xfind = require('./internal/_xfind');


/**
 * 返回给定的列表中第一个满足 `predicate` 方法的元素，如果没有任何元素满足条件则返回 `undefined` 。
 *
 * 若第二个参数自身存在 `find` 方法，则调用自身的 `find` 方法。
 *
 * 若在列表位置中给出 `transfomer` ，则用作 `transducer` 。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
