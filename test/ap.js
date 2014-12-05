var assert = require('assert');

var R = require('..');


describe('ap', function() {
    function mult2(x) { return x * 2; }
    function plus3(x) { return x + 3; }

    it('applies a list of functions to a list of values', function() {
        assert.deepEqual(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });

    it('dispatches to the passed object\'s ap method when values is a non-Array object', function() {
        var obj = {ap: function(n) { return 'called ap with ' + n; }};
        assert.deepEqual(R.ap(obj, 10), obj.ap(10));
    });

    it('is curried', function() {
        var val = R.ap([mult2, plus3]);
        assert.strictEqual(typeof val, 'function');
        assert.deepEqual(val([1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    });
});
