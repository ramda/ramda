var assert = require('assert');

var R = require('..');


describe('join', function() {
    it("concatenates a list's elements to a string, with an seperator string between elements", function() {
        var list = [1, 2, 3, 4];
        assert.strictEqual(R.join('~', list), '1~2~3~4');
    });
});
