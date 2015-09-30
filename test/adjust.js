var R = require('..');
var eq = require('./shared/eq');

describe('adjust', function() {
  it('applies the given function to the value at the given index of the supplied array', function() {
    eq(R.adjust(R.add(1), 2, [0, 1, 2, 3]), [0, 1, 3, 3]);
  });

  it('offsets negative indexes from the end of the array', function() {
    eq(R.adjust(R.add(1), -3, [0, 1, 2, 3]), [0, 2, 2, 3]);
  });

  it('returns the original array if the supplied index is out of bounds', function() {
    var list = [0, 1, 2, 3];
    eq(R.adjust(R.add(1), 4, list), list);
    eq(R.adjust(R.add(1), -5, list), list);
  });

  it('does not mutate the original array', function() {
    var list = [0, 1, 2, 3];
    eq(R.adjust(R.add(1), 2, list), [0, 1, 3, 3]);
    eq(list, [0, 1, 2, 3]);
  });

  it('curries the arguments', function() {
    eq(R.adjust(R.add(1))(2)([0, 1, 2, 3]), [0, 1, 3, 3]);
  });

  it('accepts an array-like object', function() {
    function args() {
      return arguments;
    }
    eq(R.adjust(R.add(1), 2, args(0, 1, 2, 3)), [0, 1, 3, 3]);
  });
});
