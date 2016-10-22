var R = require('..');
var eq = require('./shared/eq');


describe('sequence', function() {

  it('operates on a list of lists', function() {
    eq(R.sequence(R.of, []), [[]]);
    eq(R.sequence(R.of, [[], [1, 2, 3, 4]]), []);
    eq(R.sequence(R.of, [[1], [2, 3, 4]]), [[1, 2], [1, 3], [1, 4]]);
    eq(R.sequence(R.of, [[1, 2], [3, 4]]), [[1, 3], [1, 4], [2, 3], [2, 4]]);
    eq(R.sequence(R.of, [[1, 2, 3], [4]]), [[1, 4], [2, 4], [3, 4]]);
    eq(R.sequence(R.of, [[1, 2, 3, 4], []]), []);
  });

});
