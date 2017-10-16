import _curry3 from './_curry3';
import _reduced from './_reduced';
import _xfBase from './_xfBase';


function XSlice(a, b, xf) {
  this.xf = xf;
  this.a = a;
  this.b = b - 1; // since it b exclusively
  this.i = 0;
}
XSlice.prototype['@@transducer/init'] = _xfBase.init;
XSlice.prototype['@@transducer/result'] = _xfBase.result;
XSlice.prototype['@@transducer/step'] = function(result, input) {
  this.i += 1;
  var ret = this.b === 0 || this.a > this.i ? result : this.xf['@@transducer/step'](result, input);
  return this.b >= 0 && this.i >= this.b ? _reduced(ret) : ret;
};

var _xslice = _curry3(function _xslice(a, b, xf) { return new XSlice(a, b, xf); });
export default _xslice;
