var jsv = require('jsverify');

var R = require('..');
var eq = require('./shared/eq');
var funcN = require('./shared/funcN');


describe('flip', function() {
  it('returns a function that flips all arguments', () => {
    var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    var g = R.flipAll(f);
    eq(f('a', 'b', 'c'), 'a b c');
    eq(g('a', 'b', 'c'), 'c b a');
  });

  it('returns a curried function', function() {
    var f = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    var g = R.flipAll(f)('a');
    eq(g('b', 'c'), 'c b a');
  });

  it('returns a function with the correct arity', function() {
    var f2 = function(a, b) {return a + ' ' + b;};
    var f3 = function(a, b, c) {return a + ' ' + b + ' ' + c;};
    eq(R.flipAll(f2).length, 2);
    eq(R.flipAll(f3).length, 3);
  });

});

describe('flip properties', function() {
  jsv.property('inverts arguments', funcN(3), jsv.json, jsv.json, jsv.json, function(f, a, b, c) {
    var g = R.flipAll(f);
    return R.equals(f(a, b, c), g(c, b, a));
  });
});
