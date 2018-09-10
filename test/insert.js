var R = require('../source');
var eq = require('./shared/eq');


describe('insert', function() {
  it('inserts an element into the given list', function() {
    var list = ['a', 'b', 'c', 'd', 'e'];
    eq(R.insert(2, 'x', list), ['a', 'b', 'x', 'c', 'd', 'e']);
  });

  it('inserts another list as an element', function() {
    var list = ['a', 'b', 'c', 'd', 'e'];
    eq(R.insert(2, ['s', 't'], list), ['a', 'b', ['s', 't'], 'c', 'd', 'e']);
  });

  it('appends to the end of the list if the index is too large', function() {
    var list = ['a', 'b', 'c', 'd', 'e'];
    eq(R.insert(8, 'z', list), ['a', 'b', 'c', 'd', 'e', 'z']);
  });

});
