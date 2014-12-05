var assert = require('assert');

var R = require('..');


describe('pathEq', function() {

    var obj = {
        a: 1,
        b: {
            ba: '2'
        }
    };

    it('returns true if the path matches the value', function() {
        assert.ok(R.pathEq('a', 1, obj));
        assert.ok(R.pathEq('b.ba', '2', obj));
    });

    it('returns false for non matches', function() {
        assert.ok(!R.pathEq('a', '1', obj));
        assert.ok(!R.pathEq('b.ba', 2, obj));
    });

    it('returns false for non existing values', function() {
        assert.ok(!R.pathEq('c', 'foo', obj));
        assert.ok(!R.pathEq('c.d', 'foo', obj));
    });

});
