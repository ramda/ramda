var assert = require('assert');

var R = require('..');


describe('unwords', function() {

  it('joins (with separating spaces) a list of words', function() {
    assert.deepEqual(R.unwords([]), '');
    assert.deepEqual(R.unwords(['foo', 'bar', 'baz']), 'foo bar baz');
    assert.deepEqual(R.unwords([' foo', ' bar', ' baz']), ' foo  bar  baz');
  });

});
