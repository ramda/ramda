var assert = require('assert');

var R = require('..');


describe('pick', function() {
    var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

    it('copies the named properties of an object to the new object', function() {
        assert.deepEqual(R.pick(['a', 'c', 'f'], obj), {a: 1, c: 3, f: 6});
    });

    it('ignores properties not included', function() {
        assert.deepEqual(R.pick(['a', 'c', 'g'], obj), {a: 1, c: 3});
    });

    it('retrieves prototype properties', function() {
        var F = function(param) {this.x = param;};
        F.prototype.y = 40; F.prototype.z = 50;
        var obj = new F(30);
        obj.v = 10; obj.w = 20;
        assert.deepEqual(R.pick(['w', 'x', 'y'], obj), {w: 20, x: 30, y: 40});
    });

    it('is automatically curried', function() {
        var copyAB = R.pick(['a', 'b']);
        assert.deepEqual(copyAB(obj), {a: 1, b: 2});
    });
});
