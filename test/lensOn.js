var assert = require('assert');

var R = require('..');


describe('lensOn', function() {

    var xo = {x: 1};
    var xoLens = R.lensOn(
        function get(o) { return o.x; },
        function set(v) { return {x: v}; },
        xo);

    it('returns a function with `set` and `map` properties', function() {
        assert.strictEqual(typeof xoLens, 'function');
        assert.strictEqual(typeof xoLens.set, 'function');
        assert.strictEqual(typeof xoLens.map, 'function');
    });

    it('can "get" a value', function() {
        assert.strictEqual(xoLens(), 1);
    });

    it('can "set" a value', function() {
        assert.deepEqual(xoLens.set('moocow'), {x: 'moocow'});
    });

    it('maps to a new object (using get/set functions)', function() {
        function plus10(x) { return x + 10; }
        assert.deepEqual(xoLens.map(plus10), {x: 11});
    });

    it('is curried', function() {
        var getX = function(o) { return o.x; };
        var setX = function(val) { return {x: val}; };
        var x2 = function(x) { return x * 2; };
        var partial1 = R.lensOn(getX);
        var partial2 = partial1(setX);
        assert(typeof partial1 === 'function');
        assert(typeof partial2 === 'function');
        assert(typeof partial2({x: 1}) === 'function');
        assert.deepEqual(partial2({x: 'cow'}).set('moo'), {x: 'moo'});
        assert.deepEqual(partial2({x: 100}).map(x2), {x: 200});
    });
});
