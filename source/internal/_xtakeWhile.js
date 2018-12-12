import _reduced from './_reduced';
import _xfBase from './_xfBase';


function XTakeWhile(f, xf) {
  this.xf = xf;
  this.f = f;
}
XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
XTakeWhile.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
};

export default XTakeWhile;
