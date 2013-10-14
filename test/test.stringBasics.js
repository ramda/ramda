var assert = require('assert');
var Lib = require('./../ramda');

describe('substring', function() {
    var substring = Lib.substring;

    it('should return the substring of a string', function() {
        assert.equal(substring(2, 5, 'abcdefghijklm'), 'cde');
    });

    it('should be automatically curried', function() {
        var from2 = substring(2);
        assert.equal(from2(5, 'abcdefghijklm'), 'cde');
        var from2to5 = substring(2, 5);
        assert.equal(from2to5('abcdefghijklm'), 'cde');
    });
});

describe('substringFrom', function() {
    var substringFrom = Lib.substringFrom;

    it('should return the trailing substring of a string', function() {
        assert.equal(substringFrom(8, 'abcdefghijklm'), 'ijklm');
    });

    it('should be automatically curried', function() {
        var after8 = substringFrom(8);
        assert.equal(after8('abcdefghijklm'), 'ijklm');
    });
});

describe('substringTo', function() {
    var substringTo = Lib.substringTo;

    it('should return the trailing substring of a string', function() {
        assert.equal(substringTo(8, 'abcdefghijklm'), 'abcdefgh');
    });

    it('should be automatically curried', function() {
        var through8 = substringTo(8);
        assert.equal(through8('abcdefghijklm'), 'abcdefgh');
    });
});

describe('charAt', function() {
    var charAt = Lib.charAt;

    it('should return the character at the nth position of a string', function() {
        assert.equal(charAt(8, 'abcdefghijklm'), 'i');
    });

    it('should be automatically curried', function() {
        var at8 = charAt(8);
        assert.equal(at8('abcdefghijklm'), 'i');
    });
});

describe('charCodeAt', function() {
    var charCodeAt = Lib.charCodeAt;

    it('should return the ascii character at the nth position of a string', function() {
        assert.equal(charCodeAt(8, 'abcdefghijklm'), 105);  // 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105
    });

    it('should be automatically curried', function() {
        var at8 = charCodeAt(8);
        assert.equal(at8('abcdefghijklm'), 105);
    });
});

describe('match', function() {
    var match = Lib.match;
    var re = /[A-Z]\d\d\-[a-zA-Z]+/;

    it('should determine whether a string matches a regex', function() {
        assert.equal(match(re, 'B17-afn').length, 1);
        assert.equal(match(re, 'B1-afn'), undefined);
    });

    it('should be automatically curried', function() {
        var format = match(re);
        assert.equal(format('B17-afn').length, 1);
        assert.equal(format('B1-afn'), undefined);
    });
});

describe('strIndexOf', function() {
    var strIndexOf = Lib.strIndexOf;

    it('should find the index of a substring inside a string', function() {
        assert.equal(strIndexOf('c', 'abcdefg'), 2);
    });

    it('should return -1 if the value is not found', function() {
        assert.equal(strIndexOf('x', 'abcdefg'), -1);
    });

    it('should be automatically curried', function() {
        var findD = strIndexOf('d');
        assert.equal(findD('abcdefg'), 3);
    });
});

describe('strLastIndexOf', function() {
    var strLastIndexOf = Lib.strLastIndexOf;

    it('should find the index of a substring inside a string', function() {
        assert.equal(strLastIndexOf('a', 'bananas'), 5);
    });

    it('should return -1 if the value is not found', function() {
        assert.equal(strLastIndexOf('x', 'abcdefg'), -1);
    });

    it('should be automatically curried', function() {
        var findA = strLastIndexOf('a');
        assert.equal(findA('banana split'), 5);
    });
});

describe('toUpperCase', function() {
    var toUpperCase = Lib.toUpperCase;

    it('should uppercase a string', function() {
        assert.equal(toUpperCase('abc'), 'ABC');
    });
});

describe('toLowerCase', function() {
    var toLowerCase = Lib.toLowerCase;

    it('should lowercase a string', function() {
        assert.equal(toLowerCase('XYZ'), 'xyz');
    });
});

