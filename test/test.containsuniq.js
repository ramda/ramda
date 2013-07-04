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

describe("containsWith", function() {
    var containsWith = Lib.containsWith;
    var fn = function() { return "moo"; };
    var noop = function() {};
    var objs = [
      {x: fn, y: noop, z: 1},
      {x: fn, y: noop, z: 2},
      {x: fn, y: noop, z: 3},
      {x: fn, y: noop, z: 4},
      {x: fn, y: noop, z: 5},
      {x: fn, y: fn, z: 6},
      {x: fn, y: noop, z: 7}
    ];
    function pred(a, b) {
        return a.y() === b.x()
    }
    it("returns true if an element that matches the predicate is in the list", function() {
        assert.equal(containsWith(pred, {x: fn}, objs), true);
        assert.equal(containsWith(function(a, b) { return a.z === b.z; }, {z: 6}, objs), true);
        assert.equal(containsWith(function(a, b) { return a.z === b.z; }, {z: 6}, objs), true);
    });

    it("returns false if an element is not in a list", function() {
        assert.equal(containsWith(pred, {x: function() { return 1; }}, objs), false);
    });

    it("returns false for the empty list", function() {
        assert.equal(containsWith(pred, {x: fn}, []), false);
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

