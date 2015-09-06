var _isArray = require('./_isArray');

module.exports = (function() {
  function _arrayMap(fn, list) {
    var idx = 0, len = list.length, result = Array(len);
    while (idx < len) {
      result[idx] = fn(list[idx]);
      idx += 1;
    }
    return result;
  }

  function _iteratorMap(fn, iter) {
    var acc = [];
    var step = iter.next();
    while (!step.done) {
      acc[acc.length] = fn(step.value);
      step = iter.next();
    }
    return acc;
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

  return function _map(fn, list) {
    return _isArray(list)    ? _arrayMap(fn, list) :
           list[symIterator] ? _iteratorMap(fn, list[symIterator]())
                             : _arrayMap(fn, list);
  };
})();
