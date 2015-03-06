var _symTransformer = require('./_symTransformer');


module.exports = function _isTransformer(obj) {
    return (obj[_symTransformer] != null) ||
        (typeof obj.step === 'function' && typeof obj.result === 'function');
};
