import Z from 'sanctuary-type-classes';

import _isArrayLike from './_isArrayLike';
import _xwrap from './_xwrap';


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

var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';

export default function _reduce(_fn, acc, list) {
  var fn = typeof _fn === 'function' ? _xwrap(_fn) : _fn;
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return Z.reduce(fn, acc, list);
  }
  if (typeof list.reduceLeft === 'function') {
    return list.reduceLeft(fn, acc);
  }
  if (typeof list.foldLeft === 'function') {
    return list.foldLeft(fn, acc);
  }
  if (typeof list.foldl === 'function') {
    return list.foldl(fn, acc);
  }
}
