var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('mapKeys', function() {

  it('converts the keys of an object via the supplied function', function() {
    eq(R.mapKeys(R.toUpper, {a: 1, b: 2, c: 3, d: 4}), {A: 1, B: 2, C: 3, D: 4});
  });

  it('keeps the last key-value pair processed if multiple invocations return the same key', function() {
    eq(R.mapKeys(function(k) {return 'foo';}, {a: 1, b: 2, c: 3}), {foo: 3});
  });
});
