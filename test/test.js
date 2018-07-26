var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('test', function() {

  it('returns true if string matches pattern', function() {
    eq(R.test(/^x/, 'xyz'), true);
  });

  it('returns false if string does not match pattern', function() {
    eq(R.test(/^y/, 'xyz'), false);
  });

  it('is referentially transparent', function() {
    var pattern = /x/g;
    eq(pattern.lastIndex, 0);
    eq(R.test(pattern, 'xyz'), true);
    eq(pattern.lastIndex, 0);
    eq(R.test(pattern, 'xyz'), true);
  });

  it('throws if first argument is not a regexp', function() {
    assert.throws(
      function() { R.test('foo', 'bar'); },
      function(err) {
        return err.constructor === TypeError &&
               err.message === '‘test’ requires a value of type RegExp ' +
                               'as its first argument; received "foo"';
      }
    );
  });

});
