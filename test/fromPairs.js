var R = require('..');
var eq = require('./shared/eq');


describe('fromPairs', function() {
  it('combines an array of two-element arrays into an object', function() {
    eq(R.fromPairs([['a', 1], ['b', 2], ['c', 3]]), {a: 1, b: 2, c: 3});
  });
  it('skips empty Arrays and non-Array elements', function() {
    eq(R.fromPairs([['a', 1], 'x', [], ['b', 2], {}, ['c', 3]]), {a: 1, b: 2, c: 3});
  });
});
