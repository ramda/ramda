var R = require('..');
var eq = require('./shared/eq');

describe('isNotNil', function() {
  it('tests a value if it is not `null` or not `undefined`', function() {
    eq(R.isNotNil(void 0), false);
    eq(R.isNotNil(null), false);
    eq(R.isNotNil([]), true);
    eq(R.isNotNil({}), true);
    eq(R.isNotNil(0), true);
    eq(R.isNotNil(''), true);
  });
});
