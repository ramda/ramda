var assert = require("assert");
var R = require("./../ramda");

describe('flatten', function() {
    var flatten = R.flatten;

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
        assert.equal(flatten([new Array(1000000), R.range(0, 56000), 5, 1, 3]).length, 1056003);
    });

    it("handles array-like objects", function() {
        var o = { length: 3, "0": [1, 2, [3]], "1": [], "2": ["a", "b", "c", ["d", "e"]] };
        assert.deepEqual(flatten(o), [1, 2, 3, "a", "b", "c", "d", "e"]);
    });

});

describe('unnest', function() {
    var unnest = R.unnest;

    it("only flattens one layer deep of a nested list", function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.deepEqual(unnest(nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
        nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
        assert.deepEqual(unnest(nest), [[[3]],2,1,0,[-1,-2],-3]);
        assert.deepEqual(unnest([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
    });

    it("is not destructive", function() {
        var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
        assert.notEqual(unnest(nest), nest);
    });

    it("handles array-like objects", function() {
        var o = { length: 3, "0": [1, 2, [3]], "1": [], "2": ["a", "b", "c", ["d", "e"]]};
        assert.deepEqual(unnest(o), [1, 2, [3], "a", "b", "c", ["d", "e"]]);
    });

});
