var equals = require('../equals');
var identity = require('../identity');
var toString = require('../toString');


module.exports = (function() {

  function Maybe() {}
  Maybe.prototype.of = function _maybeof(x) { return new Just(x); };
  Maybe.prototype['@@type'] = 'ramda/Maybe';
  Maybe.prototype.equals = function _maybeequals(that) {
    return that != null &&
      that['@@type'] === this['@@type'] &&
      equals(this.value, that.value);
  };

  function Just(x) { this.value = x; }
  Just.prototype = new Maybe();
  Just.prototype.map = function _justmap(f) {
    return new Just(f(this.value));
  };
  Just.prototype.ap = function _justap(m) {
    return m.map(this.value);
  };
  Just.prototype.chain = function _justchain(f) {
    return f(this.value);
  };
  Just.prototype.reduce = function _justreduce(f, x) {
    return f(x, this.value);
  };
  Just.prototype.getOrElse = function _getOrElse() {
    return this.value;
  };
  Just.prototype.toString = function() {
    return 'Just(' + toString(this.value) + ')';
  };
  Just.prototype.isNothing = false;
  Just.prototype.isJust = true;

  function returnThis() { return this; }

  function Nothing() {}
  Nothing.prototype = new Maybe();
  Nothing.prototype.map = returnThis;
  Nothing.prototype.ap = returnThis;
  Nothing.prototype.chain = returnThis;
  Nothing.prototype.reduce = function _nothingreduce(f, x) {
    return x;
  };
  Nothing.prototype.getOrElse = identity;
  Nothing.prototype.toString = function() {
    return 'Nothing()';
  };
  Nothing.prototype.isNothing = true;
  Nothing.prototype.isJust = false;

  Maybe.Just = function _Just(x) {
    return new Just(x);
  };

  Maybe.Nothing = function _Nothing(x) {
    return new Nothing();
  };

  return Maybe;
}());
