var R = require('../source');
var eq = require('./shared/eq');

describe('adjust', function() {
  it('applies the given function to the value at the given index of the supplied array', function() {
    eq(R.adjust(2, R.add(1), [0, 1, 2, 3]), [0, 1, 3, 3]);
  });

  it('offsets negative indexes from the end of the array', function() {
    eq(R.adjust(-3, R.add(1), [0, 1, 2, 3]), [0, 2, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', function() {
    var list = [0, 1, 2, 3];
    eq(R.adjust(4, R.add(1), list), list);
    eq(R.adjust(-5, R.add(1), list), list);
  });

  it('does not mutate the original array', function() {
    var list = [0, 1, 2, 3];
    eq(R.adjust(2, R.add(1), list), [0, 1, 3, 3]);
    eq(list, [0, 1, 2, 3]);
  });

  it('accepts an array-like object', function() {
    function args() {
      return arguments;
    }
    eq(R.adjust(2, R.add(1), args(0, 1, 2, 3)), [0, 1, 3, 3]);
  });

});
