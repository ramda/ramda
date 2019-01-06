var R = require('../source');
var eq = require('./shared/eq');


describe('all', function() {
  var even = function(n) {return n % 2 === 0;};
  var T = function() {return true;};
  var isFalse = function(x) { return x === false; };

  it('returns true if all elements satisfy the predicate', function() {
    eq(R.all(even, [2, 4, 6, 8, 10, 12]), true);
    eq(R.all(isFalse, [false, false, false]), true);
  });

  it('returns false if any element fails to satisfy the predicate', function() {
    eq(R.all(even, [2, 4, 6, 8, 9, 10]), false);
  });

  it('returns true for an empty list', function() {
    eq(R.all(T, []), true);
  });

  it('works with more complex objects', function() {
    var xs = [{x: 'abc'}, {x: 'ade'}, {x: 'fghiajk'}];
    function len3(o) { return o.x.length === 3; }
    function hasA(o) { return o.x.indexOf('a') > -1; }
    eq(R.all(len3, xs), false);
    eq(R.all(hasA, xs), true);
  });

});
