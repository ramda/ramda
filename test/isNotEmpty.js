var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('isNotEmpty', function() {

  it('returns true for null', function() {
    eq(R.isNotEmpty(null), true);
  });

  it('returns true for undefined', function() {
    eq(R.isNotEmpty(undefined), true);
  });

  it('returns false for empty string', function() {
    eq(R.isNotEmpty(''), false);
    eq(R.isNotEmpty(' '), true);
  });

  it('returns false for empty array', function() {
    eq(R.isNotEmpty([]), false);
    eq(R.isNotEmpty([[]]), true);
  });

  it('returns false for empty typed array', function() {
    eq(R.isNotEmpty(Uint8Array.from('')), false);
    eq(R.isNotEmpty(Float32Array.from('')), false);
    eq(R.isNotEmpty(new Float32Array([])), false);
    eq(R.isNotEmpty(Uint8Array.from('1')), true);
    eq(R.isNotEmpty(Float32Array.from('1')), true);
    eq(R.isNotEmpty(new Float32Array([1])), true);
  });

  it('returns false for empty object', function() {
    eq(R.isNotEmpty({}), false);
    eq(R.isNotEmpty({x: 0}), true);
  });

  it('returns false for empty arguments object', function() {
    eq(R.isNotEmpty((function() { return arguments; })()), false);
    eq(R.isNotEmpty((function() { return arguments; })(0)), true);
  });

  it('returns true for every other value', function() {
    eq(R.isNotEmpty(0), true);
    eq(R.isNotEmpty(NaN), true);
    eq(R.isNotEmpty(['']), true);
  });

});
