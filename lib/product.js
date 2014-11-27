/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @category math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
R.product = reduce(_multiply, 1);
