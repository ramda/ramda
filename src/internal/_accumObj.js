var _has = require('./_has');

module.exports = function _accumObj(fn, originalObj) {
  var newObj = {};
  for (var key in originalObj) {
    if (_has(key, originalObj)) {
      fn(key, originalObj[key], newObj);
    }
  }
  return newObj;
};
