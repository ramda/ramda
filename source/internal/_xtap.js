import _curry2 from './_curry2';
import _xfBase from './_xfBase';


function XTap(f, xf) {
  this.xf = xf;
  this.f = f;
}
XTap.prototype['@@transducer/init'] = _xfBase.init;
XTap.prototype['@@transducer/result'] = _xfBase.result;
XTap.prototype['@@transducer/step'] = function(result, input) {
  this.f(input);
  return this.xf['@@transducer/step'](result, input);
};

var _xtap = _curry2(function _xtap(f, xf) { return new XTap(f, xf); });
export default _xtap;
