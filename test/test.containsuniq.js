var assert = require("assert");
var R = require("./../ramda");


describe("contains", function() {
    var contains = R.contains;
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
    var uniq = R.uniq;

    it('returns a set from any array (i.e. purges duplicate elements)', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.deepEqual(uniq(arr), [1,2,3]);
    });

    it('keeps elements from the left', function() {
      assert.deepEqual(uniq([1, 2, 3, 4, 1]), [1,2,3,4]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(uniq([]), []);
    });
});

describe('uniqWith', function() {
    var uniqWith = R.uniqWith;
    var T = R.alwaysTrue;
    var F = R.alwaysFalse;
    function eqI(x, accX) { return x.i === accX.i; }

    it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
        var objs = [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3},{x: F, i: 4}, {x: F, i: 5},{x: T, i: 6}, {x: F, i: 7}];
        var objs2 = [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3},{x: F, i: 0}, {x: T, i: 1},{x: F, i: 2}, {x: F, i: 3}];
        assert.deepEqual(uniqWith(eqI, objs), objs);
        assert.deepEqual(uniqWith(eqI, objs2), [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3}]);
    });

    it('keeps elements from the left', function() {
      assert.deepEqual(uniqWith(eqI, [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 1}]), [{i: 1}, {i: 2}, {i: 3}, {i: 4}]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(uniqWith(eqI, []), []);
    });
});

describe('isSet', function() {
    var isSet = R.isSet;

    it('returns true if a list is composed of unique elements', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.equal(isSet(arr), false);
        assert.equal(isSet([3,1,4,2,5,7,9]), true);
    });

    it('returns true for an empty array', function() {
        assert.equal(isSet([]), true);
    });

});
