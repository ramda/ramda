var R = require('../source');
var eq = require('./shared/eq');

describe('defaultTo', function() {

  var defaultTo42 = R.defaultTo(42);

  it('returns the default value if input is null, undefined or NaN', function() {
    eq(42, defaultTo42(null));
    eq(42, defaultTo42(undefined));
    eq(42, defaultTo42(NaN));
  });

  it('returns the input value if it is not null/undefined', function() {
    eq('a real value', defaultTo42('a real value'));
  });

  it('returns the input value even if it is considered falsy', function() {
    eq('', defaultTo42(''));
    eq(0, defaultTo42(0));
    eq(false, defaultTo42(false));
    eq([], defaultTo42([]));
  });

  it('can be called with both arguments directly', function() {
    eq(42, R.defaultTo(42, null));
    eq('a real value', R.defaultTo(42, 'a real value'));
  });

});
