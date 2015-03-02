var assert = require('assert');

var R = require('..');


describe('where', function() {
    it('takes a spec and a test object and returns true if the test object satisfies the spec', function() {

        var spec = {x: 1, y: 2};
        var test1 = {x: 0, y: 200};
        var test2 = {x: 0, y: 10};
        var test3 = {x: 1, y: 101};
        var test4 = {x: 1, y: 2};
        assert.strictEqual(R.where(spec, test1), false);
        assert.strictEqual(R.where(spec, test2), false);
        assert.strictEqual(R.where(spec, test3), false);
        assert.strictEqual(R.where(spec, test4), true);
    });

    it('calls any functions in the spec against the test object value for that property', function() {
        var spec = {
            a: function(a, obj) {
                return a < obj.b + obj.c;
            },
            b: function(b, obj) {
                return b < obj.a + obj.c;
            },
            c: function(c, obj) {
                return c < obj.a + obj.b;
            }
        };
        var test1 = {a: 3, b: 4, c: 5};
        var test2 = {a: 6, b: 8, c: 9};
        var test3 = {a: 2, b: 8, c: 12};
        var test4 = {a: 3, b: 11, c: 5};

        assert.strictEqual(R.where(spec, test1), true);
        assert.strictEqual(R.where(spec, test2), true);
        assert.strictEqual(R.where(spec, test3), false);
        assert.strictEqual(R.where(spec, test4), false);
    });

    it('does not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', function() {
        var spec = {x: 100};
        var test1 = {x: 20, y: 100, z: 100};
        var test2 = {w: 1, x: 100, y: 100, z: 100};

        assert.strictEqual(R.where(spec, test1), false);
        assert.strictEqual(R.where(spec, test2), true);
    });

    it('is false if the test object is null-ish', function() {
        var spec = {x: 200};
        var testN = null;
        var testU;
        var testF = false;
        assert.strictEqual(R.where(spec, testN), false);
        assert.strictEqual(R.where(spec, testU), false);
        assert.strictEqual(R.where(spec, testF), false);
    });

    it('matches specs that have undefined properties', function() {
        var spec = {x: undefined};
        var test1 = {};
        var test2 = {x: null};
        var test3 = {x: undefined};
        var test4 = {x: 1};
        assert.strictEqual(R.where(spec, test1), true);
        assert.strictEqual(R.where(spec, test2), false);
        assert.strictEqual(R.where(spec, test3), true);
        assert.strictEqual(R.where(spec, test4), false);
    });

    it('is automatically curried', function() {
        var predicate = R.where({x: 1, y: 2});
        assert.strictEqual(predicate({x: 1, y: 2, z: 3}), true);
        assert.strictEqual(predicate({x: 3, y: 2, z: 1}), false);
    });

    it('is true for an empty spec', function() {
        assert.strictEqual(R.where({}, {a: 1}), true);
        assert.strictEqual(R.where(null, {a: 1}), true);
    });

    it('reports true when the object equals the spec', function() {
        assert.strictEqual(R.where(R, R), true);
    });

    function Parent() {
        this.y = 6;
    }
    Parent.prototype.a = undefined;
    Parent.prototype.x = 5;
    var parent = new Parent();

    it('matches inherited functions', function() {
        var spec = {
            toString: R.T
        };
        assert.strictEqual(R.where(spec, {}), true);
        assert.strictEqual(R.where(spec, {a: 1}), true);
        assert.strictEqual(R.where(spec, {toString: 1}), true);
        assert.strictEqual(R.where({a: R.T}, {x: 1}), false);
    });

    it('matches inherited props', function() {
        assert.strictEqual(R.where({y: 6}, parent), true);
        assert.strictEqual(R.where({x: 5}, parent), true);
        assert.strictEqual(R.where({x: 5, y: 6}, parent), true);
        assert.strictEqual(R.where({x: 4, y: 6}, parent), false);
    });

    it('doesnt match inherited spec', function() {
        assert.strictEqual(R.where(parent, {y: 6}), true);
        assert.strictEqual(R.where(parent, {x: 5}), false);
    });

});
