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
 *      R.isEmpty([1, 2, 3]); //=> false
 *      R.isEmpty([]); //=> true
 *      R.isEmpty(''); //=> true
 *      R.isEmpty(null); //=> false
 */
module.exports = function isEmpty(list) {
    return Object(list).length === 0;
};
