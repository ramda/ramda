import _curry2 from './internal/_curry2.js';
import _isInteger from './internal/_isInteger.js';
import _nth from './internal/_nth.js';
import _isString from './internal/_isString.js';
import _isArray from './internal/_isArray.js';
import compose from './compose.js';
import identity from './identity.js';


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.props, R.pluck, R.project, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.prop(['x', 'y'], {x: {y: 100}}); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */

var prop = _curry2(function _prop(p, obj) {
  if (obj == null) {
    return;
  }

  if (_isInteger(p)) {
    return _nth(p, obj);
  }

  if (_isString(p)) {
    return obj[p];
  }

  if (_isArray(p)) {
    return p.reduce((acc, propName) => compose(prop(propName), acc), identity)(obj);
  }
});
export default prop;
