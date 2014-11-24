var assert = require('assert');
var R = require('..');


describe('keys', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's own keys", function() {
        assert.deepEqual(R.keys(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);
    });

    it('works with hasOwnProperty override', function() {
        assert.deepEqual(R.keys({
            /* jshint -W001 */
            hasOwnProperty: false
            /* jshint +W001 */
        }), ['hasOwnProperty']);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.keys(cobj).sort(), ['a', 'b']);
    });
});

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
        assert.deepEqual(result, R.repeatN([], 10));
    });
});


describe('values', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        var vs = R.values(obj).sort();
        var ts = [[1, 2, 3], 100, 'D', {x: 200, y: 300}, null, undefined];
        assert.equal(vs.length, ts.length);
        assert.deepEqual(vs[0], ts[0]);
        assert.equal(vs[1], ts[1]);
        assert.equal(vs[2], ts[2]);
        assert.deepEqual(vs[3], ts[3]);
        assert.equal(vs[4], ts[4]);
        assert.equal(vs[5], ts[5]);

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
        assert.deepEqual(result, R.repeatN([], 10));
    });
});

describe('valuesIn', function() {
    var obj = {a: 100, b: [1, 2, 3], c: {x: 200, y: 300}, d: 'D', e: null, f: undefined};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return 'x'; };
    C.prototype.y = 'y';
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        var vs = R.valuesIn(obj);
        assert(vs.length === 6);
        assert(R.indexOf(100, vs) > -1);
        assert(R.indexOf('D', vs) > -1);
        assert(R.indexOf(null, vs) > -1);
        assert(R.indexOf(undefined, vs) > -1);
        assert(R.indexOf(obj.b, vs) > -1);
        assert(R.indexOf(obj.c, vs) > -1);
    });

    it("includes the given object's prototype properties", function() {
        var vs = R.valuesIn(cobj);
        assert(vs.length === 4);
        assert(R.indexOf(100, vs) > -1);
        assert(R.indexOf(200, vs) > -1);
        assert(R.indexOf(cobj.x, vs) > -1);
        assert(R.indexOf('y', vs) > -1);
    });

    it('works for primitives', function() {
        var result = R.map(function(val) {
            return R.values(val);
        }, [null, undefined, 55, '', true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });
});
