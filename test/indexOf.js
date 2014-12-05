var assert = require('assert');

var R = require('..');


describe('indexOf', function() {
    it("returns a number indicating an object's position in a list", function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.indexOf(30, list), 3);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.indexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5];
    it('returns the index of the first item', function() {
        assert.strictEqual(R.indexOf(1, input), 0);
    });
    it('returns the index of the last item', function() {
        assert.strictEqual(R.indexOf(5, input), 4);
    });

    var list = [1, 2, 3];
    list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds 1', function() {
        assert.strictEqual(R.indexOf(1, list), 0);
    });
    it('finds 1 and is result strictly it', function() {
        assert.strictEqual(R.indexOf(1, list), 0);
    });
    it('does not find 4', function() {
        assert.strictEqual(R.indexOf(4, list), -1);
    });
    it('Uses strict equality', function() {
        assert.strictEqual(R.indexOf('1', list), -1);
    });

    it('returns -1 for an empty array', function() {
        assert.strictEqual(R.indexOf('x', []), -1);
    });

    it('is curried', function() {
        var curried = R.indexOf(3);
        assert.strictEqual(curried(list), 2);
    });
});
