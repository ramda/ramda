var assert = require('assert');

var R = require('..');


describe('replace', function() {

    it('replaces substrings of the input string', function() {
        assert.strictEqual(R.replace('1', 'one', '1 two three'), 'one two three');
    });

    it('replaces regex matches of the input string', function() {
        assert.strictEqual(R.replace(/\d+/g, 'num', '1 2 three'), 'num num three');
    });

    it('is curried up to 3 arguments', function() {
        assert(R.replace(null) instanceof Function);
        assert(R.replace(null, null) instanceof Function);

        var replaceSemicolon = R.replace(';');
        var removeSemicolon = replaceSemicolon('');
        assert.strictEqual(removeSemicolon('return 42;'), 'return 42');
    });

});
