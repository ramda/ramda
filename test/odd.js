var R = require('..');
var eq = require('./shared/eq');


describe('odd', function() {

  it('used with valid odd values', function() {
    eq(R.odd(1), true);
    eq(R.odd(5), true);
    eq(R.odd(1.1), true);
    eq(R.odd(-24001), true);
  });

  it('used with not odd values', function() {
    eq(R.odd(2), false);
    eq(R.odd(0.1), false);
    eq(R.odd(2.1), false);
    eq(R.odd(4), false);
    eq(R.odd(0), false);
    eq(R.odd(-24002), false);
  });

  it('used with invalid values', function() {
    eq(R.odd({abc: 'abc'}), false);
    eq(R.odd([]), false);
    eq(R.odd('abc'), false);
  });
});
