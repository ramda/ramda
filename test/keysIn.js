var assert = require('assert');

var R = require('..');


describe('keysIn', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's keys", function() {
        assert.deepEqual(R.keysIn(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it("includes the given object's prototype properties", function() {
        assert.deepEqual(R.keysIn(cobj).sort(), ['a', 'b', 'x', 'y']);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });
});
