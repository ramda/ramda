var jsv = require('jsverify');

var R = require('../source');
var eq = require('./shared/eq');
var funcN = require('./shared/funcN');


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

  it('can be used as right section', function() {
    const isPositive = R.flip(R.gt, 0);
    eq(isPositive(5), true);
    eq(isPositive(-5), false);
  });

});

describe('flip properties', function() {
  jsv.property('inverts first two arguments', funcN(3), jsv.json, jsv.json, jsv.json, function(f, a, b, c) {
    var g = R.flip(f);
    return R.equals(f(a, b, c), g(b, a, c));
  });
});
