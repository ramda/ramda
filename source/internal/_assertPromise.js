import _isFunction from './_isFunction';
import _toString from './_toString';

export default function _assertPromise(name, p) {
  if (p === null || p === undefined || !_isFunction(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
  }
}
