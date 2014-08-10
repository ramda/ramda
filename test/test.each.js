var assert = require('assert');
var R = require('./../ramda');
var each = R.each;

describe('each', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list', function() {
        var sideEffect = {};
        each(function(elem) { sideEffect[elem.x] = elem.y; }, list);
        assert.deepEqual(sideEffect, {1: 2, 100: 200, 300: 400, 234: 345});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(each(function(obj) { s += obj.x; }, list), list);
        assert.equal('1100300234', s);
    });
});

describe('each.idx', function() {
    var list = [{x: 1, y: 2}, {x: 100, y: 200}, {x: 300, y: 400}, {x: 234, y: 345}];

    it('performs the passed in function on each element of the list and passes in the index and list as well', function() {
        var sideEffect = {};
        each.idx(function(elem, idx) { sideEffect[elem.x] = idx; }, list);
        assert.deepEqual(sideEffect, {1: 0, 100: 1, 300: 2, 234: 3});
    });

    it('returns the original list', function() {
        var s = '';
        assert.deepEqual(each.idx(function(obj, idx, ls) { s += obj.x; }, list), list);
        assert.equal('1100300234', s);
    });
});
