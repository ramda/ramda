var R = require('..');
var eq = require('./shared/eq');


describe('isLt', function() {
  it('reports whether one item is less than another', function() {
    eq(R.map(R.isLt(3), [1, 2, 3, 4]), [true, true, false, false]);
  });
});
