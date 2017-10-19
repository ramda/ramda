var R = require('..');
var eq = require('./shared/eq');


describe('gte', function() {
  it('reports whether one item is less than another', function() {
    eq(R.gte(3, 5), false);
    eq(R.gte(6, 4), true);
    eq(R.gte(7.0, 7.0), true);
    eq(R.gte('abc', 'xyz'), false);
    eq(R.gte('abcd', 'abc'), true);
  });

});
