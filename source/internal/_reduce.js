import _isArrayLike from './_isArrayLike';
import _has from './_has';
import _isObject from './_isObject';
import _xwrap from './_xwrap';
import bind from '../bind';


function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _objectReduce(xf, acc, object) {
  for (var key in object) {
    if (_has(key, object)) {
      acc = xf['@@transducer/step'](acc, object[key], key);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
    }
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
var typeErrorMessage = 'reduce: list must be array or iterable';

export default function _reduce(fn, acc, list) {
  if (!list) {
    throw new TypeError(typeErrorMessage);
  }
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }
  if (_isObject(list)) {
    if (fn['@@transducer/commutative']) {
      return _objectReduce(fn, acc, list);
    } else {
      throw new TypeError('reduce: unordered input passed for ordered transducer');
    }
  }

  throw new TypeError(typeErrorMessage);
}
