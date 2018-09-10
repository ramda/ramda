var R = require('../source');
var eq = require('./shared/eq');


describe('difference', function() {
  var M = [1, 2, 3, 4];
  var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  var Z = [3, 4, 5, 6, 10];
  var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
  it('finds the set of all elements in the first list not contained in the second', function() {
    eq(R.difference(M, N), [1, 2]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    eq(R.difference(M2, N2), [1, 2]);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.difference([0], [-0]).length, 1);
    eq(R.difference([-0], [0]).length, 1);
    eq(R.difference([NaN], [NaN]).length, 0);
    eq(R.difference([new Just([42])], [new Just([42])]).length, 0);
  });

  it('works for arrays of different lengths', function() {
    eq(R.difference(Z, Z2), [10]);
    eq(R.difference(Z2, Z), [1, 2, 7, 8]);
  });

  it('will not create a "sparse" array', function() {
    eq(R.difference(M2, [3]).length, 3);
  });

  it('returns an empty array if there are no different elements', function() {
    eq(R.difference(M2, M), []);
    eq(R.difference(M, M2), []);
    eq(R.difference([], M2), []);
  });

});
