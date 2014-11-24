var assert = require('assert');
var R = require('..');

describe('type returns', function() {

    it('"Array" if given an array literal', function() {
        assert.equal(R.type([1, 2, 3]), 'Array');
    });

    it('"Arguments" if given an arguments object', function() {
        var args = (function() { return arguments; }());
        assert.equal(R.type(args), 'Arguments');
    });

    it('"Object" if given an object literal', function() {
        assert.equal(R.type({batman: 'na na na na na na na'}), 'Object');
    });

    it('"RegExp" if given a RegExp literal', function() {
        assert.equal(R.type(/[A-z]/), 'RegExp');
    });

    it('"Number" if given a numeric value', function() {
        assert.equal(R.type(4), 'Number');
    });

    it('"Number" if given the NaN value', function() {
        assert.equal(R.type(NaN), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.equal(R.type('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"String" if given a String object', function() {
        /*jshint -W053 */
        assert.equal(R.type(new String('I am a String object')), 'String');
    });

    it('"Null" if given the null value', function() {
        assert.equal(R.type(null), 'Null');
    });

    it('"Undefined" if given the undefined value', function() {
        assert.equal(R.type(undefined), 'Undefined');
    });
});
