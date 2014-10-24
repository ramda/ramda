var assert = require('assert');
var R = require('..');

describe('concat', function() {
    it('concatenates two strings', function() {
        assert.strictEqual(R.string.concat('foo', 'bar'), 'foobar');
    });

    it('coerces non-string arguments', function() {
        assert.strictEqual(R.string.concat(123, 456), '123456');
    });

    it('is automatically curried', function() {
        assert.strictEqual(R.string.concat('foo')('bar'), 'foobar');
    });
});

describe('substring', function() {
    it('returns the substring of a string', function() {
        assert.equal(R.string.substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('is automatically curried', function() {
        var from2 = R.string.substring(2);
        assert.equal(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = R.string.substring(2, 5);
        assert.equal(from2to5('abcdefghijklm'), 'cde');
    });
});

describe('substringFrom', function() {
    it('returns the trailing substring of a string', function() {
        assert.equal(R.string.substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('is automatically curried', function() {
        var after8 = R.string.substringFrom(8);
        assert.equal(after8('abcdefghijklm'), 'ijklm');
    });
});

describe('substringTo', function() {
    it('returns the trailing substring of a string', function() {
        assert.equal(R.string.substringTo(8, 'abcdefghijklm'), 'abcdefgh');
    });

    it('is automatically curried', function() {
        var through8 = R.string.substringTo(8);
        assert.equal(through8('abcdefghijklm'), 'abcdefgh');
    });
});

describe('charAt', function() {
    it('returns the character at the nth position of a string', function() {
        assert.equal(R.string.charAt(8, 'abcdefghijklm'), 'i');
    });

    it('is automatically curried', function() {
        var at8 = R.string.charAt(8);
        assert.equal(at8('abcdefghijklm'), 'i');
    });
});

describe('charCodeAt', function() {
    it('returns the ascii character at the nth position of a string', function() {
        assert.equal(R.string.charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('is automatically curried', function() {
        var at8 = R.string.charCodeAt(8);
        assert.equal(at8('abcdefghijklm'), 105);
    });
});

describe('match', function() {
    var re = /[A-Z]\d\d\-[a-zA-Z]+/;

    it('determines whether a string matches a regex', function() {
        assert.equal(R.string.match(re, 'B17-afn').length, 1);
        assert.equal(R.string.match(re, 'B1-afn'), null);
    });

    it('is automatically curried', function() {
        var format = R.string.match(re);
        assert.equal(format('B17-afn').length, 1);
        assert.equal(format('B1-afn'), null);
    });
});

describe('indexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.equal(R.string.indexOf('c', 'abcdefg'), 2);
    });

    it('returns -1 if the value is not found', function() {
        assert.equal(R.string.indexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findD = R.string.indexOf('d');
        assert.equal(findD('abcdefg'), 3);
    });
});

describe('lastIndexOf', function() {
    it('finds the index of a substring inside a string', function() {
        assert.equal(R.string.lastIndexOf('a', 'bananas'), 5);
    });

    it('returns -1 if the value is not found', function() {
        assert.equal(R.string.lastIndexOf('x', 'abcdefg'), -1);
    });

    it('is automatically curried', function() {
        var findA = R.string.lastIndexOf('a');
        assert.equal(findA('banana split'), 5);
    });
});

describe('toUpperCase', function() {
    it('returns the upper-case equivalent of the input string', function() {
        assert.equal(R.string.toUpperCase('abc'), 'ABC');
    });
});

describe('toLowerCase', function() {
    it('returns the lower-case equivalent of the input string', function() {
        assert.equal(R.string.toLowerCase('XYZ'), 'xyz');
    });
});

describe('trim', function() {
    var test = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFFHello, World!\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    it('trims a string', function() {
        assert.equal(R.string.trim('   xyz  '), 'xyz');
    });

    it('trims all ES5 whitespace', function() {
        assert.equal(R.string.trim(test), 'Hello, World!');
        assert.equal(R.string.trim(test).length, 13);
    });

    it('does not trim the zero-width space', function() {
        assert.equal(R.string.trim('\u200b'), '\u200b');
        assert.equal(R.string.trim('\u200b').length, 1);
    });

    if (typeof String.prototype.trim !== 'function') {
        it('falls back to a shim if String.prototype.trim is not present', function() {
            assert.equal(R.string.trim('   xyz  '), 'xyz');
            assert.equal(R.string.trim(test), 'Hello, World!');
            assert.equal(R.string.trim(test).length, 13);
            assert.equal(R.string.trim('\u200b'), '\u200b');
            assert.equal(R.string.trim('\u200b').length, 1);
        });
    }
});

describe('split', function() {
    it('splits a string into an array', function() {
        assert.deepEqual(R.string.split('.', 'a.b.c.xyz.d'), ['a', 'b', 'c', 'xyz', 'd']);
    });

    it('the split string can be arbitrary', function() {
        assert.deepEqual(R.string.split('at', 'The Cat in the Hat sat on the mat'), ['The C', ' in the H', ' s', ' on the m', '']);
    });
});
