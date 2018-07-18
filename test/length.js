var R = require('..');
var eq = require('./shared/eq');


describe('length', function() {
  it('returns the length of a list', function() {
    eq(R.length([]), 0);
    eq(R.length(['a', 'b', 'c', 'd']), 4);
  });

  it('returns the length of a string', function() {
    eq(R.length(''), 0);
    eq(R.length('xyz'), 3);
  });

  it('returns the size of a es6 set', function() {
    if (typeof Set !== 'function') { return; }
    eq(R.length(new Set()), 0);
    eq(R.length(new Set(['x', 'y', 'z'])), 3);
  });

  it('returns the size of a es6 map', function() {
    if (typeof Map !== 'function') { return; }
    eq(R.length(new Map()), 0);
    eq(R.length(new Map([['k1', 'v1'], ['k2', 'v2']])), 2);
  });

  it('returns the length of a function', function() {
    eq(R.length(function() {}), 0);
    eq(R.length(function(x, y, z) { return z; }), 3);
  });

  it('returns the length of an arguments object', function() {
    eq(R.length((function() { return arguments; })()), 0);
    eq(R.length((function() { return arguments; })('x', 'y', 'z')), 3);
  });

  it('returns NaN for value of unexpected type', function() {
    eq(R.identical(NaN, R.length(0)), true);
    eq(R.identical(NaN, R.length({})), true);
    eq(R.identical(NaN, R.length(null)), true);
    eq(R.identical(NaN, R.length(undefined)), true);
  });

  it('returns NaN for length property of unexpected type', function() {
    eq(R.identical(NaN, R.length({length: ''})), true);
    eq(R.identical(NaN, R.length({length: '1.23'})), true);
    eq(R.identical(NaN, R.length({length: null})), true);
    eq(R.identical(NaN, R.length({length: undefined})), true);
    eq(R.identical(NaN, R.length({})), true);
  });

});
