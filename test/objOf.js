var assert = require('assert');

var R = require('..');


describe('objOf', function() {

  it('creates an object containing a single key:value pair', function() {
    assert.deepEqual(R.objOf('foo', 42), {foo: 42});
    assert.deepEqual(R.objOf('foo')(42), {foo: 42});
  });

});
