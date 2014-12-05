var assert = require('assert');

var R = require('..');


describe('mapObj', function() {
    var square = function(n) {return n * n;};

    it('runs the given function over each of the object properties', function() {
        var obj = {a: 1, b: 2, c: 3};
        assert.deepEqual(R.mapObj(square, obj), {a: 1, b: 4, c: 9});
    });
});
