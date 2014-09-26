var assert = require('assert');
var types = require('./types');
var R = require('../../..');

var Either = require('../Either');

describe('Either', function() {
    var l = Either.Left('original left'),
        r = Either.Right(1);

    it('is a Functor', function() {
        var fTest = types.functor;
        assert.equal(true, fTest.iface(r));
        assert.equal(true, fTest.id(r));
        assert.equal(true, fTest.compose(r, R.multiply(2), R.add(3)));
        assert.equal(true, fTest.iface(l));
        assert.equal(true, fTest.id(l));
        assert.equal(true, fTest.compose(l, R.multiply(2), R.add(3)));
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var appA = Either.Right(R.multiply(10));
        var appU = Either.Right(R.add(5));
        var appV = Either.Right(10);

        assert.equal(true, aTest.iface(appA));
        assert.equal(true, aTest.compose(appA, appU, appV));

        var appB = Either.Left(R.multiply(10));
        var appX = Either.Left(R.add(5));
        var appY = Either.Left(10);

        assert.equal(true, aTest.iface(appB));
        assert.equal(true, aTest.compose(appB, appX, appY));
    });

    it('is an Applicative', function() {
        var aTest = types.applicative;
        var app1 = Either.Right(101);
        var app2 = Either.Right(-123);
        var appF = Either.Right(R.multiply(3));

        assert.equal(true, aTest.iface(app1));
        assert.equal(true, aTest.id(app1, app2));
        assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
        assert.equal(true, aTest.interchange(app1, appF, 17));

        var appL1 = Either.Left(101);
        var appL2 = Either.Left(-123);
        var appLF = Either.Left(R.multiply(3));

        assert.equal(true, aTest.iface(appL1));
        assert.equal(true, aTest.id(appL1, appL2));
        assert.equal(true, aTest.homomorphic(appL1, R.add(3), 46));
        assert.equal(true, aTest.interchange(appL1, appLF, 17));
    });

    it('is a Chain', function() {
        var cTest = types.chain;
        var f1 = function(x) {return Either.Right(3 * x);};
        var f2 = function(x) {return Either.Right(5 + x);};

        assert.equal(true, cTest.iface(r));
        assert.equal(true, cTest.associative(r, f1, f2));
    });

    it('is a Monad', function() {
        var mTest = types.monad;
        assert.equal(true, mTest.iface(r));
    });
});

xdescribe('some examples using Either', function() {

    it('success is no failure', function() {
        var success = Either.Right(20);
        var failure = Either.Left(20);
        assert.equal(success.equals(failure), false);
    });

    it('success is curried failure', function() {
        var success = Either.Right(20);
        var failure = Either('bad');
        assert.equal(success.equals(failure(20)), true);
    });

    it('is adding 1 to success', function() {
        var success = Either.Right(20);
        assert.equal(success.map(function(x) {
            return x + 1;
        }).right(), 21);
        assert.equal(success.right(), 20);
    });

    it('is ignoring + 1 on failure', function() {
        var failure = Either.Left(20);
        assert.equal(failure.map(function(x) {
            return x + 1;
        }).left(), 20);
    });
});
