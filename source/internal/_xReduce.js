import _createReduce from './_createReduce.js';
import _xArrayReduce from './_xArrayReduce.js';
import bind from '../bind.js';


function _closeIterator(iter) {
  var returnMethod = iter['return'];
  if (returnMethod != null) {
    var result = Function.prototype.call.call(returnMethod, iter);
    if (result === null || (typeof result !== 'object' && typeof result !== 'function')) {
      throw new TypeError('Iterator result is not an object');
    }
  }
}

function _xIterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    var value = step.value;
    var reduced = false;
    try {
      acc = xf['@@transducer/step'](acc, value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        reduced = true;
      }
    } catch (error) {
      try {
        _closeIterator(iter);
      } catch (closeError) {
        // Preserve the error that interrupted iteration.
      }
      throw error;
    }
    if (reduced) {
      _closeIterator(iter);
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _xMethodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var _xReduce = _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);
export default _xReduce;
