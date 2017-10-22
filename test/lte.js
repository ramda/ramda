var R = require('..');
var eq = require('./shared/eq');


describe('lte', function() {
  it('reports whether one item is less than another', function() {
    eq(R.lte(3, 5), true);
    eq(R.lte(6, 4), false);
    eq(R.lte(7.0, 7.0), true);
    eq(R.lte('abc', 'xyz'), true);
    eq(R.lte('abcd', 'abc'), false);
  });

});
