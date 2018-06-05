import _curry2 from './internal/_curry2';


/**
 * Returns the opposite value comparing against a given set of two values.
 *
 * @func
 * @memberOf R
 * @category Function
 * @param {*} val
 * @param {Array} vals
 * @return {*}
 * @example
 *
 *      R.toggle("on", ["on", "off"]);       //=>  "off"
 *      R.toggle("inactive", ["active", "inactive"]);      //=> "active"
 *      R.toggle(10, [10, 100]); //=> 100
 */
var toggle = _curry2(function toggle(val, vals) {
  return val == vals[0] ? vals[1] : vals[0];
});
export default toggle;
