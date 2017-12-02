var R = require('..');
var eq = require('./shared/eq');


describe('pairwise', function() {

  it('creates a pairwise array', function() {
    const input = [1, 4, 9, 16];
    eq(R.pairwise(input), [[1, 4], [4, 9], [9, 16]]);
  });

});
