var curryN = require('../curryN');

module.exports = function _map(fn, functor) {
  if (typeof functor === 'function') {
    return curryN(functor.length, function() {
      return fn.call(this, functor.apply(this, arguments));
    });
  } else {
    var idx = 0, len = functor.length, result = Array(len);
    while (idx < len) {
      result[idx] = fn(functor[idx]);
      idx += 1;
    }
    return result;
  }
};
