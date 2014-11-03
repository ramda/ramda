var assert = require('assert');
var R = require('..');

describe('type returns', function() {

    it('"Array" if given an array literal', function() {
        assert.equal(R.type([1, 2, 3]), 'Array');
    });

    it('"Object" if given an object literal', function() {
        assert.equal(R.type({batman: 'na na na na na na na'}), 'Object');
    });

    it('"RegExp" if given a RegExp literal', function() {
        assert.equal(R.type(/[A-z]/), 'RegExp');
    });

    it('"Number" if given a numberic value', function() {
        assert.equal(R.type(4), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.equal(R.type('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"Null" if given a null value', function() {
        assert.equal(R.type(null), 'Null');
    });
});
