import _xfBase from './_xfBase';


function XFindLast(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFindLast.prototype['@@transducer/init'] = _xfBase.init;
XFindLast.prototype['@@transducer/result'] = function(result) {
  return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
};
XFindLast.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.last = input;
  }
  return result;
};

export default XFindLast;
