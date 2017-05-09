var _curry1 = require('./internal/_curry1');
var _of = require('./internal/_of');


/**
 * 返回包含所提供值的一个单例数组。
 *
 * 注意这里的`of`和ES6中的`of`是不同的；详见
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */
module.exports = _curry1(_of);
