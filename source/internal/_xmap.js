import _curry2 from './_curry2';
import _xfBase from './_xfBase';


function XMap(f, xf) {
  this.xf = xf;
  this.f = f;
  this['@@transducer/commutative'] = xf['@@transducer/commutative'];
}
XMap.prototype['@@transducer/init'] = _xfBase.init;
XMap.prototype['@@transducer/result'] = _xfBase.result;
XMap.prototype['@@transducer/step'] = function(result, input, key) {
  return this.xf['@@transducer/step'](result, this.f(input), key);
};

var _xmap = _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
export default _xmap;
