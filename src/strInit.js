var _curry1 = require('./internal/_curry1');


module.exports = _curry1(function strInit(str) {
  return str.slice(0, -1);
});
