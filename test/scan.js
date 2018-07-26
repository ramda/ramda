var R = require('../source');
var eq = require('./shared/eq');


describe('scan', function() {
  var add = function(a, b) {return a + b;};
  var mult = function(a, b) {return a * b;};

  it('scans simple functions over arrays with the supplied accumulator', function() {
    eq(R.scan(add, 0, [1, 2, 3, 4]), [0, 1, 3, 6, 10]);
    eq(R.scan(mult, 1, [1, 2, 3, 4]), [1, 1, 2, 6, 24]);
  });

  it('returns the accumulator for an empty array', function() {
    eq(R.scan(add, 0, []), [0]);
    eq(R.scan(mult, 1, []), [1]);
  });

});
