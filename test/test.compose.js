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

describe('useWith', function() {
  var useWith = Lib.useWith;
 
  function max() { return Math.max.apply(Math, arguments); }
  function add1(x) { return x + 1; }
  function mult2(x) { return x * 2; }
  function dev3(x) { return x/3; }
 
  it("takes a arbitrary number of function arguments and returns a function", function() {
    assert.equal(typeof useWith(max), "function");
    assert.equal(typeof useWith(max, add1), "function");
    assert.equal(typeof useWith(max, add1, mult2, dev3), "function");
  });
});

