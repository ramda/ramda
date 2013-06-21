var assert = require("assert");
var Lib = require("./../ramda");

describe('flatten', function() {
    var flatten = Lib.flatten;

    it("turns a nested list into one flat list", function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(flatten(nest), [1,2,3,4,5,6,7,8,9,10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
    });
});