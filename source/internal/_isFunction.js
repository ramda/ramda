export default function _isFunction(x) {
  return /^\[object \w*?Function\]$/.test(Object.prototype.toString.call(x));
}
