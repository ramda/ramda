var _hasMethod = require('./internal/_hasMethod');


/**
 * `empty` wraps any object in an array. This implementation is compatible with the
 * Fantasy-land Monoid spec, and will work with types that implement that spec.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig * -> []
 * @return {Array} An empty array.
 * @example
 *
 *      R.empty([1,2,3,4,5]); //=> []
 */
module.exports = function empty(x) {
    return (_hasMethod('empty', x)) ? x.empty() : [];
};
