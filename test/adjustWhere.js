var R = require('..');
var eq = require('./shared/eq');

describe('adjustWhere', function() {
  it('applies the given function to the value where the predicate is true of the supplied array', function() {
    eq(R.adjustWhere(R.add(1), R.equals(2), [0, 1, 2, 2]), [0, 1, 3, 3]);
  });

  it('does not apply the given function to the values where the predicate is false of the supplied array', function() {
    eq(R.adjustWhere(R.add(1), R.equals(20), [0, 1, 2, 2]), [0, 1, 2, 2]);
  });

});
