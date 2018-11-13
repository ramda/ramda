var R = require('../source');
var eq = require('./shared/eq');

var list = [8, 6, 7, 5, 3, 0, 9];

describe('move', function() {
  it('moves an element from an index to another', function() {
    eq(R.move(0, 1, list), [6, 8, 7, 5, 3, 0, 9]);
    eq(R.move(2, 1, list), [8, 7, 6, 5, 3, 0, 9]);
    eq(R.move(-1, 0, list), [9, 8, 6, 7, 5, 3, 0]);
    eq(R.move(0, -1, list), [6, 7, 5, 3, 0, 9, 8]);
  });

  it('move the element at the end when the destination index is outside list bounds', function() {
    eq(R.move(0, 20, list), [6, 7, 5, 3, 0, 9, 8]);
  });

  it('do nothing when source index is outside list bounds', function() {
    eq(R.move(20, 0, list), list);
    eq(R.move(20, 20, list), list);
  });
});
