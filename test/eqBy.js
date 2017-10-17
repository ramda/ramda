var S = require('sanctuary');

var R = require('..');
var eq = require('./shared/eq');


describe('eqBy', function() {

  it('determines whether two values map to the same value in the codomain', function() {
    eq(R.eqBy(Math.abs, 5, 5), true);
    eq(R.eqBy(Math.abs, 5, -5), true);
    eq(R.eqBy(Math.abs, -5, 5), true);
    eq(R.eqBy(Math.abs, -5, -5), true);
    eq(R.eqBy(Math.abs, 42, 99), false);
  });

  it('has R.equals semantics', function() {
    eq(R.eqBy(R.identity, 0, -0), false);
    eq(R.eqBy(R.identity, -0, 0), false);
    eq(R.eqBy(R.identity, NaN, NaN), true);
    eq(R.eqBy(R.identity, S.Just([42]), S.Just([42])), true);
  });

});
