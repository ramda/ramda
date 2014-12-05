var assert = require('assert');

var R = require('..');


describe('map', function() {
    var times2 = function(x) {return x * 2;};
    var add1 = function(x) {return x + 1;};

    it('maps simple functions over arrays', function() {
        assert.deepEqual(R.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('is automatically curried', function() {
        var inc = R.map(add1);
        assert.deepEqual(inc([1, 2, 3]), [2, 3, 4]);
    });

    it('correctly reports the arity of curried versions', function() {
        var inc = R.map(add1);
        assert.strictEqual(inc.length, 1);
    });

});
