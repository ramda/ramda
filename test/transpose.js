var R = require('../source');
var eq = require('./shared/eq');

describe('transpose', function() {
  it('returns an array of two arrays', function() {
    var input = [['a', 1], ['b', 2], ['c', 3]];
    eq(R.transpose(input), [['a', 'b', 'c'], [1, 2, 3]]);
  });
  it('skips elements when rows are shorter', function() {
    var actual = R.transpose([[10, 11], [20], [], [30, 31, 32]]);
    var expected = [[10, 20, 30], [11, 31], [32]];
    eq(actual, expected);
  });
  it('copes with empty arrays', function() {
    eq(R.transpose([]), []);
  });
  it('copes with true, false, null & undefined elements of arrays', function() {
    var actual = R.transpose([[true, false, undefined, null], [null, undefined, false, true]]);
    var expected = [[true, null], [false, undefined], [undefined, false], [null, true]];
    eq(actual, expected);
  });
});
