import _curry2 from './_curry2';
import _xfBase from './_xfBase';


function XDrop(n, xf) {
  this.xf = xf;
  this.n = n;
}
XDrop.prototype['@@transducer/init'] = _xfBase.init;
XDrop.prototype['@@transducer/result'] = _xfBase.result;
XDrop.prototype['@@transducer/step'] = function(result, input) {
  if (this.n > 0) {
    this.n -= 1;
    return result;
  }
  return this.xf['@@transducer/step'](result, input);
};

var _xdrop = _curry2(function _xdrop(n, xf) { return new XDrop(n, xf); });
export default _xdrop;
