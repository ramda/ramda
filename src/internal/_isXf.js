var is = require('../is');

module.exports = function _isXf(x) {
    return x != null && is(Function, x.init) && is(Function, x.result) && is(Function, x.step)
};
