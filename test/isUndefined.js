var R = require('../source');
var eq = require('./shared/eq');

describe('isUndefined', function() {
  it('tests a value for `undefined`', function() {
    eq(R.isUndefined(undefined), true);
    eq(R.isUndefined(null), false);
    eq(R.isUndefined([]), false);
    eq(R.isUndefined({}), false);
    eq(R.isUndefined(0), false);
    eq(R.isUndefined(''), false);
  });
});
