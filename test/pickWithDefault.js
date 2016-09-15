var R = require('..');
var eq = require('./shared/eq');


describe('pickWithDefault', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4};
  it('copies the named properties of an object to the new object', function() {
    eq(R.pickWithDefault(null, ['a', 'd'], obj), {a: 1, d: 4});
  });

  it('defaults properties not present on the input object', function() {
    eq(R.pickWithDefault(null, ['a', 'e', 'f'], obj), {a: 1, e: null, f: null});
  });
});
