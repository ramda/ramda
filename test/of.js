var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('of', function() {
  it('returns its argument as an Array', function() {
    eq(R.of(100), [100]);
    eq(R.of([100]), [[100]]);
    eq(R.of(null), [null]);
    eq(R.of(undefined), [undefined]);
    eq(R.of([]), [[]]);
  });

});
