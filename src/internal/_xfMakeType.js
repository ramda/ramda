var _isXf = require('./_isXf');
var is = require('../is');

module.exports = function _xfMakeType(x) {
    if (is(Function, x)) {
        if (!_isXf(x.prototype)) {
            throw new Error('Cannot create transducer from ' + x.toString());
        }
        return x;
    }
    else {
        if (!_isXf(x)) {
            throw new Error('Cannot create transducer from ' + x.toString());
        }
        var Ctor = is(Function, x.Ctor) ? x.Ctor : function xfCtor(f, xf) {
            this.f = f;
            this.xf = xf;
        };
        Ctor.prototype = x;
        return Ctor;
    }
};
