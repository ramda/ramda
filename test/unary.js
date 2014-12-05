var assert = require('assert');

var R = require('..');


describe('unary', function() {
    it('turns multiple-argument function into unary one', function() {
        R.unary(function(x, y, z) {
            assert.strictEqual(arguments.length, 1);
            assert.strictEqual(typeof y, 'undefined');
            assert.strictEqual(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial argument is passed through normally', function() {
        R.unary(function(x, y, z) {
            assert.strictEqual(x, 10);
            void z;
        })(10, 20, 30);
    });
});
