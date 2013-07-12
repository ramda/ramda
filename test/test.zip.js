var assert = require("assert");
var Lib = require("./../ramda");

describe('zipWith', function() {
    var zipWith = Lib.zipWith;
    var a = [1,2,3], b = [100, 200, 300], c = [10, 20, 30, 40, 50, 60];
    var add = function(a, b) { return a + b; };
    var x = function(a, b) { return a * b; };
    var s = function(a, b) { return a + ' cow ' + b; };
    it("returns an array created by applying its passed-in function pair-wise on its passed in arrays", function() {
        assert.deepEqual(zipWith(add, a, b), [101, 202, 303]);
        assert.deepEqual(zipWith(x, a, b), [100, 400, 900]);
        assert.deepEqual(zipWith(s, a, b), ['1 cow 100', '2 cow 200', '3 cow 300']);
    });

    it("returns an array whose length is equal to the shorter of its input arrays", function() {
        assert.equal(zipWith(add, a, c).length, a.length);
    });
});

describe('zip', function() {
    it("returns an array of 'tuples'", function() {
        var zip = Lib.zip;
        var a = [1,2,3], b = [100, 200, 300];
        assert.deepEqual(zip(a, b), [[1, 100], [2, 200], [3, 300]]);
    });
});
