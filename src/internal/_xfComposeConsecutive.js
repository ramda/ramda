var _isTransientXf = require('./_isTransientXf');
var _xfComposeDispatch = require('./_xfComposeDispatch');
var head = require('../head');

module.exports = function _xfComposeConsecutive(fns) {
    // after partition, fns in each subarray are either all transformers or
    // all not transformers
    // if we have more than 1, and 1st (ie all) is transformer compose them
    if (fns.length > 1 && _isTransientXf(head(fns))) {
        return _xfComposeDispatch(fns);
    }
    else {
        return fns;
    }
};
