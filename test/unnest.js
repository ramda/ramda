var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('unnest', function() {

  it('only flattens one layer deep of a nested list', function() {
    eq(R.unnest([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [[1, 2], [3, 4], [5, 6], [7, 8]]);
  });

  it('flattens an array of empty arrays', function() {
    eq(R.unnest([[], [], []]), []);
    eq(R.unnest([]), []);
  });

  it('is equivalent to R.chain(R.identity)', function() {
    eq(R.unnest(S.Nothing), S.Nothing);
    eq(R.unnest(S.Just(S.Nothing)), S.Nothing);
    eq(R.unnest(S.Just(S.Just(S.Nothing))), S.Just(S.Nothing));
    eq(R.unnest(S.Just(S.Just(42))), S.Just(42));
    eq(R.unnest(S.Just(S.Just(S.Just(42)))), S.Just(S.Just(42)));
  });

});
