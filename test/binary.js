var assert = require('assert');

var R = require('..');


describe('binary', function() {
    it('turns multiple-argument function into binary one', function() {
        R.binary(function(x, y, z) {
            assert.strictEqual(arguments.length, 2);
            assert.strictEqual(typeof z, 'undefined');
        })(10, 20, 30);
    });

    it('initial arguments are passed through normally', function() {
        R.binary(function(x, y, z) {
            assert.strictEqual(x, 10);
            assert.strictEqual(y, 20);
            void z;
        })(10, 20, 30);
    });
});
