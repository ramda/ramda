import _forceReduced from './_forceReduced.js';
import _isArrayLike from './_isArrayLike.js';
import _xArrayReduce from './_xArrayReduce.js';
import _xReduce from './_xReduce.js';
import _xfBase from './_xfBase.js';

var preservingReduced = function(xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function(result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function(result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function(result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function(result, input) {
      return !_isArrayLike(input) ? _xArrayReduce(rxf, result, [input]) : _xReduce(rxf, result, input);
    }
  };
};

export default _flatCat;
