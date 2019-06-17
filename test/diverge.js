var R = require('../source');
var eq = require('./shared/eq');


describe('diverge', function() {
  it('returns the results of applying the arguments individually to two separate functions', function() {
    eq(R.diverge([R.add(1), R.add(3)])(2), [3, 5]);
    eq(R.diverge([R.add(1), R.add(3)], 2), [3, 5]);
  });

  it('works with empty functions list', function() {
    var output = R.diverge([], 2);
    eq(output, []);
  });
});
