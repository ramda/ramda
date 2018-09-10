var R = require('../source');
var eq = require('./shared/eq');


describe('zip', function() {
  it('returns an array of "tuples"', function() {
    var a = [1, 2, 3];
    var b = [100, 200, 300];

    eq(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
  });

  it('returns a list as long as the shorter of the lists input', function() {
    var a = [1, 2, 3];
    var b = [100, 200, 300, 400];
    var c = [10, 20];

    eq(R.zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    eq(R.zip(a, c), [[1, 10], [2, 20]]);
  });

});
