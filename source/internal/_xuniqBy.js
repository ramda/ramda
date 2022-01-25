import _curry2 from './_curry2.js';
import _Set from './_Set.js';
import _xfBase from './_xfBase.js';


function XUniqBy(f, xf) {
  this.xf = xf;
  this.f = f;
  this.set = new _Set();
}
XUniqBy.prototype['@@transducer/init'] = _xfBase.init;
XUniqBy.prototype['@@transducer/result'] = _xfBase.result;
XUniqBy.prototype['@@transducer/step'] = function(result, input) {
  return this.set.add(this.f(input)) ? this.xf['@@transducer/step'](result, input) : result;
};

var _xuniqBy = _curry2(function _xuniqBy(f, xf) { return new XUniqBy(f, xf); });
export default _xuniqBy;
