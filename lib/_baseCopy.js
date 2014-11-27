/**
 * Private `_baseCopy` function dispatches value copying to the `_copyObj`
 * function or creates a copy itself.
 *
 * @private
 * @category Internal
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @return {*} The copied value.
 */
function _baseCopy(value, refFrom, refTo) {
    switch (value && toString.call(value)) {
        case '[object Object]':   return _copyObj(value, {}, refFrom, refTo);
        case '[object Array]':    return _copyObj(value, [], refFrom, refTo);
        case '[object Function]': return value;
        case '[object Date]':     return new Date(value);
        default:
            return value;
    }
}
