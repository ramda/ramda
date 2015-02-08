var assert = require('assert');

var R = require('..');


describe('merge', function() {
    it('takes two objects, merges their own properties and returns a new object', function() {
        var a = {w: 1, x: 2};
        var b = {y: 3, z: 4};
        assert.deepEqual(R.merge(a, b), {w: 1, x: 2, y: 3, z: 4});
    });

    it('overrides properties in the first object with properties in the second object', function() {
        var a = {w: 1, x: 2};
        var b = {w: 100, y: 3, z: 4};
        assert.deepEqual(R.merge(a, b), {w: 100, x: 2, y: 3, z: 4});
    });

    it('is not destructive', function() {
        var a = {w: 1, x: 2};
        var res = R.merge(a, {x: 5});
        assert.notStrictEqual(a, res);
        assert.deepEqual(res, {w: 1, x: 5});
    });

    it('reports only own properties', function() {
        var a = {w: 1, x: 2};
        function Cla() {}
        Cla.prototype.x = 5;
        assert.deepEqual(R.merge(new Cla(), a), {w: 1, x: 2});
        assert.deepEqual(R.merge(a, new Cla()), {w: 1, x: 2});
    });

    it('is curried', function() {
        var curried = R.merge({w: 1, x: 2});
        var b = {y: 3, z: 4};
        assert.deepEqual(curried(b), {w: 1, x: 2, y: 3, z: 4});
    });

    it('is curried', function() {
        var curried = R.merge(R.__, {w: 1, x: 2});
        assert.deepEqual(curried({x: 3, y: 4}), {w: 1, x: 2, y: 4});
    });
});
