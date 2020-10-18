var R = require('../source');
var eq = require('./shared/eq');
var fc = require('fast-check');


describe('symmetricDifference', function() {
  var M = [1, 2, 3, 4];
  var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
  var N = [3, 4, 5, 6];
  var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
  var Z = [3, 4, 5, 6, 10];
  var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];

  it('finds the set of all elements in the first or second list but not both', function() {
    eq(R.symmetricDifference(M, N), [1, 2, 5, 6]);
  });

  it('does not allow duplicates in the output even if the input lists had duplicates', function() {
    eq(R.symmetricDifference(M2, N2), [1, 2, 5, 6]);
  });

  it('has R.equals semantics', function() {
    function Just(x) { this.value = x; }
    Just.prototype.equals = function(x) {
      return x instanceof Just && R.equals(x.value, this.value);
    };

    eq(R.symmetricDifference([0], [-0]).length, 2);
    eq(R.symmetricDifference([-0], [0]).length, 2);
    eq(R.symmetricDifference([NaN], [NaN]).length, 0);
    eq(R.symmetricDifference([new Just([42])], [new Just([42])]).length, 0);
  });

  it('works for arrays of different lengths', function() {
    eq(R.symmetricDifference(Z, Z2), [10, 1, 2, 7, 8]);
    eq(R.symmetricDifference(Z2, Z), [1, 2, 7, 8, 10]);
  });

  it('will not create a "sparse" array', function() {
    eq(R.symmetricDifference(M2, [3]).length, 3);
  });

  it('returns an empty array if there are no different elements', function() {
    eq(R.symmetricDifference(M2, M), []);
    eq(R.symmetricDifference(M, M2), []);
  });

  // Arbitrary producing arrays of unique values (with respect to R.equals)
  var compatibleREquals = fc.array(fc.anything({
    maxDepth: 0,
    withBoxedValues: true,
    withNullPrototype: true,
    withObjectString: true
  })).map(array => R.uniq(array));

  it('returns empty arrays when receiving twice the same array', function() {
    fc.assert(fc.property(fc.clone(compatibleREquals, 2), function(arrays) {
      var A1 = arrays[0];
      var A2 = arrays[1];
      eq(R.symmetricDifference(A1, A2), []);
    }));
  });

  it('returns empty arrays when receiving an array and a permutation of it', function() {
    fc.assert(fc.property(fc.clone(compatibleREquals, 2).chain(function(arrays) {
      return fc.tuple(fc.constant(arrays[0]), fc.shuffledSubarray(arrays[1], arrays[1].length, arrays[1].length));
    }), function(arrays) {
      var A1 = arrays[0];
      var A2 = arrays[1];
      eq(R.symmetricDifference(A1, A2), []);
    }));
  });

  it('returns missing items when receiving an array and a permuted subset of it', function() {
    fc.assert(fc.property(fc.clone(compatibleREquals, 2).chain(function(arrays) {
      return fc.tuple(fc.constant(arrays[0]), fc.shuffledSubarray(arrays[1]));
    }), function(arrays) {
      var A1 = arrays[0];
      var A2 = arrays[1];
      eq(R.symmetricDifference(A1, A2).length, A1.length - A2.length);
    }));
  });

  it('returns an array not containing too many items', function() {
    fc.assert(fc.property(compatibleREquals, compatibleREquals, compatibleREquals, compatibleREquals, compatibleREquals, function(A1, A2, B, C1, C2) {
      var M = R.uniq(A1.concat(B).concat(C1));
      var N = R.uniq(A2.concat(B).concat(C2));
      var difference = R.symmetricDifference(M, N);
      var upperBoundDifferenceLength = A1.length + A2.length + C1.length + C2.length;
      eq(difference.length <= upperBoundDifferenceLength, true);
    }));
  });

  it('returns an array containing only items coming from one of the sources', function() {
    fc.assert(fc.property(compatibleREquals, compatibleREquals, compatibleREquals, compatibleREquals, compatibleREquals, function(A1, A2, B, C1, C2) {
      var M = R.uniq(A1.concat(B).concat(C1));
      var N = R.uniq(A2.concat(B).concat(C2));
      var MN = R.uniq(M.concat(N));
      var difference = R.symmetricDifference(M, N);
      eq(R.symmetricDifference(difference, MN).length, MN.length - difference.length);
    }));
  });

});
