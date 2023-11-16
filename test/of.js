const { Maybe, Just } = require('sanctuary');

var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('of', function() {
  it('returns its argument as an Array', function() {
    eq(R.of(Array, 100), [100]);
    eq(R.of(Array, [100]), [[100]]);
    eq(R.of(Array, null), [null]);
    eq(R.of(Array, undefined), [undefined]);
    eq(R.of(Array, []), [[]]);
  });

  it('dispatches to an available of method', function() {
    eq(R.of(Maybe, 100), Just(100));
  });
});
