var assert = require('assert');

var R = require('..');


describe('forEachIndexed', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list and passes in the index and list as well', function() {
        var sideEffect = {};
        R.forEachIndexed(function(elem, idx) { sideEffect[elem.x] = idx; }, list);
        assert.deepEqual(sideEffect, {1: 0, 100: 1, 300: 2, 234: 3});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(R.forEachIndexed(function(obj) { s += obj.x; }, list), list);
        assert.strictEqual('1100300234', s);
    });

    it('handles empty list', function() {
        assert.deepEqual(R.forEachIndexed(function(x, idx) { return x + idx; }, []), []);
    });

    it('is curried', function() {
        var sum = 0;
        var xe = R.forEachIndexed(function(x, idx) { sum += (x + idx); });
        assert.strictEqual(typeof xe, 'function');
        xe([1, 2, 4]);
        assert.strictEqual(sum, 10);
    });
});
