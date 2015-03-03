var _FN_TYPE_KEY = require('./_FN_TYPE_KEY');

module.exports = function _getFunctionType(f) {
    return f == null ? null : f[_FN_TYPE_KEY];
};
