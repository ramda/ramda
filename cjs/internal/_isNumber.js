module.exports = function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
};