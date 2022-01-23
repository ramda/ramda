var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('split', function() {
  it('splits a string into an array', function() {
    eq(R.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
  });

  it('the split string can be arbitrary', function() {
    eq(R.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
  });

});
