var R = require('../source');
var eq = require('./shared/eq');


describe('lt', function() {
  it('reports whether one item is less than another', function() {
    eq(R.lt(3, 5), true);
    eq(R.lt(6, 4), false);
    eq(R.lt(7.0, 7.0), false);
    eq(R.lt('abc', 'xyz'), true);
    eq(R.lt('abcd', 'abc'), false);
  });

});
