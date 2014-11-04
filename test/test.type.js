var assert = require('assert');
var R = require('..');

describe('typeof returns', function() {

    it('"Array" if given an array literal', function() {
        assert.equal(R.typeof([1, 2, 3]), 'Array');
    });

    it('"Object" if given an object literal', function() {
        assert.equal(R.typeof({batman: 'na na na na na na na'}), 'Object');
    });

    it('"RegExp" if given a RegExp literal', function() {
        assert.equal(R.typeof(/[A-z]/), 'RegExp');
    });

    it('"Number" if given a numeric value', function() {
        assert.equal(R.typeof(4), 'Number');
    });

    it('"Number" if given the NaN value', function() {
        assert.equal(R.typeof(NaN), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.equal(R.typeof('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"String" if given a String object', function() {
        /*jshint -W053 */
        assert.equal(R.typeof(new String('I am a String object')), 'String');
    });

    it('"Null" if given the null value', function() {
        assert.equal(R.typeof(null), 'Null');
    });

    it('"Undefined" if given the undefined value', function() {
        assert.equal(R.typeof(undefined), 'Undefined');
    });
});
