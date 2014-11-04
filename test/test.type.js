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

    it('"Number" if given a numeric value', function() {
        assert.equal(R.type(4), 'Number');
    });

    it('"Number" if given a NaN value', function() {
        assert.equal(R.type(NaN), 'Number');
    });

    it('"String" if given a String literal', function() {
        assert.equal(R.type('Gooooodd Mornning Ramda!!'), 'String');
    });

    it('"String" if given a String object', function() {
        /*jshint -W053 */
        assert.equal(R.type(new String('I am a String object')), 'String');
    });

    it('"Null" if given a null value', function() {
        assert.equal(R.type(null), 'Null');
    });

    it('"Undefined" if given an undefined value', function() {
        assert.equal(R.type(undefined), 'Undefined');
    });

    it('"Foo" if given a custom type Foo', function() {
        function Foo() {}
        assert.equal(R.type(new Foo()), 'Foo');
    });
});
