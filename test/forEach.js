var assert = require('assert');

var R = require('..');


describe('forEach', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list', function() {
        var sideEffect = {};
        R.forEach(function(elem) { sideEffect[elem.x] = elem.y; }, list);
        assert.deepEqual(sideEffect, {1: 2, 100: 200, 300: 400, 234: 345});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(R.forEach(function(obj) { s += obj.x; }, list), list);
        assert.strictEqual('1100300234', s);
    });

    it('handles empty list', function() {
        assert.deepEqual(R.forEach(function(x) { return x * x; }, []), []);
    });

    it('is curried', function() {
        var xStr = '';
        var xe = R.forEach(function(x) { xStr += (x + ' '); });
        assert.strictEqual(typeof xe, 'function');
        xe([1, 2, 4]);
        assert.strictEqual(xStr, '1 2 4 ');
    });
});
