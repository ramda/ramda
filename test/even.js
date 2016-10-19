var R = require('..');
var eq = require('./shared/eq');


describe('even', function() {

  it('used with valid even values', function() {
    eq(R.even(2), true);
    eq(R.even(2.1), true);
    eq(R.even(4), true);
    eq(R.even(0), true);
    eq(R.even(-24002), true);
  });

  it('used with not even values', function() {
    eq(R.even(1), false);
    eq(R.even(5), false);
    eq(R.even(1.1), false);
    eq(R.even(-24001), false);
  });

  it('used with invalid values', function() {
    eq(R.even({abc: 'abc'}), false);
    eq(R.even([]), false);
    eq(R.even('abc'), false);
  });

});
