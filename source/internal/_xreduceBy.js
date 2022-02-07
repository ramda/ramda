import _has from './_has.js';
import _xfBase from './_xfBase.js';


function XReduceBy(valueFn, valueAcc, keyFn, xf) {
  this.valueFn = valueFn;
  this.valueAcc = valueAcc;
  this.keyFn = keyFn;
  this.xf = xf;
  this.inputs = {};
}
XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
XReduceBy.prototype['@@transducer/result'] = function(result) {
  var key;
  for (key in this.inputs) {
    if (_has(key, this.inputs)) {
      result = this.xf['@@transducer/step'](result, this.inputs[key]);
      if (result['@@transducer/reduced']) {
        result = result['@@transducer/value'];
        break;
      }
    }
  }
  this.inputs = null;
  return this.xf['@@transducer/result'](result);
};
XReduceBy.prototype['@@transducer/step'] = function(result, input) {
  var key = this.keyFn(input);
  this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
  this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
  return result;
};

export default function _xreduceBy(valueFn, valueAcc, keyFn) {
  return function(xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  };
}
