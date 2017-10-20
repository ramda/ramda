var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('of', function() {

  it('behaves like Z.of', function() {
    eq(R.of(Array, 100), [100]);
    eq(R.of(Array, [100]), [[100]]);
    eq(R.of(Array, null), [null]);
    eq(R.of(Array, undefined), [undefined]);
    eq(R.of(Array, []), [[]]);
    eq(R.of(S.Maybe, null), S.Just(null));
    eq(R.of(S.Maybe, S.Just(0)), S.Just(S.Just(0)));
  });

});
