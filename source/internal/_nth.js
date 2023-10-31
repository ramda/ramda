import _isString from './_isString.js';

function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
}
export default nth;
