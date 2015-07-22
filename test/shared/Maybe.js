var util = require('./internal/util.js');

function Maybe(x) {
  return x == null ? _nothing : Maybe.Just(x);
}

function _Just(x) {
  this.value = x;
}
util.extend(_Just, Maybe);

function _Nothing() {}
util.extend(_Nothing, Maybe);

var _nothing = new _Nothing();

Maybe.Nothing = function() {
  return _nothing;
};

Maybe.Just = function(x) {
  return new _Just(x);
};

Maybe.of = Maybe.Just;

Maybe.prototype.of = Maybe.Just;


_Just.prototype.toString = function() {
  return 'Just(' + this.value + ')';
};

_Nothing.prototype.toString = function() {
  return 'Nothing()';
};


// functor
_Just.prototype.map = function(f) {
  return this.of(f(this.value));
};

_Nothing.prototype.map = util.returnThis;

// apply
// takes a Maybe that wraps a function (`app`) and applies its `map`
// method to this Maybe's value, which must be a function.
_Just.prototype.ap = function(m) {
  return m.map(this.value);
};

_Nothing.prototype.ap = util.identity;

// applicative
// `of` inherited from `Maybe`


// chain
//  f must be a function which returns a value
//  f must return a value of the same Chain
//  chain must return a value of the same Chain
_Just.prototype.chain = util.baseMap;

_Nothing.prototype.chain = util.returnThis;


//
_Just.prototype.datatype = _Just;

_Nothing.prototype.datatype = _Nothing;

// monad
// A value that implements the Monad specification must also implement the Applicative and Chain specifications.
// see above.

// equality method to enable testing
_Just.prototype.equals = function(that) {
  return that instanceof _Just && this.value === that.value;
};

_Nothing.prototype.equals = function(that) {
  return that === _nothing;
};


module.exports = Maybe;
