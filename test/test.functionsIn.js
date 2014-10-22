var assert = require('assert');
var R = require('..');

describe('functionsIn', function() {

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

    it('returns list of functions with prototype functions', function() {
        assert.deepEqual(R.functionsIn(f).sort(), ['map', 'sort', 'x', 'y']);
        assert.equal(R.functionsIn(f).length, 4);
    });

    it('returns an empty array if there are no functions on the object or its prototype chain', function() {
        function G() {}
        assert.deepEqual(R.functionsIn(new G()), []);
    });
});
