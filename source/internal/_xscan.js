import _curry3 from './_curry3.js';
import _unreduced from './_unreduced.js';
import _xfBase from './_xfBase.js';

var tInit = '@@transducer/init';
var tStep = '@@transducer/step';

function XScan(reducer, acc, xf) {
  this.xf = xf;
  this.f = reducer;
  this.acc = acc;
  this.started = false;
}
XScan.prototype[tInit] = _xfBase.init;
XScan.prototype['@@transducer/result'] = function(result) {
  if (!this.started) {
    this.started = true;
    result = _unreduced(this.xf[tStep](result, this.acc));
  }
  return this.xf['@@transducer/result'](result);
};
XScan.prototype[tStep] = function(result, input) {
  if (!this.started) {
    this.started = true;
    result = this.xf[tStep](result, this.acc);
  }
  if (result && result['@@transducer/reduced']) {
    return result;
  }
  this.acc = this.f(this.acc, input);
  return this.xf[tStep](result, this.acc);
};

var _xscan = _curry3(function _xscan(reducer, acc, xf) {
  return new XScan(reducer, acc, xf);
});
export default _xscan;
