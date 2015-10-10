var allUniq = require('./allUniq');


/**
 * Returns `true` if all elements are unique, in `R.equals` terms,
 * otherwise `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if all elements are unique, else `false`.
 * @see R.allUniq
 * @deprecated since v0.18.0
 * @example
 *
 *      R.isSet(['1', 1]); //=> true
 *      R.isSet([1, 1]);   //=> false
 *      R.isSet([[42], [42]]); //=> false
 */
module.exports = allUniq;
