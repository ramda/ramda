module.exports = (function() {

  function _arrayFind(fn, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (fn(list[idx])) {
        return list[idx];
      }
      idx += 1;
    }
  }

  function _iteratorFind(fn, iter) {
    var step = iter.next();
    while (!step.done) {
      if (fn(step.value)) {
        return step.value;
      }
      step = iter.next();
    }
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

  return function _find(fn, list) {
    return list[symIterator] ? _iteratorFind(fn, list[symIterator]())
                             : _arrayFind(fn, list) ;
  };
})();
