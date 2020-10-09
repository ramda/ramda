var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('add', function() {
  it('adds together two numbers', function() {
    eq(R.add(3, 7), 10);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.add('1', '2'), 3);
    eq(R.add(1, '2'), 3);
    eq(R.add(true, false), 1);
    eq(R.add(null, null), 0);
    eq(R.add(undefined, undefined), NaN);
    eq(R.add(new Date(1), new Date(2)), 3);
  });

});

describe('add properties', function() {
  it('commutative', function() {
    fc.assert(fc.property(fc.integer(), fc.integer(), function(a, b) {
      return R.add(a, b) === R.add(b, a);
    }));
  });

  it('associative', function() {
    fc.assert(fc.property(fc.integer(), fc.integer(), fc.integer(), function(a, b, c) {
      return R.add(a, R.add(b, c)) === R.add(R.add(a, b), c);
    }));
  });

  it('identity', function() {
    fc.assert(fc.property(fc.integer(), function(a) {
      return R.add(a, 0) === a && R.add(0, a) === a;
    }));
  });
});
