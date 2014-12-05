var _hasMethod = require('./internal/_hasMethod');


/**
 *
 * `of` wraps any object in an Array. This implementation is compatible with the
 * Fantasy-land Applicative spec, and will work with types that implement that spec.
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(1); //=> [1]
 *      R.of([2]); //=> [[2]]
 *      R.of({}); //=> [{}]
 */
module.exports = function of(x, container) {
    return (_hasMethod('of', container)) ? container.of(x) : [x];
};
