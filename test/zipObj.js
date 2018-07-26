var R = require('../source');
var eq = require('./shared/eq');


describe('zipObj', function() {
  it('combines an array of keys with an array of values into a single object', function() {
    eq(R.zipObj(['a', 'b', 'c'], [1, 2, 3]), {a: 1, b: 2, c: 3});
  });

  it('ignores extra values', function() {
    eq(R.zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {a: 1, b: 2, c: 3});
  });

  it('ignores extra keys', function() {
    eq(R.zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]), {a: 1, b: 2, c: 3});
  });

  it('last one in wins when there are duplicate keys', function() {
    eq(R.zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {a: 'LAST', b: 2, c: 3});
  });

});
