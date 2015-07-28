var assert = require('assert');

var R = require('..');


describe('pair', function() {

  it('creates a two-element array', function() {
    assert.deepEqual(R.pair('foo', 'bar'), ['foo', 'bar']);
    assert.deepEqual(R.pair('foo')('bar'), ['foo', 'bar']);
  });

});
