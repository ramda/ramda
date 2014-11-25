var assert = require('assert');
var R = require('..');

describe('substring', function() {
    it('returns the substring of a string', function() {
        assert.strictEqual(R.substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('is automatically curried', function() {
        var from2 = R.substring(2);
        assert.strictEqual(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = R.substring(2, 5);
        assert.strictEqual(from2to5('abcdefghijklm'), 'cde');
    });
});

describe('substringFrom', function() {
    it('returns the trailing substring of a string', function() {
        assert.strictEqual(R.substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('is automatically curried', function() {
        var after8 = R.substringFrom(8);
        assert.strictEqual(after8('abcdefghijklm'), 'ijklm');
    });
});

describe('substringTo', function() {
    it('returns the trailing substring of a string', function() {
        assert.strictEqual(R.substringTo(8, 'abcdefghijklm'), 'abcdefgh');
    });

    it('is automatically curried', function() {
        var through8 = R.substringTo(8);
        assert.strictEqual(through8('abcdefghijklm'), 'abcdefgh');
    });
});

describe('charAt', function() {
    it('returns the character at the nth position of a string', function() {
        assert.strictEqual(R.charAt(8, 'abcdefghijklm'), 'i');
    });

    it('is automatically curried', function() {
        var at8 = R.charAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 'i');
    });
});

describe('charCodeAt', function() {
    it('returns the ascii character at the nth position of a string', function() {
        assert.strictEqual(R.charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('is automatically curried', function() {
        var at8 = R.charCodeAt(8);
        assert.strictEqual(at8('abcdefghijklm'), 105);
    });
});

describe('match', function() {
    var re = /[A-Z]\d\d\-[a-zA-Z]+/;

    it('determines whether a string matches a regex', function() {
        assert.strictEqual(R.match(re, 'B17-afn').length, 1);
        assert.strictEqual(R.match(re, 'B1-afn'), null);
    });

    it('is automatically curried', function() {
        var format = R.match(re);
        assert.strictEqual(format('B17-afn').length, 1);
        assert.strictEqual(format('B1-afn'), null);
    });
});

describe('strIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strIndexOf('c', 'abcdefg'), 2);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findD = R.strIndexOf('d');
        assert.strictEqual(findD('abcdefg'), 3);
    });
});

describe('strLastIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.strictEqual(R.strLastIndexOf('a', 'bananas'), 5);
    });

    it('returns -1 if the value is not found', function() {
        assert.strictEqual(R.strLastIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findA = R.strLastIndexOf('a');
        assert.strictEqual(findA('banana split'), 5);
    });
});

describe('toUpperCase', function() {
    it('returns the upper-case equivalent of the input string', function() {
        assert.strictEqual(R.toUpperCase('abc'), 'ABC');
    });
});

describe('toLowerCase', function() {
    it('returns the lower-case equivalent of the input string', function() {
        assert.strictEqual(R.toLowerCase('XYZ'), 'xyz');
    });
});

describe('trim', function() {
    var test = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    it('trims a string', function() {
        assert.strictEqual(R.trim('   xyz  '), 'xyz');
    });

    it('trims all ES5 whitespace', function() {
        assert.strictEqual(R.trim(test), 'Hello, World!');
        assert.strictEqual(R.trim(test).length, 13);
    });

    it('does not trim the zero-width space', function() {
        assert.strictEqual(R.trim('\u200b'), '\u200b');
        assert.strictEqual(R.trim('\u200b').length, 1);
    });

    if (typeof String.prototype.trim !== 'function') {
        it('falls back to a shim if String.prototype.trim is not present', function() {
            assert.strictEqual(R.trim('   xyz  '), 'xyz');
            assert.strictEqual(R.trim(test), 'Hello, World!');
            assert.strictEqual(R.trim(test).length, 13);
            assert.strictEqual(R.trim('\u200b'), '\u200b');
            assert.strictEqual(R.trim('\u200b').length, 1);
        });
    }
});

describe('split', function() {
    it('splits a string into an array', function() {
        assert.deepEqual(R.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
    });

    it('the split string can be arbitrary', function() {
        assert.deepEqual(R.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
    });
});
