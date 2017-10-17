export default function _isPlainObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]' &&
         x.constructor.name === 'Object';
}
