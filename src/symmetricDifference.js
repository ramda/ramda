var _curry2 = require('./internal/_curry2');
var concat = require('./concat');
var difference = require('./difference');


/**
 * 寻找一个无重复元素的集合，其元素在且仅在输入集合中的一个里面出现。
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 第1个输入
 * @param {Array} list2 第2个输入
 * @return {Array} 元素仅在list1或list2中出现的集合
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */
module.exports = _curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
