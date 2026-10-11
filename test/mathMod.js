var assert = require('assert');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('mathMod', function() {
  it('requires integer arguments', function() {
    assert(Number.isNaN(R.mathMod('s', 3)));
    assert(Number.isNaN(R.mathMod(3, 's')));
    assert(Number.isNaN(R.mathMod(12.2, 3)));
    assert(Number.isNaN(R.mathMod(3, 12.2)));
  });

  it('behaves differently than JS modulo', function() {
    assert.notStrictEqual(R.mathMod(-17, 5), -17 % 5);
    assert.notStrictEqual(R.mathMod(17.2, 5), 17.2 % 5);
    assert.notStrictEqual(R.mathMod(17, -5), 17 % -5);
  });

  it('computes the true modulo function', function() {
    eq(R.mathMod(-17, 5), 3);
    eq(R.identical(NaN, R.mathMod(17, -5)), true);
    eq(R.identical(NaN, R.mathMod(17, 0)), true);
    eq(R.identical(NaN, R.mathMod(17.2, 5)), true);
    eq(R.identical(NaN, R.mathMod(17, 5.5)), true);
  });

  it('preserves positive remainders with large integer moduli', function() {
    eq(R.mathMod(2, 9007199254740991), 2);
    eq(R.mathMod(4, 9007199254740991), 4);
    eq(R.mathMod(4, 9007199254740989), 4);
    eq(R.mathMod(9007199254740991, 4503599627370496), 4503599627370495);
  });

  it('does not overflow when normalizing an already positive remainder', function() {
    eq(R.mathMod(1e308, Number.MAX_VALUE), 1e308);
    eq(R.mathMod(Number.MAX_VALUE / 2, Number.MAX_VALUE), Number.MAX_VALUE / 2);
  });

  it('keeps negative remainders normalized and zero positive', function() {
    eq(R.mathMod(-2, 9007199254740991), 9007199254740989);
    eq(R.mathMod(-0, 9007199254740991), 0);
    eq(R.mathMod(-9007199254740991, 9007199254740991), 0);
    eq(R.mathMod(0, Number.MAX_VALUE), 0);
  });

});
