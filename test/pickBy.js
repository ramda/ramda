var assert = require('assert');

var R = require('..');


describe('pickBy', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('creates a copy of the object', function() {
        assert.notStrictEqual(R.pickBy(R.always(true), obj), obj);
    });

    it('when returning truthy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.T, obj), obj);
        assert.deepEqual(R.pickBy(R.always({}), obj), obj);
        assert.deepEqual(R.pickBy(R.always(1), obj), obj);
    });

    it('when returning falsy, keeps the key', function() {
        assert.deepEqual(R.pickBy(R.always(false), obj), {});
        assert.deepEqual(R.pickBy(R.always(0), obj), {});
        assert.deepEqual(R.pickBy(R.always(null), obj), {});
    });

    it('is called with (val,key,obj)', function() {
        assert.deepEqual(R.pickBy(function(val, key, _obj) {
            assert.strictEqual(_obj, obj);
            return key === 'd' && val === 4;
        }, obj), {d: 4});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pickBy(function(val) {return val < 45;}, obj), {v: 10, w: 20, x: 30, y: 40});
    });


    it('is automatically curried', function() {
        var copier = R.pickBy(R.T);
        assert.deepEqual(copier(obj), obj);
    });
});
