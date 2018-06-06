import _curry2 from './internal/_curry2';
import _equals from './internal/_equals';


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
 *      R.toggle(['on', 'off'], 'on');       //=>  'off'
 *      R.toggle(['active', 'inactive'], 'inactive');      //=> 'active'
 *      R.toggle([10, 100], 10); //=> 100
 *      R.toggle(['on', 'off'], 'other'); //=> 'other'
 */
var toggle = _curry2(function toggle(vals, val) {

  if (vals.length < 2) {
    return val;
  }

  if (_equals(val, vals[0], [], [])) {
    return vals[1];
  }

  if (_equals(val, vals[1], [], [])) {
    return vals[0];
  }

  return val;
});
export default toggle;
