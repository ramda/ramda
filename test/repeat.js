var R = require('..');
var eq = require('./shared/eq');


describe('repeat', function() {
  it('returns a lazy list of identical values', function() {
    eq(R.repeat(0, 5), [0, 0, 0, 0, 0]);
  });

  it('can accept any value, including `null`', function() {
    eq(R.repeat(null, 3), [null, null, null]);
  });

  it('is curried', function() {
    var makeFoos = R.repeat('foo');
    eq(makeFoos(0), []);
    eq(makeFoos(3), ['foo', 'foo', 'foo']);
  });
});
