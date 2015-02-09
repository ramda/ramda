var assert = require('assert');

var Q = require('q');

var R = require('..');


describe('composeP', function() {
    function a(x) {return x + 'A';}
    function b(x) {return x + 'B';}

    it('handles promises', function() {
        var timesTwo = function(a) {return a * 2;};
        var multAsync = function(a, b) {return Q.when(a * b);};
        return R.composeP(timesTwo, multAsync)(2, 3)
            .then(function(result) {
                assert.strictEqual(result, 12);
            });
    });

    it('does not get tripped up by fake thenables', function() {
        var timesTwo = function(a) {return a.then * 2;};
        var multAsync = function(a, b) {return {then: a * b};};
        assert.strictEqual(R.composeP(timesTwo, multAsync)(2, 3), 12);
    });

    it('returns a function with arity == rightmost argument', function() {
        function a2(x, y) { void y; return 'A2'; }
        function a3(x, y) { void y; return Q.when('A2'); }
        function a4(x, y) { void y; return 'A2'; }

        var f1 = R.compose(b, a);
        assert.strictEqual(f1.length, a.length);
        var f2 = R.compose(b, a2);
        assert.strictEqual(f2.length, a2.length);
        var f3 = R.compose(b, a3);
        assert.strictEqual(f3.length, a3.length);
        var f4 = R.compose(b, a4);
        assert.strictEqual(f4.length, a4.length);
    });
});
