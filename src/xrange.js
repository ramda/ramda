var _curry3 = require('./internal/_curry3');

module.exports = _curry3(function(step, start, stop) {
  return function* xrange() {
    let i = start;

    while (i < stop) {
      yield i;
      i = i + step;
    }
  };
});
