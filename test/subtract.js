var R = require('../source');
var eq = require('./shared/eq');


describe('subtract', function() {
  it('subtracts two numbers', function() {
    eq(R.subtract(22, 7), 15);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.subtract('1', '2'), -1);
    eq(R.subtract(1, '2'), -1);
    eq(R.subtract(true, false), 1);
    eq(R.subtract(null, null), 0);
    eq(R.subtract(undefined, undefined), NaN);
    eq(R.subtract(new Date(1), new Date(2)), -1);
  });

});
