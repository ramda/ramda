var R = require('..');
var eq = require('./shared/eq');


describe('isGt', function() {
  it('reports whether one item is less than another', function() {
    eq(R.map(R.isGt(3), [1, 2, 3, 4]), [false, false, false, true]);
  });
});
