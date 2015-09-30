var R = require('..');
var eq = require('./shared/eq');


describe('replace', function() {

  it('replaces substrings of the input string', function() {
    eq(R.replace('1', 'one', '1 two three'), 'one two three');
  });

  it('replaces regex matches of the input string', function() {
    eq(R.replace(/\d+/g, 'num', '1 2 three'), 'num num three');
  });

  it('is curried up to 3 arguments', function() {
    eq(R.replace(null).constructor, Function);
    eq(R.replace(null, null).constructor, Function);

    var replaceSemicolon = R.replace(';');
    var removeSemicolon = replaceSemicolon('');
    eq(removeSemicolon('return 42;'), 'return 42');
  });

});
