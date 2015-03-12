var _add = require('./_add');
var _appendTo = require('./_appendTo');
var _isTransformer = require('./_isTransformer');
var _symTransformer = require('./_symTransformer');
var isArrayLike = require('../isArrayLike');
var merge = require('../merge');


module.exports = (function() {
    var _result = function(result) { return result; };
    var _stepCatArray = {
        init: Array,
        step: _appendTo,
        result: _result
    };
    var _stepCatString = {
        init: String,
        step: _add,
        result: _result
    };
    var _stepCatObject = {
        init: Object,
        step: function(result, input) {
            var key;
            var vals;
            var stepObj = {};
            if (isArrayLike(input)) {
                key = input[0];
                vals = input[1];
                stepObj[key] = vals;
            } else {
                stepObj = input;
            }
            return merge(result, stepObj);
        },
        result: _result
    };

    return function _stepCat(obj) {
        if (_isTransformer(obj)) {
            return obj[_symTransformer] || obj;
        }
        if (isArrayLike(obj)) {
            return _stepCatArray;
        }
        if (typeof obj === 'string') {
            return _stepCatString;
        }
        if (typeof obj === 'object') {
            return _stepCatObject;
        }
        throw new Error('Cannot create transformer for ' + obj);
    };
})();
