var assert = require("assert");
var Lib = require("./../ramda");


describe("keys", function() {
    var keys = Lib.keys;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    it("returns an array of the given object's keys", function() {
        assert.deepEqual(keys(obj), ['a','b','c','d','e','f']);
    });
});


describe("values", function() {
    var values = Lib.values;
    var obj = {a: 100, b: [1,2,3], c: { x: 200, y: 300}, d: "D", e: null, f: (function(){}())};
    var undef;
    it("returns an array of the given object's values", function() {
        assert.deepEqual(values(obj), [100,[1,2,3],{x: 200, y: 300},'D',null,undef]);
    });
});


