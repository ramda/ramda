var identity = require('./identity');
var uniqBy = require('./uniqBy');


/**
 * 返回不重复的元素集合。比较函数是`R.equals`。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list 待处理的集合
 * @return {Array} 不重复元素的集合
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */
module.exports = uniqBy(identity);
