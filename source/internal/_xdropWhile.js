import _curry2 from './_curry2';
import _xfBase from './_xfBase';


function XDropWhile(f, xf) {
  this.xf = xf;
  this.f = f;
}
XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
XDropWhile.prototype['@@transducer/step'] = function(result, input) {
  if (this.f) {
    if (this.f(input)) {
      return result;
    }
    this.f = null;
  }
  return this.xf['@@transducer/step'](result, input);
};

var _xdropWhile = _curry2(function _xdropWhile(f, xf) { return new XDropWhile(f, xf); });
export default _xdropWhile;
