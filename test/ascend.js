var R = require('../source');
var eq = require('./shared/eq');

describe('ascend', function() {
  it('builds an ascending comparator function out of the identity function', function() {
    eq([3, 1, 8, 1, 2, 5].sort(R.ascend(R.identity)), [1, 1, 2, 3, 5, 8]);
  });
});
