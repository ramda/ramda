var assert = require('assert');

var R = require('..');


describe('lastIndexOf', function() {
    it("returns a number indicating an object's last position in a list", function() {
        var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
        assert.strictEqual(R.lastIndexOf(30, list), 7);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.strictEqual(R.lastIndexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5, 1];
    it('returns the last index of the first item', function() {
        assert.strictEqual(R.lastIndexOf(1, input), 5);
    });
    it('returns the index of the last item', function() {
        assert.strictEqual(R.lastIndexOf(5, input), 4);
    });

    var list = ['a', 1, 'a'];
    list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds a', function() {
        assert.strictEqual(R.lastIndexOf('a', list), 2);
    });
    it('does not find c', function() {
        assert.strictEqual(R.lastIndexOf('c', list), -1);
    });
    it('Uses strict equality', function() {
        assert.strictEqual(R.lastIndexOf('1', list), -1);
    });
    it('returns -1 for an empty array', function() {
        assert.strictEqual(R.lastIndexOf('x', 2, []), -1);
        assert.strictEqual(R.lastIndexOf('x', -5, []), -1);
    });

    it('is curried', function() {
        var curried = R.lastIndexOf('a');
        assert.strictEqual(curried(list), 2);
    });
});
