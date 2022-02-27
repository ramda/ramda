import _arrayReduce from './_arrayReduce.js';
import _createReduce from './_createReduce.js';


function _iterableReduce(reducer, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = reducer(acc, step.value);
    step = iter.next();
  }
  return acc;
}

function _methodReduce(reducer, acc, obj, methodName) {
  return obj[methodName](reducer, acc);
}

var _reduce = _createReduce(_arrayReduce, _methodReduce, _iterableReduce);
export default _reduce;
