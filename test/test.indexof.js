var assert = require('assert');
var Lib = require('./../ramda');

describe('indexOf', function() {
    it("returns a number indicating an object's position in a list", function() {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.indexOf(30, list), 3);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.indexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5];
    it('should return the index of the first item', function() {
        assert.equal(Lib.indexOf(1, input), 0);
    });
    it('should return the index of the last item', function() {
        assert.equal(Lib.indexOf(5, input), 4);
    });

    var arr = [1, 2, 3];
    arr[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds 1', function() {
        assert.equal(Lib.indexOf(1, arr), 0);
    });
    it('finds 1 and is result strictly it', function() {
        assert.equal(Lib.indexOf(1, arr), 0);
    });
    it('does not find 4', function() {
        assert.equal(Lib.indexOf(4, arr), -1);
    });
    it('Uses strict equality', function() {
        assert.equal(Lib.indexOf('1', arr), -1);
    });

    it('should be curried', function() {
        var curried = Lib.indexOf(3);
        assert.equal(curried(arr), 2);
    });
});

describe('indexOf.from', function() {
    var arr = [1, 2, 3];
    arr[-2] = 4; // Throw a wrench in the gears by assigning a non-valid array index as object property.
    it('from index 1', function() {
        assert.equal(Lib.indexOf.from(2, 1, arr), 1);
    });
    it('from index 2', function() {
        assert.equal(Lib.indexOf.from(2, 2, arr), -1);
    });
    it('from index 3', function() {
        assert.equal(Lib.indexOf.from(2, 3, arr), -1);
    });
    it('from index 4', function() {
        assert.equal(Lib.indexOf.from(2, 4, arr), -1);
    });
    it('from index -1', function() {
        assert.equal(Lib.indexOf.from(3, -1, arr), 2);
    });
    it('from index -2', function() {
        assert.equal(Lib.indexOf.from(3, -2, arr), 2);
    });
    it('from index -3', function() {
        assert.equal(Lib.indexOf.from(3, -3, arr), 2);
    });
    it('from index -4', function() {
        assert.equal(Lib.indexOf.from(3, -4, arr), 2);
    });

    it('should be curried', function() {
        var curried = Lib.indexOf.from(3);
        assert.equal(curried(0)(arr), 2);
        assert.equal(curried(0, arr), 2);
    });
});

describe('lastIndexOf', function() {
    it("returns a number indicating an object's last position in a list", function() {
        var list = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10];
        assert.equal(Lib.lastIndexOf(30, list), 7);
    });
    it('returns -1 if the object is not in the list', function() {
        var list = [0, 10, 20, 30];
        assert.equal(Lib.lastIndexOf(40, list), -1);
    });

    var input = [1, 2, 3, 4, 5, 1];
    it('should return the last index of the first item', function() {
        assert.equal(Lib.lastIndexOf(1, input), 5);
    });
    it('should return the index of the last item', function() {
        assert.equal(Lib.lastIndexOf(5, input), 4);
    });

    var arr = ['a', 1, 'a'];
    arr[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('finds a', function() {
        assert.equal(Lib.lastIndexOf('a', arr), 2);
    });
    it('does not find c', function() {
        assert.equal(Lib.lastIndexOf('c', arr), -1);
    });
    it('Uses strict equality', function() {
        assert.equal(Lib.lastIndexOf('1', arr), -1);
    });
    it('from index 1', function() {
        assert.equal(Lib.lastIndexOf.from('a', 1, arr), 0);
    });
    it('from index 2', function() {
        assert.equal(Lib.lastIndexOf.from('a', 2, arr), 2);
    });
    it('from index 3', function() {
        assert.equal(Lib.lastIndexOf.from('a', 3, arr), 2);
    });
    it('from index 4', function() {
        assert.equal(Lib.lastIndexOf.from('a', 4, arr), 2);
    });
    it('from index 0', function() {
        assert.equal(Lib.lastIndexOf.from('a', 0, arr), 0);
    });
    it('from index -1', function() {
        assert.equal(Lib.lastIndexOf.from('a', -1, arr), 2);
    });
    it('from index -2', function() {
        assert.equal(Lib.lastIndexOf.from('a', -2, arr), 0);
    });
    it('from index -3', function() {
        assert.equal(Lib.lastIndexOf.from('a', -3, arr), 0);
    });
    it('from index -4', function() {
        assert.equal(Lib.lastIndexOf.from('a', -4, arr), -1);
    });

    it('should be curried', function() {
        var curried = Lib.lastIndexOf('a');
        assert.equal(curried(arr), 2);
    });
});

describe('lastIndexOf.from', function() {
    var arr = ['a', 1, 'a'];
    arr[-2] = 'a'; // Throw a wrench in the gears by assigning a non-valid array index as object property.

    it('from index 1', function() {
        assert.equal(Lib.lastIndexOf.from('a', 1, arr), 0);
    });
    it('from index 2', function() {
        assert.equal(Lib.lastIndexOf.from('a', 2, arr), 2);
    });
    it('from index 3', function() {
        assert.equal(Lib.lastIndexOf.from('a', 3, arr), 2);
    });
    it('from index 4', function() {
        assert.equal(Lib.lastIndexOf.from('a', 4, arr), 2);
    });
    it('from index 0', function() {
        assert.equal(Lib.lastIndexOf.from('a', 0, arr), 0);
    });
    it('from index -1', function() {
        assert.equal(Lib.lastIndexOf.from('a', -1, arr), 2);
    });
    it('from index -2', function() {
        assert.equal(Lib.lastIndexOf.from('a', -2, arr), 0);
    });
    it('from index -3', function() {
        assert.equal(Lib.lastIndexOf.from('a', -3, arr), 0);
    });
    it('from index -4', function() {
        assert.equal(Lib.lastIndexOf.from('a', -4, arr), -1);
    });

    it('should be curried', function() {
        var curried = Lib.lastIndexOf.from('a');
        assert.equal(curried(3)(arr), 2);
        assert.equal(curried(3, arr), 2);
    });
});