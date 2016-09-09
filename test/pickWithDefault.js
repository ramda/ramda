var R = require('..');
var eq = require('./shared/eq');


describe('pickWithDefault', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};
  it('copies the named properties of an object to the new object', function() {
    eq(R.pickWithDefault(['a', 'c', 'f'], null, obj), {a: 1, c: 3, f: 6});
  });

  it('defaults properties not present on the input object', function() {
    eq(R.pickWithDefault(['a', 'c', 'g'], null, obj), {a: 1, c: 3, g: null});
  });
});
