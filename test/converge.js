var R = require('../source');
var eq = require('./shared/eq');


describe('converge', function() {
  var mult = function(a, b) {return a * b;};

  var f1 = R.converge(mult, [
    function(a) { return a; },
    function(a) { return a; }
  ]);
  var f2 = R.converge(mult, [
    function(a) { return a; },
    function(a, b) { return b; }
  ]);
  var f3 = R.converge(mult, [
    function(a) { return a; },
    function(a, b, c) { return c; }
  ]);

  it('passes the results of applying the arguments individually to two separate functions into a single one', function() {
    eq(R.converge(mult, [R.add(1), R.add(3)])(2), 15); // mult(add1(2), add3(2)) = mult(3, 5) = 3 * 15;
  });

  it('returns a function with the length of the "longest" argument', function() {
    eq(f1.length, 1);
    eq(f2.length, 2);
    eq(f3.length, 3);
  });

  it('passes context to its functions', function() {
    var a = function(x) { return this.f1(x); };
    var b = function(x) { return this.f2(x); };
    var c = function(x, y) { return this.f3(x, y); };
    var d = R.converge(c, [a, b]);
    var context = {f1: R.add(1), f2: R.add(2), f3: R.add};
    eq(a.call(context, 1), 2);
    eq(b.call(context, 1), 3);
    eq(d.call(context, 1), 5);
  });

  it('returns a curried function', function() {
    eq(f2(6)(7), 42);
    eq(f3(R.__).length, 3);
  });

  it('works with empty functions list', function() {
    var fn = R.converge(function() { return arguments.length; }, []);
    eq(fn.length, 0);
    eq(fn(), 0);
  });

});
