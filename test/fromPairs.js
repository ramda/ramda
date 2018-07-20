var R = require('../source');
var eq = require('./shared/eq');


describe('fromPairs', function() {

  it('combines an array of two-element arrays into an object', function() {
    eq(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]), {a: 1, b: 2, c: 3});
  });

  it('gives later entries precedence over earlier ones', function() {
    eq(R.fromPairs([['x', 1], ['x', 2]]), {x: 2});
  });

});
