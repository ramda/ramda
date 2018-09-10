var R = require('../source');
var eq = require('./shared/eq');


describe('aperture', function() {
  var sevenLs = [1, 2, 3, 4, 5, 6, 7];
  it('creates a list of n-tuples from a list', function() {
    eq(R.aperture(1, sevenLs), [[1], [2], [3], [4], [5], [6], [7]]);
    eq(R.aperture(2, sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
    eq(R.aperture(3, sevenLs), [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
    eq(R.aperture(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', function() {
    eq(R.aperture(6, [1, 2, 3]), []);
    eq(R.aperture(1, []), []);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.aperture(2), sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
  });

});
