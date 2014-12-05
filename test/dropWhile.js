var assert = require('assert');

var R = require('..');


describe('dropWhile', function() {
    it('skips elements while the function reports `true`', function() {
        assert.deepEqual(R.dropWhile(function(x) {return x < 5;}, [1, 3, 5, 7, 9]), [5, 7, 9]);
    });

    it('returns an empty list for an ampty list', function() {
        assert.deepEqual(R.dropWhile(function() { return false; }, []), []);
        assert.deepEqual(R.dropWhile(function() { return true; }, []), []);
    });

    it('starts at the right arg and acknowledges undefined', function() {
        var sublist = R.dropWhile(function(x) {return x !== void 0;}, [1, 3, void 0, 5, 7]);
        assert.strictEqual(sublist.length, 3);
        assert.strictEqual(sublist[0], void 0);
        assert.strictEqual(sublist[1], 5);
        assert.strictEqual(sublist[2], 7);
    });

    it('is automatically curried', function() {
        var dropLt7 = R.dropWhile(function(x) {return x < 7;});
        assert.deepEqual(dropLt7([1, 3, 5, 7, 9]), [7, 9]);
        assert.deepEqual(dropLt7([2, 4, 6, 8, 10]), [8, 10]);
    });
});
