var _curry2 = require('./internal/_curry2');

module.exports = _curry2(function(fn, seed) {
  return function* iterate() {
    while (true) {
      yield seed;
      seed = fn(seed);
    }
  };
});
