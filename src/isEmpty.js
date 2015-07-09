var _curry1 = require('./internal/_curry1');


/**
 * Reports whether the list has zero elements.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig [a] -> Boolean
 * @param {Array} list
 * @return {Boolean}
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty('foo');        //=> false
 */
module.exports = _curry1(function isEmpty(list) {
  return Object(list).length === 0;
});
