import _curry2 from './_curry2.js';
import _includesWith from './_includesWith.js';
import _xfBase from './_xfBase.js';


function XUniqWith(pred, xf) {
  this.xf = xf;
  this.pred = pred;
  this.items = [];
}
XUniqWith.prototype['@@transducer/init'] = _xfBase.init;
XUniqWith.prototype['@@transducer/result'] = _xfBase.result;
XUniqWith.prototype['@@transducer/step'] = function(result, input) {
  if (_includesWith(this.pred, input, this.items)) {
    return result;
  } else {
    this.items.push(input);
    return this.xf['@@transducer/step'](result, input);
  }
};

var _xuniqWith = _curry2(function _xuniqWith(pred, xf) { return new XUniqWith(pred, xf); });
export default _xuniqWith;
