var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('isNil', function() {
  it('tests a value for `null` or `undefined`', function() {
    eq(R.isNil(void 0), true);
    eq(R.isNil(null), true);
    eq(R.isNil([]), false);
    eq(R.isNil({}), false);
    eq(R.isNil(0), false);
    eq(R.isNil(''), false);
  });

});
