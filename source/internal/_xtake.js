import _reduced from './_reduced';
import _xfBase from './_xfBase';


function XTake(n, xf) {
  this.xf = xf;
  this.n = n;
  this.i = 0;
}
XTake.prototype['@@transducer/init'] = _xfBase.init;
XTake.prototype['@@transducer/result'] = _xfBase.result;
XTake.prototype['@@transducer/step'] = function(result, input) {
  this.i += 1;
  var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
  return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
};

export default XTake;
