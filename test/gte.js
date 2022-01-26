var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('gte', function() {
  it('reports whether one item is greater than or equal to another', function() {
    eq(R.gte(3, 5), false);
    eq(R.gte(6, 4), true);
    eq(R.gte(7.0, 7.0), true);
    eq(R.gte('abc', 'xyz'), false);
    eq(R.gte('abcd', 'abc'), true);
  });

});
