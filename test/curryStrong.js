var R = require('..');
var eq = require('./shared/eq');


describe('curryStrong', function() {
  var allNums = [R.is(Number), R.is(Number), R.is(Number), R.is(Number)];
  var bothStrings = [R.is(String), R.is(String)];
  var mix = [R.is(String), R.is(Boolean), R.equals(['c'])];
  function plusTimesDiv(a, b, c, d) { return (a + b * c) / d; }

  it('accepts a list of constraints to apply to in order to the returned function\'s arguments', function() {
    eq(typeof R.curryStrong(allNums, function(a, b, c) { return a + b + c; }), 'function');
  });

  it('throws if the constraints are violated', function() {
    var s = R.curryStrong(bothStrings, function(a, b) { return a + b; });
    try {
      s(1, 2);
      eq(true, false); // should throw before here
    } catch (e) {
      eq(e instanceof TypeError, true);
    }
  });

  it('throws as soon as a bad argument is passed in', function() {
    var s = R.curryStrong(bothStrings, function(a, b) { return a + b; });
    try {
      s(1);
      eq(true, false);
    } catch (e) {
      eq(e instanceof TypeError, true);
    }
  });

  it('can handle mixed/arbitrary constraints', function() {
    var m = R.curryStrong(mix, function(a, b, c) { return c.concat(a, b); });
    eq(m('abc', true, ['c']), ['c', 'abc', true]);
    try {
      m('abc', true, ['d']);
      eq(true, false);
    } catch (e) {
      eq(e instanceof TypeError, true);
    }
  });

  it('curries a single value', function() {
    var f = R.curryStrong(allNums, plusTimesDiv); // f(12, 3, 6, 2) == 15
    var g = f(12);
    eq(g(3, 6, 2), 15);
  });

  it('curries multiple values', function() {
    var f = R.curryStrong(allNums, plusTimesDiv); // f(12, 3, 6, 2) == 15
    var g = f(12, 3);
    eq(g(6, 2), 15);
    var h = f(12, 3, 6);
    eq(h(2), 15);
  });

  it('allows further currying of a curried function', function() {
    var f = R.curryStrong(allNums, plusTimesDiv); // f(12, 3, 6, 2) == 15
    var g = f(12);
    eq(g(3, 6, 2), 15);
    var h = g(3);
    eq(h(6, 2), 15);
    eq(g(3, 6)(2), 15);
  });

  it('properly reports the length of the curried function', function() {
    var f = R.curryStrong(allNums, plusTimesDiv);
    eq(f.length, 4);
    var g = f(12);
    eq(g.length, 3);
    var h = g(3);
    eq(h.length, 2);
    eq(g(3, 6).length, 1);
  });
});
