var R = require('../source');
var eq = require('./shared/eq');

describe('update', function() {
  it('updates the value at the given index of the supplied array', function() {
    eq(R.update(2, 4, [0, 1, 2, 3]), [0, 1, 4, 3]);
  });

  it('offsets negative indexes from the end of the array', function() {
    eq(R.update(-3, 4, [0, 1, 2, 3]), [0, 4, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', function() {
    var list = [0, 1, 2, 3];
    eq(R.update(4, 4, list), list);
    eq(R.update(-5, 4, list), list);
  });

  it('does not mutate the original array', function() {
    var list = [0, 1, 2, 3];
    eq(R.update(2, 4, list), [0, 1, 4, 3]);
    eq(list, [0, 1, 2, 3]);
  });

  it('curries the arguments', function() {
    eq(R.update(2)(4)([0, 1, 2, 3]), [0, 1, 4, 3]);
  });

  it('accepts an array-like object', function() {
    function args() {
      return arguments;
    }
    eq(R.update(2, 4, args(0, 1, 2, 3)), [0, 1, 4, 3]);
  });

});
