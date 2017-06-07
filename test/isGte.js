var R = require('..');
var eq = require('./shared/eq');


describe('isGte', function() {
  it('reports whether one item is less than  or equal to another', function() {
    eq(R.map(R.isGte(3), [1, 2, 3, 4]), [false, false, true, true]);
  });
});
