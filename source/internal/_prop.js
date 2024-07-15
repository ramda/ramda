import _isInteger from './_isInteger.js';
import _nth from './_nth.js';

function _prop(p, obj) {
  if (obj == null) {
    return;
  }
  return _isInteger(p) ? _nth(p, obj) : obj[p];
}

export default _prop;
