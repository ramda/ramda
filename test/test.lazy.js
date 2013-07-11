var assert = require("assert");
var Lib = require("./../ramda");

describe('generator', function() {
    var generator = Lib.generator;
    var g;
    function I(x) { return x; }
    function inc(n) { return n + 1; }
    
    g = generator(0, I, inc);

    it("has a '0' property", function() {
        assert.equal(g[0], 0);
    });
    it("has a 'tail' method", function() {
        assert.equal(typeof g.tail, "function");
    });
    it("has a 'length' property equal to Infinity", function() {
        assert.equal(g.length, Infinity);
    });

});

