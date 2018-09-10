var R = require('../source');
var eq = require('./shared/eq');


describe('includes', function() {
  it('returns true if an element is in a list', function() {
    eq(R.includes(7, [1, 2, 3, 9, 8, 7, 100, 200, 300]), true);
  });

  it('returns false if an element is not in a list', function() {
    eq(R.includes(99, [1, 2, 3, 9, 8, 7, 100, 200, 300]), false);
  });

  it('returns false for the empty list', function() {
    eq(R.includes(1, []), false);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.includes(0, [-0]), false);
    eq(R.includes(-0, [0]), false);
    eq(R.includes(NaN, [NaN]), true);
    eq(R.includes(new Just([42]), [new Just([42])]), true);
  });

  it('returns true if substring is part of string', function() {
    eq(R.includes('ba', 'banana'), true);
  });

});
