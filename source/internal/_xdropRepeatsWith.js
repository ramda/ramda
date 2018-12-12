import _xfBase from './_xfBase';


function XDropRepeatsWith(pred, xf) {
  this.xf = xf;
  this.pred = pred;
  this.lastValue = undefined;
  this.seenFirstValue = false;
}

XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
XDropRepeatsWith.prototype['@@transducer/step'] = function(result, input) {
  var sameAsLast = false;
  if (!this.seenFirstValue) {
    this.seenFirstValue = true;
  } else if (this.pred(this.lastValue, input)) {
    sameAsLast = true;
  }
  this.lastValue = input;
  return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
};

export default XDropRepeatsWith;
