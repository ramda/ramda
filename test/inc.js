var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('inc', function() {

  it('increments its argument', function() {
    eq(R.inc(-1), 0);
    eq(R.inc(0), 1);
    eq(R.inc(1), 2);
    eq(R.inc(12.34), 13.34);
    eq(R.inc(-Infinity), -Infinity);
    eq(R.inc(Infinity), Infinity);
  });

});
