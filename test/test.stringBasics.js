var assert = require('assert');
var R = require('..');

describe('substring', function() {
    it('should return the substring of a string', function() {
        assert.equal(R.substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('should be automatically curried', function() {
        var from2 = R.substring(2);
        assert.equal(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = R.substring(2, 5);
        assert.equal(from2to5('abcdefghijklm'), 'cde');
    });
});

describe('substringFrom', function() {
    it('should return the trailing substring of a string', function() {
        assert.equal(R.substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('should be automatically curried', function() {
        var after8 = R.substringFrom(8);
        assert.equal(after8('abcdefghijklm'), 'ijklm');
    });
});

describe('substringTo', function() {
    it('should return the trailing substring of a string', function() {
        assert.equal(R.substringTo(8, 'abcdefghijklm'), 'abcdefgh');
    });

    it('should be automatically curried', function() {
        var through8 = R.substringTo(8);
        assert.equal(through8('abcdefghijklm'), 'abcdefgh');
    });
});

describe('charAt', function() {
    it('should return the character at the nth position of a string', function() {
        assert.equal(R.charAt(8, 'abcdefghijklm'), 'i');
    });

    it('should be automatically curried', function() {
        var at8 = R.charAt(8);
        assert.equal(at8('abcdefghijklm'), 'i');
    });
});

describe('charCodeAt', function() {
    it('should return the ascii character at the nth position of a string', function() {
        assert.equal(R.charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('should be automatically curried', function() {
        var at8 = R.charCodeAt(8);
        assert.equal(at8('abcdefghijklm'), 105);
    });
});

describe('match', function() {
    var re = /[A-Z]\d\d\-[a-zA-Z]+/;

    it('should determine whether a string matches a regex', function() {
        assert.equal(R.match(re, 'B17-afn').length, 1);
        assert.equal(R.match(re, 'B1-afn'), null);
    });

    it('should be automatically curried', function() {
        var format = R.match(re);
        assert.equal(format('B17-afn').length, 1);
        assert.equal(format('B1-afn'), null);
    });
});

describe('strIndexOf', function() {
    it('should find the index of a substring inside a string', function() {
        assert.equal(R.strIndexOf('c', 'abcdefg'), 2);
    });

    it('should return -1 if the value is not found', function() {
        assert.equal(R.strIndexOf('x', 'abcdefg'), -1);
    });

    it('should be automatically curried', function() {
        var findD = R.strIndexOf('d');
        assert.equal(findD('abcdefg'), 3);
    });
});

describe('strLastIndexOf', function() {
    it('should find the index of a substring inside a string', function() {
        assert.equal(R.strLastIndexOf('a', 'bananas'), 5);
    });

    it('should return -1 if the value is not found', function() {
        assert.equal(R.strLastIndexOf('x', 'abcdefg'), -1);
    });

    it('should be automatically curried', function() {
        var findA = R.strLastIndexOf('a');
        assert.equal(findA('banana split'), 5);
    });
});

describe('toUpperCase', function() {
    it('should uppercase a string', function() {
        assert.equal(R.toUpperCase('abc'), 'ABC');
    });
});

describe('toLowerCase', function() {
    it('should lowercase a string', function() {
        assert.equal(R.toLowerCase('XYZ'), 'xyz');
    });
});

describe('trim', function() {
    var test = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    it('should trim a string', function() {
        assert.equal(R.trim('   xyz  '), 'xyz');
    });

    it('trims all ES5 whitespace', function() {
        assert.equal(R.trim(test), 'Hello, World!');
        assert.equal(R.trim(test).length, 13);
    });

    it('does not trim the zero-width space', function() {
        assert.equal(R.trim('\u200b'), '\u200b');
        assert.equal(R.trim('\u200b').length, 1);
    });

    if (typeof String.prototype.trim !== 'function') {
        it('falls back to a shim if String.prototype.trim is not present', function() {
            assert.equal(R.trim('   xyz  '), 'xyz');
            assert.equal(R.trim(test), 'Hello, World!');
            assert.equal(R.trim(test).length, 13);
            assert.equal(R.trim('\u200b'), '\u200b');
            assert.equal(R.trim('\u200b').length, 1);
        });
    }
});

describe('split', function() {
    it('should split a string into an array', function() {
        assert.deepEqual(R.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
    });

    it('the split string can be arbitrary', function() {
        assert.deepEqual(R.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
    });
});
