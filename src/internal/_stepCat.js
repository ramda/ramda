var _add = require('./_add');
var _concat = require('./_concat');
var _createMapEntry = require('./_createMapEntry');
var _identity = require('./_identity');
var _isTransformer = require('./_isTransformer');
var isArrayLike = require('../isArrayLike');
var merge = require('../merge');


module.exports = (function() {
  var _stepCatArray = {
    '@@transducer/init': Array,
    '@@transducer/step': function(xs, x) { return _concat(xs, [x]); },
    '@@transducer/result': _identity
  };
  var _stepCatString = {
    '@@transducer/init': String,
    '@@transducer/step': _add,
    '@@transducer/result': _identity
  };
  var _stepCatObject = {
    '@@transducer/init': Object,
    '@@transducer/step': function(result, input) {
      return merge(
        result,
        isArrayLike(input) ? _createMapEntry(input[0], input[1]) : input
      );
    },
    '@@transducer/result': _identity
  };

  return function _stepCat(obj) {
    if (_isTransformer(obj)) {
      return obj;
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
