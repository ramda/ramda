var assert = require('assert');
var R = require('..');

describe('indexOf', function() {
    it("returns a number indicating an object's position in a list", function() {
        var list = [0, 10, 20, 30];
        assert.equal(R.indexOf(30, list), 3);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.equal(R.indexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5];
    it('returns the index of the first item', function() {
        assert.equal(R.indexOf(1, input), 0);
    });
    it('returns the index of the last item', function() {
        assert.equal(R.indexOf(5, input), 4);
    });

    var list = [1, 2, 3];
    list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds 1', function() {
        assert.equal(R.indexOf(1, list), 0);
    });
    it('finds 1 and is result strictly it', function() {
        assert.equal(R.indexOf(1, list), 0);
    });
    it('does not find 4', function() {
        assert.equal(R.indexOf(4, list), -1);
    });
    it('Uses strict equality', function() {
        assert.equal(R.indexOf('1', list), -1);
    });

    it('returns -1 for an empty array', function() {
        assert.equal(R.indexOf('x', []), -1);
    });

    it('is curried', function() {
        var curried = R.indexOf(3);
        assert.equal(curried(list), 2);
    });
});

describe('indexOf.from', function() {
    var list = [1, 2, 3];
    list[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.
    it('from index 1', function() {
        assert.equal(R.indexOf.from(2, 1, list), 1);
    });
    it('from index 2', function() {
        assert.equal(R.indexOf.from(2, 2, list), -1);
    });
    it('from index 3', function() {
        assert.equal(R.indexOf.from(2, 3, list), -1);
    });
    it('from index 4', function() {
        assert.equal(R.indexOf.from(2, 4, list), -1);
    });
    it('from index -1', function() {
        assert.equal(R.indexOf.from(3, -1, list), 2);
    });
    it('from index -2', function() {
        assert.equal(R.indexOf.from(3, -2, list), 2);
    });
    it('from index -3', function() {
        assert.equal(R.indexOf.from(3, -3, list), 2);
    });
    it('from index -4', function() {
        assert.equal(R.indexOf.from(3, -4, list), 2);
    });
    it('returns -1 for an empty array', function() {
        assert.equal(R.indexOf.from('x', 3, []), -1);
        assert.equal(R.indexOf.from('x', -3, []), -1);
    });

    it('is curried', function() {
        var curried = R.indexOf.from(3);
        assert.equal(curried(0)(list), 2);
        assert.equal(curried(0, list), 2);
    });
});

describe('lastIndexOf', function() {
    it("returns a number indicating an object's last position in a list", function() {
        var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
        assert.equal(R.lastIndexOf(30, list), 7);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.equal(R.lastIndexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5, 1];
    it('returns the last index of the first item', function() {
        assert.equal(R.lastIndexOf(1, input), 5);
    });
    it('returns the index of the last item', function() {
        assert.equal(R.lastIndexOf(5, input), 4);
    });

    var list = ['a', 1, 'a'];
    list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds a', function() {
        assert.equal(R.lastIndexOf('a', list), 2);
    });
    it('does not find c', function() {
        assert.equal(R.lastIndexOf('c', list), -1);
    });
    it('Uses strict equality', function() {
        assert.equal(R.lastIndexOf('1', list), -1);
    });
    it('from index 1', function() {
        assert.equal(R.lastIndexOf.from('a', 1, list), 0);
    });
    it('from index 2', function() {
        assert.equal(R.lastIndexOf.from('a', 2, list), 2);
    });
    it('from index 3', function() {
        assert.equal(R.lastIndexOf.from('a', 3, list), 2);
    });
    it('from index 4', function() {
        assert.equal(R.lastIndexOf.from('a', 4, list), 2);
    });
    it('from index 0', function() {
        assert.equal(R.lastIndexOf.from('a', 0, list), 0);
    });
    it('from index -1', function() {
        assert.equal(R.lastIndexOf.from('a', -1, list), 2);
    });
    it('from index -2', function() {
        assert.equal(R.lastIndexOf.from('a', -2, list), 0);
    });
    it('from index -3', function() {
        assert.equal(R.lastIndexOf.from('a', -3, list), 0);
    });
    it('from index -4', function() {
        assert.equal(R.lastIndexOf.from('a', -4, list), -1);
    });
    it('returns -1 for an empty array', function() {
        assert.equal(R.lastIndexOf('x', 2, []), -1);
        assert.equal(R.lastIndexOf('x', -5, []), -1);
    });

    it('is curried', function() {
        var curried = R.lastIndexOf('a');
        assert.equal(curried(list), 2);
    });
});

describe('lastIndexOf.from', function() {
    var list = ['a', 1, 'a'];
    list[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('from index 1', function() {
        assert.equal(R.lastIndexOf.from('a', 1, list), 0);
    });
    it('from index 2', function() {
        assert.equal(R.lastIndexOf.from('a', 2, list), 2);
    });
    it('from index 3', function() {
        assert.equal(R.lastIndexOf.from('a', 3, list), 2);
    });
    it('from index 4', function() {
        assert.equal(R.lastIndexOf.from('a', 4, list), 2);
    });
    it('from index 0', function() {
        assert.equal(R.lastIndexOf.from('a', 0, list), 0);
    });
    it('from index -1', function() {
        assert.equal(R.lastIndexOf.from('a', -1, list), 2);
    });
    it('from index -2', function() {
        assert.equal(R.lastIndexOf.from('a', -2, list), 0);
    });
    it('from index -3', function() {
        assert.equal(R.lastIndexOf.from('a', -3, list), 0);
    });
    it('from index -4', function() {
        assert.equal(R.lastIndexOf.from('a', -4, list), -1);
    });
    it('returns -1 for an empty array', function() {
        assert.equal(R.lastIndexOf.from('x', 2, []), -1);
        assert.equal(R.lastIndexOf.from('x', -5, []), -1);
    });
    it('is curried', function() {
        var curried = R.lastIndexOf.from('a');
        assert.equal(curried(3)(list), 2);
        assert.equal(curried(3, list), 2);
    });
});
