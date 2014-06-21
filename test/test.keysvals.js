var assert = require("assert");
var Lib = require("./../ramda");


describe("keys", function() {
    var keys = Lib.keys;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();
    it("returns an array of the given object's own keys", function() {
        assert.deepEqual(keys(obj), ['a','b','c','d','e','f']);
        assert.deepEqual(keys({
            hasOwnProperty: false
        }), ['hasOwnProperty']);
    });
    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(keys(cobj), ['a', 'b']);
    });
});

describe("keysIn", function() {
    var keysIn = Lib.keysIn;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();
    it("returns an array of the given object's keys", function() {
        assert.deepEqual(keysIn(obj), ['a','b','c','d','e','f']);
    });
    it("includes the given object's prototype properties", function() {
        assert.deepEqual(keysIn(cobj), ['a', 'b', 'x', 'y']);
    });
});


describe("values", function() {
    var values = Lib.values;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    var undef;
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();
    it("returns an array of the given object's values", function() {
        assert.deepEqual(values(obj), [100,[1,2,3],{x: 200, y: 300},'D',null,undef]);
        assert.deepEqual(values({
            hasOwnProperty: false
        }), [false]);
    });
    it("does not include the given object's prototype properties", function() {
        assert.deepEqual(values(cobj), [100, 200]);
    });
});

describe("valuesIn", function() {
    var valuesIn = Lib.valuesIn;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    function C() { this.a = 100; this.b = 200; }
    C.prototype.x = function() { return "x"; };
    C.prototype.y = "y";
    var cobj = new C();
    it("returns an array of the given object's values", function() {
        assert.deepEqual(valuesIn(obj), [100,[1,2,3],{x: 200, y: 300},'D',null,undefined]);
    });
    it("includes the given object's prototype properties", function() {
        assert.deepEqual(valuesIn(cobj), [100, 200, C.prototype.x, 'y']);
    });
});



