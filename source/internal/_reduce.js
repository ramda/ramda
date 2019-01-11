import _isArrayLike from './_isArrayLike';
import _xwrap from './_xwrap';
import bind from '../bind';


function _arrayReduce(xf, acc, list, reduced) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (reduced && acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iteratorReduce(xf, acc, iter, reduced) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (reduced && acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

export default function _reduce(fn, acc, list) {
  var reduced = true;
  if (typeof fn === 'function') {
    reduced = false;
    if (!reduced && typeof list['fantasy-land/reduce'] === 'function') {
      return list['fantasy-land/reduce'](fn, acc);
    }
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list, reduced);
  }
  if (!reduced && typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iteratorReduce(fn, acc, list[symIterator](), reduced);
  }
  if (typeof list.next === 'function') {
    return _iteratorReduce(fn, acc, list, reduced);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
