var eq = require('./shared/eq');
var R = require('../source');

describe('clamp', function() {
  it('clamps to the lower bound', function() {
    eq(R.clamp(1, 10, 0), 1);
    eq(R.clamp(3, 12, 1), 3);
    eq(R.clamp(-15, 3, -100), -15);
  });

  it('clamps to the upper bound', function() {
    eq(R.clamp(1, 10, 20), 10);
    eq(R.clamp(3, 12, 23), 12);
    eq(R.clamp(-15, 3, 16), 3);
  });

  it('leaves it alone when within the bound', function() {
    eq(R.clamp(1, 10, 4), 4);
    eq(R.clamp(3, 12, 6), 6);
    eq(R.clamp(-15, 3, 0), 0);
  });

  it('works with letters as well', function() {
    eq(R.clamp('d', 'n', 'f'), 'f');
    eq(R.clamp('d', 'n', 'a'), 'd');
    eq(R.clamp('d', 'n', 'q'), 'n');
  });

});
