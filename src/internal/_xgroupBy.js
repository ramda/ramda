var _append = require('./_append');
var _curry2 = require('./_curry2');
var _has = require('./_has');


module.exports = (function() {
  function XGroupBy(f, xf) {
    this.xf = xf;
    this.f = f;
    this.inputs = {};
  }
  XGroupBy.prototype['@@transducer/init'] = function() {
    return this.xf['@@transducer/init']();
  };
  XGroupBy.prototype['@@transducer/result'] = function(result) {
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
    return this.xf['@@transducer/result'](result);
  };
  XGroupBy.prototype['@@transducer/step'] = function(result, input) {
    var key = this.f(input);
    this.inputs[key] = this.inputs[key] || [key, []];
    this.inputs[key][1] = _append(input, this.inputs[key][1]);
    return result;
  };

  return _curry2(function _xgroupBy(f, xf) { return new XGroupBy(f, xf); });
})();
