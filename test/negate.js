var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('negate', function() {

  it('negates its argument', function() {
    eq(R.negate(-Infinity), Infinity);
    eq(R.negate(-1), 1);
    eq(R.negate(-0), 0);
    eq(R.negate(0), -0);
    eq(R.negate(1), -1);
    eq(R.negate(Infinity), -Infinity);
  });

});
