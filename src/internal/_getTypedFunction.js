var _FN_TYPE_KEY = require('./_FN_TYPE_KEY');

module.exports = function _getTypedFunction(type, f) {
    f[_FN_TYPE_KEY] = type;
    return f;
};
