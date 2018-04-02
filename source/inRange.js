import _curry2 from './internal/_curry2';

/**
 * See if an number (`val`) is within an array of two numbers ('list').
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Array} list An array of numbers
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.inRange(4, [1, 5]); //=> true
 *      R.inRange(2.1, [3, 5]); //=> false

 */
var inRange = _curry2(function inRange(val, list) {
    const sortedList = list.sort(function(a,b) { return a - b;})
    if (val >= sortedList[0] && val <= sortedList[1]){
        return true
    }
    return false
});
export default inRange;
