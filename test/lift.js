var R = require('..');

var eq = require('./shared/eq');


describe('lift', function() {

  it('lifts a unary function', function() {
    eq(R.lift(R.inc, [1, 2, 3]), [2, 3, 4]);
  });

});
