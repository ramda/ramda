var assert = require('assert');

var R = require('..');


describe('converge', function() {
  var mult = function(a, b) {return a * b;};

  var f1 = R.converge(mult,
                      function(a) { return a; },
                      function(a) { return a; });
  var f2 = R.converge(mult,
                      function(a) { return a; },
                      function(a, b) { return b; });
  var f3 = R.converge(mult,
                      function(a) { return a; },
                      function(a, b, c) { return c; });

  it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
    assert.strictEqual(R.converge(mult, R.add(1), R.add(3))(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
  });

  it('returns a function with the length of the "longest" argument', function() {
    assert.strictEqual(f1.length, 1);
    assert.strictEqual(f2.length, 2);
    assert.strictEqual(f3.length, 3);
  });

  it('returns a curried function', function() {
    assert.strictEqual(f2(6)(7), 42);
    assert.strictEqual(f3(R.__).length, 3);
  });
});
