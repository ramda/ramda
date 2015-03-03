var _XF_TRANSIENT_FLAG = require('./_XF_TRANSIENT_FLAG');
var __ = require('../__');
var _getTypedFunction = require('./_getTypedFunction');
var _isXf = require('./_isXf');
var _transduce = require('./_transduce');
var _xfMakeType = require('./_xfMakeType');
var is = require('../is');

module.exports = function(){
    
    var transducable = function transducable(xfType, f) {
        return function innerTransducable(xf) {
            return new xfType(f, xf);
        };
    };

    var _dispatchXf = function _dispatchXf(xfType, f, xfOrCollection) {
        // got our reducing function, return our transformer
        if (_isXf(xfOrCollection)) {
            return new xfType(f, xfOrCollection);
        }
        // got a collection, transduce
        else {
            // todo? use apply here so user can pass in however many arguments they want
            // and they will get passed along to transduce
            return _transduce(transducable(xfType, f), xfOrCollection);
        }
    };
    
    var _xfWrapper = function _xfWrapper(xfType) {
        // all our transducers are wrapped by this function
        // ie when Ramda is loaded, we are at this point with map, filter, take, etc
        return _getTypedFunction(_XF_TRANSIENT_FLAG, function _innerXfWrapper(f, xfOrCollectionOrUndefined) {
            // got our collection
            if (arguments.length > 1) {
                return _dispatchXf(xfType, f, xfOrCollectionOrUndefined);
            }
            else {
                return _getTypedFunction(_XF_TRANSIENT_FLAG, function _curryInnerXfWrapper(xfOrCollection){
                    return _dispatchXf(xfType, f, xfOrCollection);
                });
            }
        });
    };
    
    return function _makeXf(xfDefinition) {
        var type = _xfMakeType(xfDefinition);
        return _xfWrapper(type);
    };
}();
