import _xfBase from './_xfBase';


function XFilter(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFilter.prototype['@@transducer/init'] = _xfBase.init;
XFilter.prototype['@@transducer/result'] = _xfBase.result;
XFilter.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
};

export default XFilter;
