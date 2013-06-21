var assert = require("assert");
var Lib = require("./../ramda");

describe('compose', function() {
    var compose = Lib.compose;
    function a(x) {return x + "A";}
    function b(x) {return x + "B";}
    function c(x) {return x + "C";}
    function d(x) {return x + "D";}

    it("executes its passed in functions in order from right to left", function() {
        assert.equal(compose(a, b, c, d)(""), "DCBA");
    });
    it("returns equivalent function if only passed one function argument", function() {
        assert.equal(compose(a)(""), a(""));
    });
});

describe('pipe', function() {
    var pipe = Lib.pipe;
    function a(x) {return x + "A";}
    function b(x) {return x + "B";}
    function c(x) {return x + "C";}
    function d(x) {return x + "D";}
    it("executes its passed in functions in order from left to right", function() {
        assert.equal(pipe(a, b, c, d)(""), "ABCD");
    });
    it("returns the equivalent function if only passed one function argument", function() {
        assert.equal(pipe(a)(""), a(""));
    });
});

