var R = require('../source');
var eq = require('./shared/eq');


describe('gt', function() {
  it('reports whether one item is greater than another', function() {
    eq(R.gt(3, 5), false);
    eq(R.gt(6, 4), true);
    eq(R.gt(7.0, 7.0), false);
    eq(R.gt('abc', 'xyz'), false);
    eq(R.gt('abcd', 'abc'), true);
  });

});
