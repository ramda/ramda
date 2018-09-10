var R = require('../source');
var eq = require('./shared/eq');

describe('startsWith', function() {
  it('should return true when a string ends with the provided value', function() {
    eq(R.endsWith('c', 'abc'), true);
  });

  it('should return true when a long string ends with the provided value', function() {
    eq(R.endsWith('ology', 'astrology'), true);
  });

  it('should return false when a string does not end with the provided value', function() {
    eq(R.endsWith('b', 'abc'), false);
  });

  it('should return false when a long string does not end with the provided value', function() {
    eq(R.endsWith('olog', 'astrology'), false);
  });

  it('should return true when an array ends with the provided value', function() {
    eq(R.endsWith(['c'], ['a', 'b', 'c']), true);
  });

  it('should return true when an array ends with the provided values', function() {
    eq(R.endsWith(['b', 'c'], ['a', 'b', 'c']), true);
  });

  it('should return false when an array does not end with the provided value', function() {
    eq(R.endsWith(['b'], ['a', 'b', 'c']), false);
  });

  it('should return false when an array does not end with the provided values', function() {
    eq(R.endsWith(['a', 'b'], ['a', 'b', 'c']), false);
  });
});
