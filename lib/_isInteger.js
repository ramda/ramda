/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category type
 * @return {Boolean}
 */
// TODO: document, even for internals...
module.exports = Number.isInteger || function _isInteger(n) {
    return (n << 0) === n;
};
