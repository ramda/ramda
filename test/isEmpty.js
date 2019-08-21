var R = require('../source');
var eq = require('./shared/eq');


describe('isEmpty', function() {

  it('returns false for null', function() {
    eq(R.isEmpty(null), false);
  });

  it('returns false for undefined', function() {
    eq(R.isEmpty(undefined), false);
  });

  it('returns true for empty string', function() {
    eq(R.isEmpty(''), true);
    eq(R.isEmpty(' '), false);
  });

  it('returns true for empty array', function() {
    eq(R.isEmpty([]), true);
    eq(R.isEmpty([[]]), false);
  });

  it('returns true for empty typed array', function() {
    eq(R.isEmpty(Uint8Array.from('')), true);
    eq(R.isEmpty(Float32Array.from('')), true);
    eq(R.isEmpty(new Float32Array([])), true);
    eq(R.isEmpty(Uint8Array.from('1')), false);
    eq(R.isEmpty(Float32Array.from('1')), false);
    eq(R.isEmpty(new Float32Array([1])), false);
  });

  it('returns true for empty object', function() {
    eq(R.isEmpty({}), true);
    eq(R.isEmpty({x: 0}), false);
  });

  it('returns true for empty arguments object', function() {
    eq(R.isEmpty((function() { return arguments; })()), true);
    eq(R.isEmpty((function() { return arguments; })(0)), false);
  });

  it('returns false for every other value', function() {
    eq(R.isEmpty(0), false);
    eq(R.isEmpty(NaN), false);
    eq(R.isEmpty(['']), false);
  });

});
