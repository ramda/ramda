var _add = require('./_add');
var _concat = require('./_concat');
var _createMapEntry = require('./_createMapEntry');
var _identity = require('./_identity');
var _isTransformer = require('./_isTransformer');
var isArrayLike = require('../isArrayLike');
var merge = require('../merge');


module.exports = (function() {
  var _stepCatArray = {
    init: Array,
    step: function(xs, x) { return _concat(xs, [x]); },
    result: _identity
  };
  var _stepCatString = {
    init: String,
    step: _add,
    result: _identity
  };
  var _stepCatObject = {
    init: Object,
    step: function(result, input) {
      return merge(
        result,
        isArrayLike(input) ? _createMapEntry(input[0], input[1]) : input
      );
    },
    result: _identity
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
