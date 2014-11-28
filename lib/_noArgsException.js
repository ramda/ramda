/**
 * Creates an exception about calling a function with no arguments.
 *
 * @private
 * @category Internal
 * @return {TypeError} A no arguments exception.
 */
module.exports = function _noArgsException() {
    return new TypeError('Function called with no arguments');
};
