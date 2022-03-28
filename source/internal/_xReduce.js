import _createReduce from './_createReduce.js';
import _xArrayReduce from './_xArrayReduce.js';
import bind from '../bind.js';


function _xIterableReduce(xf, acc, iter) {
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

function _xMethodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var _xReduce = _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);
export default _xReduce;
