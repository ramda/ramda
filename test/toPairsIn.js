var assert = require('assert');

var R = require('..');


describe('toPairsIn', function() {
    it('converts an object into an array of two-element [key, value] arrays', function() {
        assert.deepEqual(R.toPairsIn({a: 1, b: 2, c: 3}), [['a', 1], ['b', 2], ['c', 3]]);
    });
    it("iterates properties on the object's prototype chain", function() {
        function sortPairs(a, b) {
            return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        }
        var F = function() {
            this.x = 1;
            this.y = 2;
        };
        F.prototype.protoProp = 'you can see me';
        var f = new F();
        assert.deepEqual(R.toPairsIn(f).sort(sortPairs), [['protoProp', 'you can see me'], ['x', 1], ['y', 2]]);
    });
});
