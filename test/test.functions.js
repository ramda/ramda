var assert = require('assert');
var R = require('..');

describe('functions', function() {

    function F() {
        this.sort = function() {};
        this.map = function() {};
        this.obj = {};
        this.num = 4;
    }

    F.prototype.x = function() {};
    F.prototype.y = function() {};
    F.prototype.z = {};

    var f = new F();

    it('returns list of functions without prototype functions', function() {
        assert.deepEqual(R.functions(f).sort(), ['map', 'sort']);
        assert.equal(R.functions(f).length, 2);
        assert.deepEqual(R.functions({add: R.add, foldl: R.foldl}).sort(), ['add', 'foldl']);
    });

    it('returns an empty array if there are no functions on the object or its prototype chain', function() {
        function G() {}
        assert.deepEqual(R.functions(new G()), []);
    });
});
