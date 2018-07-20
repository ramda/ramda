var R = require('../source');
var eq = require('./shared/eq');
var _isArrayLike = require('../source/internal/_isArrayLike');


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
