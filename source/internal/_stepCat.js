import _objectAssign from './_objectAssign';
import _identity from './_identity';
import _isArrayLike from './_isArrayLike';
import _isString from './_isString';
import _isTransformer from './_isTransformer';
import objOf from '../objOf';


function convertObjectInput(input, key) {
  if (_isString(key)) {
    return objOf(key, input);
  } else if (_isArrayLike(input)) {
    return objOf(input[0], input[1]);
  }
  return input;
}
var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function(xs, x) {
    xs.push(x);
    return xs;
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
  '@@transducer/step': function(result, input, key) {
    return _objectAssign(
      result,
      convertObjectInput(input, key)
    );
  },
  '@@transducer/commutative': true,
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
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
