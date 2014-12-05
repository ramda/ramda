var assert = require('assert');

var R = require('..');


describe('arity', function() {

    it('throws if n is greater than ten', function() {
        assert.throws(function() {
            R.arity(11, function() {});
        }, function(err) {
            return (err instanceof Error &&
                    err.message === 'First argument to arity must be a non-negative integer no greater than ten');
        });
    });

});
