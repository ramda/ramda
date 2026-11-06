import _concat from './_concat.js';
import _xfBase from './_xfBase.js';


function XAperture(n, xf) {
  this.xf = xf;
  this.pos = 0;
  this.full = false;
  if (typeof n === 'number' && n > 0 && (n === Infinity || n % 1 === 0)) {
    this.acc = [];
    this.size = n;
  } else {
    this.acc = new Array(n);
    this.size = this.acc.length || 1;
  }
}
XAperture.prototype['@@transducer/init'] = _xfBase.init;
XAperture.prototype['@@transducer/result'] = function(result) {
  this.acc = null;
  return this.xf['@@transducer/result'](result);
};
XAperture.prototype['@@transducer/step'] = function(result, input) {
  this.store(input);
  return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
};
XAperture.prototype.store = function(input) {
  this.acc[this.pos] = input;
  this.pos += 1;
  if (this.pos === this.size) {
    this.pos = 0;
    this.full = true;
  }
};
XAperture.prototype.getCopy = function() {
  return _concat(Array.prototype.slice.call(this.acc, this.pos),
    Array.prototype.slice.call(this.acc, 0, this.pos)
  );
};

export default function _xaperture(n) {
  return function(xf) { return new XAperture(n, xf); };
}
