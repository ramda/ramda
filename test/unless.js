var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var _isArrayLike = require('../source/internal/_isArrayLike.js');


describe('unless', function() {
  it('calls the whenFalse function if the validator returns a falsy value', function() {
    eq(R.unless(_isArrayLike, R.of)(10), [10]);
  });

  it('returns the argument unmodified if the validator returns a truthy value', function() {
    eq(R.unless(_isArrayLike, R.of)([10]), [10]);
  });

  it('returns a curried function', function() {
    eq(R.unless(_isArrayLike)(R.of)(10), [10]);
    eq(R.unless(_isArrayLike)(R.of)([10]), [10]);
  });

});
