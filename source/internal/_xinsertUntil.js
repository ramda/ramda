import _curry3 from './_curry3.js';
import _xfBase from './_xfBase.js';

var tInit = '@@transducer/init';
var tStep = '@@transducer/step';

function XInsertUntil(reducer, acc, xf) {
  this.xf = xf;
  this.f = reducer;
  this.acc = acc;
}
XInsertUntil.prototype[tInit] = function() {
  return this.xf[tStep](this.xf[tInit](), this.acc);
};
XInsertUntil.prototype['@@transducer/result'] = _xfBase.result;
XInsertUntil.prototype[tStep] = function(result, input) {
  if (result['@@transducer/reduced']) {
    return result;
  }
  this.acc = this.f(this.acc, input);
  return this.xf[tStep](result, this.acc);
};

var _xinsertUntil = _curry3(function _xinsertUntil(reducer, acc, xf) {
  return new XInsertUntil(reducer, acc, xf);
});
export default _xinsertUntil;
