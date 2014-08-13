var assert = require("assert");
var R = require("..");


describe("contains", function() {
    it("returns true if an element is in a list", function() {
        assert.equal(R.contains(7, [1,2,3,9,8,7,100,200,300]), true);
    });

    it("returns false if an element is not in a list", function() {
        assert.equal(R.contains(99, [1,2,3,9,8,7,100,200,300]), false);
    });

    it("returns false for the empty list", function() {
        assert.equal(R.contains(1, []), false);
    });
});

describe('uniq', function() {
    it('returns a set from any array (i.e. purges duplicate elements)', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.deepEqual(R.uniq(arr), [1,2,3]);
    });

    it('keeps elements from the left', function() {
      assert.deepEqual(R.uniq([1, 2, 3, 4, 1]), [1,2,3,4]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniq([]), []);
    });
});

describe('uniqWith', function() {
    var T = R.alwaysTrue;
    var F = R.alwaysFalse;
    function eqI(x, accX) { return x.i === accX.i; }

    it('returns a set from any array (i.e. purges duplicate elements) based on predicate', function() {
        var objs = [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3},{x: F, i: 4}, {x: F, i: 5},{x: T, i: 6}, {x: F, i: 7}];
        var objs2 = [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3},{x: F, i: 0}, {x: T, i: 1},{x: F, i: 2}, {x: F, i: 3}];
        assert.deepEqual(R.uniqWith(eqI, objs), objs);
        assert.deepEqual(R.uniqWith(eqI, objs2), [{x: T, i: 0}, {x: F, i: 1},{x: T, i: 2}, {x: T, i: 3}]);
    });

    it('keeps elements from the left', function() {
      assert.deepEqual(R.uniqWith(eqI, [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 1}]), [{i: 1}, {i: 2}, {i: 3}, {i: 4}]);
    });

    it('returns an empty array for an empty array', function() {
        assert.deepEqual(R.uniqWith(eqI, []), []);
    });
});

describe('isSet', function() {
    it('returns true if a list is composed of unique elements', function() {
        var arr = [1,2,3,1,2,3,1,2,3];
        assert.equal(R.isSet(arr), false);
        assert.equal(R.isSet([3,1,4,2,5,7,9]), true);
    });

    it('returns true for an empty array', function() {
        assert.equal(R.isSet([]), true);
    });

});
