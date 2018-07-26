var R = require('../source');
var eq = require('./shared/eq');


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
