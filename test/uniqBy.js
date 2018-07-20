var R = require('../source');
var eq = require('./shared/eq');


describe('uniqBy', function() {

  it('returns a set from any array based on predicate', function() {
    eq(R.uniqBy(Math.abs, [-2, -1, 0, 1, 2]), [-2, -1, 0]);
  });

  it('keeps elements from the left', function() {
    eq(R.uniqBy(Math.abs, [-1, 2, 4, 3, 1, 3]), [-1, 2, 4, 3]);
  });

  it('returns an empty array for an empty array', function() {
    eq(R.uniqBy(R.identity, []), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) {
      this.value = x;
    }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };
    eq(R.uniqBy(R.identity, [-0, 0]).length, 2);
    eq(R.uniqBy(R.identity, [NaN, NaN]).length, 1);
    eq(R.uniqBy(R.identity, [new Just([1, 2, 3]), new Just([1, 2, 3])]).length, 1);
  });

});
