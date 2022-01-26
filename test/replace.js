var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('replace', function() {

  it('replaces substrings of the input string', function() {
    eq(R.replace('1', 'one', '1 two three'), 'one two three');
  });

  it('replaces regex matches of the input string', function() {
    eq(R.replace(/\d+/g, 'num', '1 2 three'), 'num num three');
  });

});
