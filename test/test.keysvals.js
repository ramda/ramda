var assert = require("assert");
var R = require("..");


describe("keys", function() {
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();

    it("returns an array of the given object's own keys", function() {
        assert.deepEqual(R.keys(obj), ['a','b','c','d','e','f']);
    });

    it("should work with hasOwnProperty override", function() {
        assert.deepEqual(R.keys({
            /* jshint -W001 */
            "hasOwnProperty": false
            /* jshint +W001 */
        }), ["hasOwnProperty"]);
    });

    it("should work for primitives", function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, "", true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.keys(cobj), ['a', 'b']);
    });
});

describe("keysIn", function() {
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();

    it("returns an array of the given object's keys", function() {
        assert.deepEqual(R.keysIn(obj), ['a','b','c','d','e','f']);
    });

    it("includes the given object's prototype properties", function() {
        assert.deepEqual(R.keysIn(cobj), ['a', 'b', 'x', 'y']);
    });

    it("should work for primitives", function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, "", true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });
});


describe("values", function() {
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        assert.deepEqual(R.values(obj), [100,[1,2,3],{x: 200, y: 300},'D',null,undefined]);
        assert.deepEqual(R.values({
            /* jshint -W001 */
            hasOwnProperty: false
            /* jshint +W001 */
        }), [false]);
    });

    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(R.values(cobj), [100, 200]);
    });

    it("should work for primitives", function() {
        var result = R.map(function(val) {
            return R.keys(val);
        }, [null, undefined, 55, "", true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });
});

describe("valuesIn", function() {
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();

    it("returns an array of the given object's values", function() {
        assert.deepEqual(R.valuesIn(obj), [100,[1,2,3],{x: 200, y: 300},'D',null,undefined]);
    });

    it("includes the given object's prototype properties", function() {
        assert.deepEqual(R.valuesIn(cobj), [100, 200, C.prototype.x, 'y']);
    });

    it("should work for primitives", function() {
        var result = R.map(function(val) {
            return R.values(val);
        }, [null, undefined, 55, "", true, false, NaN, Infinity, , []]);
        assert.deepEqual(result, R.repeatN([], 10));
    });
});
