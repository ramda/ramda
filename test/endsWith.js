var R = require('..');
var eq = require('./shared/eq');

describe('startsWith', function() {
  it('should return true when a string ends with the provided value', function() {
    eq(R.endsWith('c', 'abc'), true);
  });

  it('should return false when a string does not end with the provided value', function() {
    eq(R.endsWith('b', 'abc'), false);
  });

  it('should return true when an array ends with the provided value', function() {
    eq(R.endsWith(['c'], ['a', 'b', 'c']), true);
  });

  it('should return false when an array does not end with the provided value', function() {
    eq(R.endsWith(['b'], ['a', 'b', 'c']), false);
  });
});
