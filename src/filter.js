var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _filter = require('./internal/_filter');
var _isObject = require('./internal/_isObject');
var _reduce = require('./internal/_reduce');
var _xfilter = require('./internal/_xfilter');
var keys = require('./keys');


/**
 * 接收一个 `predicate` 方法和一个 `filterable` 元素作为参数，返回一个新的相同类型的但
 * 是只包含满足 `predicate` 方法成员的 `filterable` 元素。
 *
 * 若第二个参数自身存在 `empty` 方法，则调用自身的 `empty` 方法。
 *
 * 若在列表位置中给出 `transfomer` ，则用作 `transducer` 。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
module.exports = _curry2(_dispatchable(['filter'], _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) :
    // else
      _filter(pred, filterable)
  );
}));
