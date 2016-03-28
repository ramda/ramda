var R = require('..');
var eq = require('./shared/eq');

describe('groupWith', function() {

  it('splits the list into groups according to the grouping function', function() {
    eq(R.groupWith(R.equals, [1, 2, 2, 3]), [[1], [2, 2], [3]]);
    eq(R.groupWith(R.equals, [1, 1, 1, 1]), [[1, 1, 1, 1]]);
    eq(R.groupWith(R.equals, [1, 2, 3, 4]), [[1], [2], [3], [4]]);
  });

  it('returns an empty array if given an empty array', function() {
    eq(R.groupWith(R.equals, []), []);
  });

  it('can be turned into the original list through concatenation', function() {
    var list = [1, 1, 2, 3, 4, 4, 5, 5];
    eq(R.unnest(R.groupWith(R.equals, list)), list);
    eq(R.unnest(R.groupWith(R.complement(R.equals), list)), list);
    eq(R.unnest(R.groupWith(R.T, list)), list);
    eq(R.unnest(R.groupWith(R.F, list)), list);
  });

  it('also works on strings', function() {
    eq(R.groupWith(R.equals)('Mississippi'), ['M','i','ss','i','ss','i','pp','i']);
  });

});
