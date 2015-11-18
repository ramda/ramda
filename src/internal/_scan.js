var _xwrap = require('./_xwrap');
var bind = require('../bind');
var isArrayLike = require('../isArrayLike');

module.exports = (function() {
  function _arrayScan(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    var result = [acc];
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      result[idx + 1] = acc;
      idx += 1;
    }
    return xf['@@transducer/result'](result);
  }

  function _iterableScan(xf, acc, iter) {
    var step = iter.next();
    var result = [acc];
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      result.push(acc);
      step = iter.next();
    }
    return xf['@@transducer/result'](result);
  }

  function _methodScan(xf, acc, obj) {
    return xf['@@transducer/result'](obj.scan(bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _scan(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
      return _arrayScan(fn, acc, list);
    }
    if (typeof list.scan === 'function') {
      return _methodScan(fn, acc, list);
    }
    if (list[symIterator] != null) {
      return _iterableScan(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableScan(fn, acc, list);
    }
    throw new TypeError('scan: list must be array or iterable');
  };
})();
