import _objectAssign from './_objectAssign.js';
import _identity from './_identity.js';
import _isArrayLike from './_isArrayLike.js';
import _isTransformer from './_isTransformer.js';
import objOf from '../objOf.js';


function _stepCatTransformer(init, step) {
  return {
    '@@transducer/init': init,
    '@@transducer/step': step,
    '@@transducer/result': _identity
  };
}

function _stepCatArray(xs, x) {
  xs.push(x);
  return xs;
}

function _stepCatString(a, b) {
  return a + b;
}

function _stepCatObject(result, input) {
  return _objectAssign(
    result,
    _isArrayLike(input) ? objOf(input[0], input[1]) : input
  );
}

function _copyObject(obj) {
  var source = Object(obj);
  var keys = Object.keys(source);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(source));
  }
  var result = {};
  for (var idx = 0; idx < keys.length; idx += 1) {
    var key = keys[idx];
    if (Object.prototype.propertyIsEnumerable.call(source, key)) {
      Object.defineProperty(result, key, {
        value: source[key], writable: true, enumerable: true, configurable: true
      });
    }
  }
  return result;
}

export default function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatTransformer(function() {
      var result = Array(Math.floor(obj.length));
      Array.prototype.forEach.call(obj, function(value, idx) {
        result[idx] = value;
      });
      return result;
    }, _stepCatArray);
  }
  if (typeof obj === 'string') {
    return _stepCatTransformer(function() { return obj; }, _stepCatString);
  }
  if (typeof obj === 'object') {
    return _stepCatTransformer(function() { return _copyObject(obj); }, _stepCatObject);
  }
  throw new Error('Cannot create transformer for ' + obj);
}
