import _arity from './internal/_arity.js';
import _curry3 from './internal/_curry3.js';
import LRU from './internal/_lru.js';

var memoizeLRUWith = _curry3(function memoizeLRUWith(size, mFn, fn) {
  var cache = new LRU(size);

  return _arity(fn.length, function() {
    var key = mFn.apply(this, arguments);
    if (!cache.has(key)) {
      var value = fn.apply(this, arguments);
      cache.set(key, value);
    }

    return cache.get(key);
  });
});


export default memoizeLRUWith;
