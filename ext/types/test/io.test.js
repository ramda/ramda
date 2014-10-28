var assert = require('assert');
var types = require('./types');
var R = require('../../..');

var IO = require('../IO');

describe('IO', function() {
    var logger = (function() {
        var results = [];
        return {
            log: function(str) {results.push(str);},
            clear: function() {results = [];},
            report: function() {return results.join(' ~ ');}
        };
    }());
    var f1 = function() { logger.log('IO 1'); return '1 '; };
    var f2 = function(x) { logger.log('IO 2'); return x + '2 '; };
    var f3 = function(x) { logger.log('IO 3'); return x + '3 '; };
    var i1 = IO(f1);
    var i2 = IO(f2);

    beforeEach(function() {
        logger.clear();
    });

    it('is a Functor', function() {
        var fTest = types.functor;
        assert.equal(true, fTest.iface(i1));
        assert.equal(true, fTest.id(i1));
        assert.equal(logger.report(), 'IO 1 ~ IO 1');
        logger.clear();
        assert.equal(true, fTest.compose(i1, f2, f3));
        assert.equal(logger.report(), 'IO 1 ~ IO 3 ~ IO 2 ~ IO 1 ~ IO 3 ~ IO 2');
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var a = IO(function() { return R.add(1); });
        var b = IO(function() { return R.always(2); });
        var c = IO(R.always(4));

        assert.equal(true, aTest.iface(i1));
        assert.equal(true, aTest.compose(a, b, c));
    });

    it('is an Applicative', function() {
        var aTest = types.applicative;

        assert.equal(true, aTest.iface(i1));
        assert.equal(true, aTest.id(IO, i2));
        assert.equal(logger.report(), 'IO 2 ~ IO 2');
        assert.equal(true, aTest.homomorphic(i1, R.add(3), 46));
        assert.equal(true, aTest.interchange(
            IO(function() { return R.multiply(20); }),
            IO(function() { return R.multiply(0.5); }),
            73
        ));
    });

    it('is a Chain', function() {
        var cTest = types.chain;
        var c = IO(function() {
            return IO(function() {
                return IO(function() {
                    return 3;
                });
            });
        });
        assert.equal(true, cTest.iface(i1));
        assert.equal(true, cTest.associative(c, R.I, R.I));
    });

    it('is a Monad', function() {
        var mTest = types.monad;
        assert.equal(true, mTest.iface(i1));
    });

});
