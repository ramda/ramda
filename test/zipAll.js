var R = require('..');
var eq = require('./shared/eq');

describe('zipAll', function() {
  it('returns an array of tuples', function() {
    var arr = [[1, 2, 3], [10, 20, 30], [100, 200, 300]];
    eq(R.zipAll(arr), [[1, 10, 100], [2, 20, 200], [3, 30, 300]]);
  });

  it('returns a list as long as the shorter of the lists input', function() {
    var arr = [[1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11, 12]];
    eq(R.zipAll(arr), [[1, 4, 8], [2, 5, 9], [3, 6, 10]]);
  });

});
