var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');


describe('mathMod', function() {
  it('requires integer arguments', function() {
    assert.notStrictEqual(R.mathMod('s', 3), R.mathMod('s', 3));
    assert.notStrictEqual(R.mathMod(3, 's'), R.mathMod(3, 's'));
    assert.notStrictEqual(R.mathMod(12.2, 3), R.mathMod(12.2, 3));
    assert.notStrictEqual(R.mathMod(3, 12.2), R.mathMod(3, 12.2));
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

});
