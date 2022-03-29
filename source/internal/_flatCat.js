import _forceReduced from './_forceReduced.js';
import _isArrayLike from './_isArrayLike.js';
import _xArrayReduce from './_xArrayReduce.js';
import _xReduce from './_xReduce.js';
import _xfBase from './_xfBase.js';

var tInit = '@@transducer/init';
var tStep = '@@transducer/step';
var tResult = '@@transducer/result';
function XPreservingReduced(xf) {
  this.xf = xf;
}
XPreservingReduced.prototype[tInit] = _xfBase.init;
XPreservingReduced.prototype[tResult] = _xfBase.result;
XPreservingReduced.prototype[tStep] = function(result, input) {
  var ret = this.xf[tStep](result, input);
  return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
};

function XFlatCat(xf) {
  this.xf = new XPreservingReduced(xf);
}
XFlatCat.prototype[tInit] = _xfBase.init;
XFlatCat.prototype[tResult] = _xfBase.result;
XFlatCat.prototype[tStep] = function(result, input) {
  return !_isArrayLike(input) ? _xArrayReduce(this.xf, result, [input]) : _xReduce(this.xf, result, input);
};
var _flatCat = function _xcat(xf) { return new XFlatCat(xf); };

export default _flatCat;
