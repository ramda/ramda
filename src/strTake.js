var _curry2 = require('./internal/_curry2');


module.exports = _curry2(function strTake(n, str) {
  return str.slice(0, n);
});
