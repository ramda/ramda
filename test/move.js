var R = require('../source');
var eq = require('./shared/eq');

describe.only('move', function() {
  it('should correctly moves an element from an index to another', function() {
    eq(R.move(0, 1, [1,2,3]), [2,1,3]);
    eq(R.move(2, 1, [1,2,3]), [1,3,2]);
    eq(R.move(-1, 0, [1,2,3]), [3,1,2]);
  });

  it('should move the element at the end when the destination index is outside liste bounds', function() {
    eq(R.move(0, 20, [1,2,3]), [2,3,1]);
  });

  it('should do nothing when source index is outside liste bounds', function() {
    eq(R.move(20, 0, [1,2,3]), [1,2,3]);
    eq(R.move(20, 20, [1,2,3]), [1,2,3]);
  });
});
