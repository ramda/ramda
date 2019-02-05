import _copyNameProperty from './_copyNameProperty';

export default function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return _copyNameProperty(fn, function() { return fn.apply(this, arguments); });
    case 1: return _copyNameProperty(fn, function(a0) { return fn.apply(this, arguments); });
    case 2: return _copyNameProperty(fn, function(a0, a1) { return fn.apply(this, arguments); });
    case 3: return _copyNameProperty(fn, function(a0, a1, a2) { return fn.apply(this, arguments); });
    case 4: return _copyNameProperty(fn, function(a0, a1, a2, a3) { return fn.apply(this, arguments); });
    case 5: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); });
    case 6: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); });
    case 7: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); });
    case 8: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); });
    case 9: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); });
    case 10: return _copyNameProperty(fn, function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); });
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
