import _functionName from './_functionName';


export default function _isPlainObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]' &&
         _functionName(x.constructor) === 'Object';
}
