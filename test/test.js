var assert = require('assert');

var R = require('..');
var errorEq = require('./shared/errorEq');
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
      errorEq(TypeError,
              'Invalid value\n' +
              '\n' +
              'test :: RegExp -> String -> Boolean\n' +
              '        ^^^^^^\n' +
              '          1\n' +
              '\n' +
              '1)  "foo" :: String\n' +
              '\n' +
              'The value at position 1 is not a member of ‘RegExp’.\n')
    );
  });

});
