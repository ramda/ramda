var R = require('..');
var eq = require('./shared/eq');


describe('inRange', function() {
  it('works with list', function() {
    eq(R.inRange(1, [5, 1]), true);
    eq(R.inRange(2, [4, 1]), true);
    eq(R.inRange(100, [4, 1]), false);
    eq(R.inRange(2.1, [4, 5.0]), false);
    eq(R.inRange(8.8, [2.4, 10.3]), true);
  });
});
