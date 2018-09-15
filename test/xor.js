var R = require('../source');
var eq = require('./shared/eq');

describe('xor', function() {
  it('compares two values with exclusive or', function() {
    eq(R.xor(true, true), false);
    eq(R.xor(true, false), true);
    eq(R.xor(false, true), true);
    eq(R.xor(false, false), false);
  });

  it('when both values are truthy, it should return false', function() {
    eq(R.xor(true, 'foo'), false);
    eq(R.xor(42, true), false);
    eq(R.xor('foo', 42), false);
    eq(R.xor({}, true), false);
    eq(R.xor(true, []), false);
    eq(R.xor([], {}), false);
    eq(R.xor(new Date(), true), false);
    eq(R.xor(true, Infinity), false);
    eq(R.xor(Infinity, new Date()), false);
  });

  it('when both values are falsy, it should return false', function() {
    eq(R.xor(null, false), false);
    eq(R.xor(false, undefined), false);
    eq(R.xor(undefined, null), false);
    eq(R.xor(0, false), false);
    eq(R.xor(false, NaN), false);
    eq(R.xor(NaN, 0), false);
    eq(R.xor('', false), false);
  });

  it('when one argument is truthy and the other is falsy, it should return true', function() {
    eq(R.xor('foo', null), true);
    eq(R.xor(null, 'foo'), true);
    eq(R.xor(undefined, 42), true);
    eq(R.xor(42, undefined), true);
    eq(R.xor(Infinity, NaN), true);
    eq(R.xor(NaN, Infinity), true);
    eq(R.xor({}, ''), true);
    eq(R.xor('', {}), true);
    eq(R.xor(new Date(), 0), true);
    eq(R.xor(0, new Date()), true);
    eq(R.xor([], null), true);
    eq(R.xor(undefined, []), true);
  });

  it('returns a curried function', function() {
    eq(R.xor()(true)(true), false);
    eq(R.xor()(true)(false), true);
    eq(R.xor()(false)(true), true);
    eq(R.xor()(false)(false), false);
  });
});
