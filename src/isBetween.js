var _curry3 = require('./internal/_curry3');


/**
 * Checks if a given number is between min and max values.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Number -> Number -> Number -> Boolean
 * @param {Number} min The min value.
 * @param {Number} min The max value.
 * @param {Number} min The value to be checked.
 * @return {Boolean}
 * @example
 *
 *      R.isBetween(1, 3, 2);     //=> true
 *      R.isBetween(1, 3, 4);     //=> false
 */
module.exports = _curry3(function isBetween(min, max, num) {
  return num >= min && num <= max;
});
