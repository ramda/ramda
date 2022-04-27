var R = require('../source/index.js');
var eq = require('./shared/eq.js');
var {Just} = require('./shared/Maybe.js');


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
    eq(R.eqBy(R.identity, new Just([42]), new Just([42])), true);
  });

});
