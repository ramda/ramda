var assert = require("assert");
var Lib = require("./../ramda");

describe('flatten', function() {
    var flatten = Lib.flatten;

    it("turns a nested list into one flat list", function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(flatten(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
        assert.deepEqual(flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it("is not destructive", function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.notEqual(flatten(nest), nest);
    });

    it("handles ridiculously large inputs", function() {
        assert.equal(flatten([new Array(1000000), Lib.range(0, 56000), 5, 1, 3]).length, 1056003);
    });
});