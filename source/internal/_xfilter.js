import _curry2 from './_curry2';
import _xfBase from './_xfBase';


function XFilter(f, xf) {
  this.xf = xf;
  this.f = f;
  this['@@transducer/commutative'] = xf['@@transducer/commutative'];
}
XFilter.prototype['@@transducer/init'] = _xfBase.init;
XFilter.prototype['@@transducer/result'] = _xfBase.result;
XFilter.prototype['@@transducer/step'] = function(result, input, key) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input, key) : result;
};

var _xfilter = _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
export default _xfilter;
