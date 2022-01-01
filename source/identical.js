import _objectIs from './internal/_objectIs.js';


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * `identical` does not support the `__` placeholder.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
var identical = function(a, b) {
  switch (arguments.length) {
    case 0:
      return identical; 
    case 1:
      return (function(){
        return function unaryIdentical(_b) {
          switch (arguments.length) {
            case 0:
              return unaryIdentical;
            default:
              return _objectIs(a, _b);
          }
        };
      }());
    default:
      return _objectIs(a, b);
  }
};

// In order to support Cross-origin Window objects as arguments to identical,
// it cannot be implemented as _curry2(_objectIs). 
// The reason is that _curry2 checks if a function argument is the placeholder __ 
// by accessing a paritcular property. However, across URL origins access 
// to most properties of Window is forbidden. 
export default identical;
