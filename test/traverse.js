var R = require('..');
var eq = require('./shared/eq');


describe('traverse', function() {

  it('operates on a list of lists', function() {
    eq(R.traverse(R.of, R.map(R.add(10)), []), [[]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[], [1, 2, 3, 4]]), []);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1], [2, 3, 4]]), [[11, 12], [11, 13], [11, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2], [3, 4]]), [[11, 13], [11, 14], [12, 13], [12, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2, 3], [4]]), [[11, 14], [12, 14], [13, 14]]);
    eq(R.traverse(R.of, R.map(R.add(10)), [[1, 2, 3, 4], []]), []);
  });

});
