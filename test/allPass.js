var R = require('..');
var eq = require('./shared/eq');


describe('allPass', function() {
  var odd = function(n) { return n % 2 !== 0; };
  var lt20 = function(n) { return n < 20; };
  var gt5 = function(n) { return n > 5; };
  var plusEq = function(w, x, y, z) { return w + x === y + z; };

  it('reports whether all predicates are satisfied by a given value', function() {
    var ok = R.allPass([odd, lt20, gt5]);
    eq(ok(7), true);
    eq(ok(9), true);
    eq(ok(10), false);
    eq(ok(3), false);
    eq(ok(21), false);
  });

  it('consumes arguments as expected', function() {
    var ok0 = R.allPass([odd, plusEq]);
    var ok1 = R.allPass([odd, plusEq], 5);
    var ok2 = R.allPass([odd, plusEq], 5, 7);
    var ok3 = R.allPass([odd, plusEq], 5, 7, 5);
    var ok4 = R.allPass([odd, plusEq], 5, 7, 5, 7);
    eq(ok0(5, 7, 5, 7), true);
    eq(ok1(7, 5, 7), true);
    eq(ok2(5, 7), true);
    eq(ok3(7), true);
    eq(ok4, true);

    var ok11a = ok1(7);
    var ok11b = ok1(7);
    var ok11a1 = ok11a(5);
    eq(ok11a(5, 7), true);
    eq(ok11b(5, 7), true);
    eq(ok11a1(7), true);
  });

  it('returns true on empty predicate list', function() {
    eq(R.allPass([])(3), true);
  });

  it('returns a curried function whose arity matches that of the highest-arity predicate', function() {
    eq(R.allPass([odd, gt5, plusEq]).length, 4);
    eq(R.allPass([odd, gt5, plusEq])(9, 9, 9, 9), true);
    eq(R.allPass([odd, gt5, plusEq])(9)(9)(9)(9), true);
  });

});
