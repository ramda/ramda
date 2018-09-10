var R = require('../source');
var eq = require('./shared/eq');


describe('useWith', function() {
  function max() { return Math.max.apply(Math, arguments); }
  function add1(x) { return x + 1; }
  function mult2(x) { return x * 2; }
  function div3(x) { return x / 3; }
  var f = R.useWith(max, [add1, mult2, div3]);

  it('takes a list of function and returns a function', function() {
    eq(typeof R.useWith(max, []), 'function');
    eq(typeof R.useWith(max, [add1]), 'function');
    eq(typeof R.useWith(max, [add1, mult2, div3]), 'function');
  });

  it('passes the arguments received to their respective functions', function() {
    eq(f(7, 8, 9), 16); // max(7 + 1, 8 * 2, 9 / 3);
  });

  it('passes additional arguments to the main function', function() {
    eq(f(7, 8, 9, 10), 16);
    eq(f(7, 8, 9, 20), 20);
  });

  it('has the correct arity', function() {
    eq(f.length, 3);
  });

  it('passes context to its functions', function() {
    var a = function(x) { return this.f1(x); };
    var b = function(x) { return this.f2(x); };
    var c = function(x, y) { return this.f3(x, y); };
    var d = R.useWith(c, [a, b]);
    var context = {f1: R.add(1), f2: R.add(2), f3: R.add};
    eq(a.call(context, 1), 2);
    eq(b.call(context, 1), 3);
    eq(d.apply(context, [1, 1]), 5);
    eq(d.apply(context, [2, 3]), 8);
  });

});
