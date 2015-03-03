var _XF_TRANSIENT_FLAG = require('./_XF_TRANSIENT_FLAG');
var _executeComposition = require('./_executeComposition');
var _getTypedFunction = require('./_getTypedFunction');
var _isXf = require('./_isXf');
var _transduce = require('./_transduce');
var head = require('../head');

module.exports = function _xfComposeDispatch(fns) {
    return _getTypedFunction(_XF_TRANSIENT_FLAG, function _inner_xfComposeDispatch() {
        // check what we are composing
        // if first arg is an xf, 
        var firstArg = head(arguments);
        if (_isXf(firstArg)) {
            return _executeComposition.call(this, fns, arguments);
        }
        else {
            return _transduce(_xfComposeDispatch(fns), firstArg);
        }
    });
};
