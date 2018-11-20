var R = require('../source');
var eq = require('./shared/eq');

var list = ['a', 'b', 'c', 'd', 'e', 'f'];

describe('move', function() {
  it('moves an element from an index to another', function() {
    eq(R.move(0, 1, list), ['b', 'a', 'c', 'd', 'e', 'f']);
    eq(R.move(2, 1, list), ['a', 'c', 'b', 'd', 'e', 'f']);
    eq(R.move(-1, 0, list), ['f', 'a', 'b', 'c', 'd', 'e']);
    eq(R.move(0, -1, list), ['b', 'c', 'd', 'e', 'f', 'a']);
  });

  it('handles correctly outbounds indexes', function() {
    eq(R.move(-20, 2, list), ['b', 'c', 'a', 'd', 'e', 'f']);
    eq(R.move(20, 2, list), ['a', 'b', 'f', 'c', 'd', 'e']);
    eq(R.move(2, 20, list), ['a', 'b', 'd', 'e', 'f', 'c']);
    eq(R.move(2, -20, list), ['c', 'a', 'b', 'd', 'e', 'f']);
    eq(R.move(20, 20, list), list);
  });
});
