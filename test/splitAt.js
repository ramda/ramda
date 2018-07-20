var R = require('../source');
var eq = require('./shared/eq');


describe('splitAt', function() {
  it('splits an array at a given index', function() {
    eq(R.splitAt(1, [1, 2, 3]), [[1], [2, 3]]);
  });

  it('splits a string at a given index', function() {
    eq(R.splitAt(5, 'hello world'), ['hello', ' world']);
  });

  it('can handle index greater than array length', function() {
    eq(R.splitAt(4, [1, 2]), [[1, 2], []]);
  });

  it('can support negative index', function() {
    eq(R.splitAt(-1, 'foobar'), ['fooba', 'r']);
  });

});
