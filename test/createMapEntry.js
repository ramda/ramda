var R = require('..');
var eq = require('./shared/eq');


describe('createMapEntry', function() {
  it('creates an object containing a single key:value pair', function() {
    eq(R.createMapEntry('foo', 42), {foo: 42});
  });

  it('is curried', function() {
    eq(R.createMapEntry('foo')(42), {foo: 42});
  });
});
