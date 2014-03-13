var assert = require("assert");
var Lib = require("./../ramda");


describe("contains", function() {
    var contains = Lib.contains;
    it("returns true if an element is in a list", function() {
        assert.equal(contains(7, [1,2,3,9,8,7,100,200,300]), true);
    });

    it("returns false if an element is not in a list", function() {
        assert.equal(contains(99, [1,2,3,9,8,7,100,200,300]), false);
    });

    it("returns false for the empty list", function() {
        assert.equal(contains(1, []), false);
    });
});

describe('uniq', function() {
    var uniq = Lib.uniq;

    it('returns a set from any array (i.e. purges duplicate elements)', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.deepEqual(uniq(arr), [1,2,3]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(uniq([]), []);
    });

});

describe('isSet', function() {
    var isSet = Lib.isSet;

    it('returns true if a list is composed of unique elements', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.equal(isSet(arr), false);
        assert.equal(isSet([3,1,4,2,5,7,9]), true);
    });

    it('returns true for an empty array', function() {
        assert.equal(isSet([]), true);
    });

});

