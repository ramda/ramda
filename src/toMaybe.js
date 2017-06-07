var _curry2 = require('./internal/_curry2');
var curryN = require('./curryN');


/**
 * Takes a predicate and a function to wrap. `toMaybe` evaluates the function.
 * and passes its result to the predicate. If the predicate evaluates to
 * `true`, then the value is returned inside a `Just`; otherwise `Nothing`
 * is returned.
 *
 * `Just` and `Nothing` satisfy the Fantasy-Land specs for  Functor,
 * Applicative, Apply, Chain, and Monad.
 *
 *
 * @func
 * @memberOf R
 * @category Type
 * @sig (a -> Bool) -> (...x -> a) -> (...x -> Maybe a)
 * @param {Function} pred The predicate
 * @param {Function} fn The function whose value you want to wrap in a Maybe
 * @return {Object} Maybe a
 * @example
 *
 *   const safeFind = R.toMaybe(x => x !== void 0, R.find);
 *   const found = safeFind(R.equals(2), [1, 2, 3,]); //=> R.toMaybe.Just(2)
 *   const notFound = safeFind(R.equals(4), [1, 2, 3,]); //=> R.toMaybe.Nothing()
 *
 */
module.exports = (function() {
  function returnThis() { return this; }

  function Maybe() {}
  Maybe.prototype.of = function _maybeof(x) { return new Just(x); };
  Maybe.prototype['@@type'] = 'ramda/Maybe';

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
  Just.prototype.isNothing = false;
  Just.prototype.isJust = true;

  function Nothing() {}
  Nothing.prototype = new Maybe();
  Nothing.prototype.map = returnThis;
  Nothing.prototype.ap = returnThis;
  Nothing.prototype.chain = returnThis;
  Nothing.prototype.isNothing = true;
  Nothing.prototype.isJust = false;

  var toMaybe = _curry2(function _toMaybe(pred, fn) {
    return curryN(fn.length, function() {
      var result = fn.apply(this, arguments);
      return pred(result) ? new Just(result) : new Nothing();
    });
  });
  toMaybe.Just = function _just(x) { return new Just(x); };
  toMaybe.Nothing = function _nothing() { return new Nothing(); };

  return toMaybe;
}());
