var R = require('../source');
var eq = require('./shared/eq');


describe('uniq', function() {
  it('returns a set from any array (i.e. purges duplicate elements)', function() {
    var list = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    eq(R.uniq(list), [1, 2, 3]);
  });

  it('keeps elements from the left', function() {
    eq(R.uniq([1, 2, 3, 4, 1]), [1, 2, 3, 4]);
  });

  it('returns an empty array for an empty array', function() {
    eq(R.uniq([]), []);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.uniq([-0, -0]).length, 1);
    eq(R.uniq([0, -0]).length, 2);
    eq(R.uniq([NaN, NaN]).length, 1);
    eq(R.uniq([[1], [1]]).length, 1);
    eq(R.uniq([new Just([42]), new Just([42])]).length, 1);
  });

  it('handles null and undefined elements', function() {
    eq(R.uniq([void 0, null, void 0, null]), [void 0, null]);
  });

  it('uses reference equality for functions', function() {
    eq(R.uniq([R.add, R.identity, R.add, R.identity, R.add, R.identity]).length, 2);
  });

});
