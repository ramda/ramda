var R = require('..');
var eq = require('./shared/eq');

describe('addDefault', function() {

  var addDefaultVal = R.addDefault('defaultVal', R.identity);

  it('returns the default value if origin fn\'s result is null, undefined or NaN', function() {
    eq('defaultVal', addDefaultVal(null));
    eq('defaultVal', addDefaultVal(undefined));
    eq('defaultVal', addDefaultVal(NaN));
  });

  it('returns the fn\'s result if it is not null/undefined/NaN', function() {
    eq('a real value', addDefaultVal('a real value'));
  });

  it('returns the fn\'s result even if it is considered falsy', function() {
    eq('', addDefaultVal(''));
    eq(0, addDefaultVal(0));
    eq(false, addDefaultVal(false));
    eq([], addDefaultVal([]));
  });

});
