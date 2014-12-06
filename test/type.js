var assert = require('assert');

var R = require('..');


describe('type', function() {

    it('"Array" if given an array literal', function() {
        assert.strictEqual(R.type([1, 2, 3]), 'Array');
    });

    // it('"Arguments" if given an arguments object', function() {
    //    var args = (function() { return arguments; }());
    //    assert.strictEqual(R.type(args), 'Arguments');
    // });

    it('"Object" if given an object literal', function() {
        assert.strictEqual(R.type({batman: 'na na na na na na na'}), 'Object');
    });

    it('"RegExp" if given a RegExp literal', function() {
        assert.strictEqual(R.type(/[A-z]/), 'RegExp');
    });

    it('"Number" if given a numeric value', function() {
        assert.strictEqual(R.type(4), 'Number');
    });

    it('"Number" if given the NaN value', function() {
        assert.strictEqual(R.type(NaN), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.strictEqual(R.type('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"String" if given a String object', function() {
        /*jshint -W053 */
        assert.strictEqual(R.type(new String('I am a String object')), 'String');
    });

    it('"Null" if given the null value', function() {
        assert.strictEqual(R.type(null), 'Null');
    });

    it('"Undefined" if given the undefined value', function() {
        assert.strictEqual(R.type(undefined), 'Undefined');
    });
});
