import _isInteger from './_isInteger.js';
import _nth from './_nth.js';

function path(pathAr, obj) {
  var val = obj;
  for (var i = 0; i < pathAr.length; i += 1) {
    if (val == null) {
      return undefined;
    }

    const p = pathAr[i];
    if (_isInteger(p)) {
      val = _nth(p, val);
    } else {
      val = val[p];
    }
  }
  return val;
}

export default path;
