var R = require('..');
var eq = require('./shared/eq');
var jsc = require('jsverify');


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

  it('is curried', function() {
    var incr = R.add(1);
    eq(incr(42), 43);
  });

  describe('properties', function() {
    jsc.property('commutative', 'integer', 'integer', function(a, b) {
      return R.add(a,b) === R.add(b,a);
    });

    jsc.property('associative', 'integer', 'integer', 'integer', function(a, b, c) {
      return R.add(a, R.add(b, c)) === R.add(R.add(a, b), c);
    });

    jsc.property('identity element', 'integer' , function(a) {
      return R.add(a, 0) === a && R.add(0, a) === a;
    });
  });

});
