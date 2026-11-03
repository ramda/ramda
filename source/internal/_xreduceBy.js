import _clone from './_clone.js';
import _has from './_has.js';
import _reduced from './_reduced.js';
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
  var entry = this.inputs[key] || [key, _clone(this.valueAcc, false)];
  var value = this.valueFn(entry[1], input);
  if (value && value['@@transducer/reduced']) {
    return _reduced(result);
  }
  entry[1] = value;
  this.inputs[key] = entry;
  return result;
};

export default function _xreduceBy(valueFn, valueAcc, keyFn) {
  return function(xf) {
    return new XReduceBy(valueFn, valueAcc, keyFn, xf);
  };
}
