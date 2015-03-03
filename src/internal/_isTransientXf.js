var _XF_TRANSIENT_FLAG = require('./_XF_TRANSIENT_FLAG');
var _getFunctionType = require('./_getFunctionType');

// is our function the result of a transducer that has been
// given a function but is still waiting for a reducing function
module.exports = function _isTransientXf(x) {
    return _getFunctionType(x) === _XF_TRANSIENT_FLAG;
};
