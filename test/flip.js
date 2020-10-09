var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('flip', function() {
  it('returns a function which inverts the first two arguments to the supplied function', function() {
    var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    var g = R.flip(f);
    eq(f('a', 'b', 'c'), 'a b c');
    eq(g('a', 'b', 'c'), 'b a c');
  });

  it('returns a curried function', function() {
    var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    var g = R.flip(f)('a');
    eq(g('b', 'c'), 'b a c');
  });

  it('returns a function with the correct arity', function() {
    var f2 = function(a, b) {return a + ' ' + b;};
    var f3 = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    eq(R.flip(f2).length, 2);
    eq(R.flip(f3).length, 3);
  });

});

describe('flip properties', function() {
  it('inverts first two arguments', function() {
    fc.assert(fc.property(fc.func(fc.anything()), fc.anything(), fc.anything(), fc.anything(), function(f, a, b, c) {
      var g = R.flip(f);
      return R.equals(f(a, b, c), g(b, a, c));
    }));
  });
});
