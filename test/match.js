var assert = require('assert');

var R = require('..');


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
