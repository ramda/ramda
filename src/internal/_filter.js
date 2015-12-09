const _isGenerator = require('./internal/_isGenerator');

module.exports = function _filter(fn, list) {
  if (_isGenerator(list)) {
    return function* filterGenerator() {
      const iter = list();

      while (true) {
        const item = iter.next();

        if (item.done) {
          break;
        } else if (fn(item.value)) {
          yield item.value;
        }
      }
    };
  } else {
    var idx = 0, len = list.length, result = [];
    while (idx < len) {
      if (fn(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  }
};
