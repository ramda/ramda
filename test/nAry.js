var R = require('../source');
var eq = require('./shared/eq');


describe('nAry', function() {

  function toArray(args) { return Array.prototype.slice.call(args, 0); }

  it('turns multiple-argument function into a nullary one', function() {
    var fn = R.nAry(0, function(x, y, z) { void z; return toArray(arguments); });
    eq(fn.length, 0);
    eq(fn(1, 2, 3), []);
  });

  it('turns multiple-argument function into a ternary one', function() {
    var fn = R.nAry(3, function(a, b, c, d) { void d; return toArray(arguments); });
    eq(fn.length, 3);
    eq(fn(1, 2, 3, 4), [1, 2, 3]);
    eq(fn(1), [1]);
  });

  it('creates functions of arity less than or equal to ten', function() {
    var fn = R.nAry(10, function() { return toArray(arguments); });
    eq(fn.length, 10);
    eq(fn.apply(null, R.range(0, 25)), R.range(0, 10));

    var undefs = fn();
    eq(undefs.length, 0);
  });

});
