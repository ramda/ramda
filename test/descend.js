var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('descend', function() {
  it('builds a descending comparator function out of the identity function', function() {
    eq([3, 1, 8, 1, 2, 5].sort(R.descend(R.identity)), [8, 5, 3, 2, 1, 1]);
  });
});
