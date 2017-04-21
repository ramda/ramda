var assert = require('assert');

var R = require('..');


describe('words', function() {

  it('splits a string into a list of words', function() {
    assert.deepEqual(R.words(''), []);
    assert.deepEqual(R.words(' '), []);
    assert.deepEqual(R.words('foo bar baz'), ['foo', 'bar', 'baz']);
    assert.deepEqual(R.words(' foo bar baz '), ['foo', 'bar', 'baz']);
    assert.deepEqual(R.words('\tfoo\n\tbar\n\tbaz\n'), ['foo', 'bar', 'baz']);
  });

});
