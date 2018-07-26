var R = require('../source');
var eq = require('./shared/eq');


describe('of', function() {
  it('returns its argument as an Array', function() {
    eq(R.of(100), [100]);
    eq(R.of([100]), [[100]]);
    eq(R.of(null), [null]);
    eq(R.of(undefined), [undefined]);
    eq(R.of([]), [[]]);
  });

});
