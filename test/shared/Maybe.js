var equals = require('../../src/equals');
var toString = require('../../src/toString');
var map = require('../../src/map');

var sentinel = {};

var Maybe = module.exports = function(x, box) {
  if (x !== sentinel) {
    throw new Error('Cannot instantiate Maybe');
  }
  var isJust = box.length > 0;
  if (isJust) {
    this.value = box[0];
  }
  this.isNothing = !isJust;
  this.isJust = isJust;
};

//  Nothing :: Maybe a
var Nothing = Maybe.Nothing = new Maybe(sentinel, []);

//  Just :: a -> Maybe a
var Just = Maybe.Just = function(value) { return new Maybe(sentinel, [value]); };

//  Maybe.of :: a -> Maybe a
Maybe['fantasy-land/of'] = Just;

//  Maybe#@@type :: String
Maybe.prototype['@@type'] = 'ramda/Maybe';

//  Maybe#equals :: Maybe a ~> Maybe a -> Boolean
Maybe.prototype['fantasy-land/equals'] = function(other) {
  return other != null && other['@@type'] === this['@@type'] &&
         this.isJust ? other.isJust && equals(other.value, this.value) : other.isNothing;
};

//  Maybe#map :: Maybe a ~> (a -> b) -> Maybe b
Maybe.prototype['fantasy-land/map'] = function(f) {
  return this.isJust ? Just(f(this.value)) : Nothing;
};

//  Maybe#ap :: Maybe a ~> Maybe (a -> b) -> Maybe b
Maybe.prototype['fantasy-land/ap'] = function(maybe) {
  return this.isJust && maybe.isJust ? Just(maybe.value(this.value)) : Nothing;
};

//  Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
Maybe.prototype['fantasy-land/chain'] = function(f) {
  return this.isJust ? f(this.value) : Nothing;
};

// Maybe#reduce :: Maybe f => f a ~> ((b, a) -> b, b) -> b
Maybe.prototype['fantasy-land/reduce'] = function(f, acc) {
  return this.isJust ? f(acc, this.value) : Nothing;
};

// Maybe#traverse :: Applicative f, Maybe m => m (f a) ~> (f, a -> f b) -> f (m b)
Maybe.prototype['fantasy-land/traverse']  = function(of, f) {
  return this.isJust ? map(Maybe.Just, f(this.value)) : of(Nothing);
};

//  Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a
Maybe.prototype.filter = function(pred) {
  return this.isJust && pred(this.value) ? this : Nothing;
};

//  Maybe#toString :: Maybe a ~> String
Maybe.prototype.toString = function() {
  return this.isJust ? 'Just(' + toString(this.value) + ')' : 'Nothing';
};
