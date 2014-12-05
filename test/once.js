var assert = require('assert');

var R = require('..');


describe('once', function() {
    it('returns a function that calls the supplied function only the first time called', function() {
        var ctr = 0;
        var fn = R.once(function() {ctr++;});
        fn();
        assert.strictEqual(ctr, 1);
        fn();
        assert.strictEqual(ctr, 1);
        fn();
        assert.strictEqual(ctr, 1);
    });

    it('passes along arguments supplied', function() {
        var fn = R.once(function(a, b) {return a + b;});
        var result = fn(5, 10);
        assert.strictEqual(result, 15);
    });

    it('retains and returns the first value calculated, even if different arguments are passed later', function() {
        var ctr = 0;
        var fn = R.once(function(a, b) {ctr++; return a + b;});
        var result = fn(5, 10);
        assert.strictEqual(result, 15);
        assert.strictEqual(ctr, 1);
        result = fn(20, 30);
        assert.strictEqual(result, 15);
        assert.strictEqual(ctr, 1);
    });
});
