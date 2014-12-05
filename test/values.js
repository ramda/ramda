var assert = require('assert');

var R = require('..');


describe('values', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        var vs = R.values(obj).sort();
        var ts = [[1, 2, 3], 100, 'D', {x: 200, y: 300}, null, undefined];
        assert.strictEqual(vs.length, ts.length);
        assert.deepEqual(vs[0], ts[0]);
        assert.strictEqual(vs[1], ts[1]);
        assert.strictEqual(vs[2], ts[2]);
        assert.deepEqual(vs[3], ts[3]);
        assert.strictEqual(vs[4], ts[4]);
        assert.strictEqual(vs[5], ts[5]);

        assert.deepEqual(R.values({
            /* jshint -W001 */
            hasOwnProperty: false
            /* jshint +W001 */
        }), [false]);
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.values(cobj), [100, 200]);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeat([], 10));
    });
});
