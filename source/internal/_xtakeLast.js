import _CircularBuffer from './_CircularBuffer';
import _reduce from './_reduce';
import _xdrop from './_xdrop';
import _xfBase from './_xfBase';
import _xtake from './_xtake';
import construct from '../construct';


function XTakeLast(n, xf) {
  if (+n === 0) {
    return _xtake(0, xf); // null transformer
  }
  if (n < 0) {
    return _xdrop(0, xf); // identity transformer
  }
  this.xf = xf;
  this.buffer = new _CircularBuffer(n);
}
XTakeLast.prototype['@@transducer/init'] = _xfBase.init;
XTakeLast.prototype['@@transducer/result'] = function(result) {
  return _reduce(this.xf, result, this.buffer);
};
XTakeLast.prototype['@@transducer/step'] = function(result, input) {
  this.buffer.push(input);
  return result;
};

export default construct(XTakeLast);
