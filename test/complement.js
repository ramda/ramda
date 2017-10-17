var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('complement', function() {
  it('creates boolean-returning function that reverses another', function() {
    var even = function(x) {return x % 2 === 0;};
    var f = R.complement(even);
    eq(f(8), false);
    eq(f(13), true);
  });

  it('accepts fantasy-land functors', function() {
    eq(R.complement(S.Just(true)), S.Just(false));
    eq(R.complement(S.Just(false)), S.Just(true));
    eq(R.complement(S.Nothing), S.Nothing);
  });

});
