import _identity from './_identity';
import _isArrayLike from './_isArrayLike';
import _isMap from './_isMap';
import _isTransformer from './_isTransformer';


var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function(xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatMap = {
  '@@transducer/init': function() {
    return new Map();
  },
  '@@transducer/step': function(result, value, key) {
    result.set(key, value);
    return result;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function(a, b) { return a + b; },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function(result, value, key) {
    if (arguments.length === 2) { // backwards compat
      [key, value] = value;
    }
    result[key] = value;
    return result;
  },
  '@@transducer/result': _identity
};

export default function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (_isMap(obj)) {
    return _stepCatMap;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
