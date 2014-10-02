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
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var appA = Either.Right(R.multiply(10));
        var appU = Either.Right(R.add(5));
        var appV = Either.Right(10);

        assert.equal(true, aTest.iface(appA));
        assert.equal(true, aTest.compose(appA, appU, appV));
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

describe('some examples using Either', function() {

    it('success is no failure', function() {
        var success = Either.Right(20);
        var failure = Either.Left(20);
        assert.equal(success.equals(failure), false);
    });

    it('success is curried failure', function() {
        var failure = Either('bad');
        assert.ok(typeof failure == 'function');
        assert.ok(failure(20).isRight);
    });

    it('is adding 1 to success', function() {
        var success = Either.Right(20);
        assert.equal(success.map(function(x) {
            return x + 1;
        }).get(), 21);
        assert.equal(success.get(), 20);
    });

    it('currying Either in compose', function() {
        function isBig(x) {
            return x > 10 ? 'This is big' : null;
        }

        var fn = R.compose(
            R.map(R.toUpperCase),
            Either('This is small'),
            isBig
        );

        assert.ok(fn(1).isLeft);
        assert.ok(fn(11).isRight);
        assert.equal(fn(11).get(), 'THIS IS BIG');
        assert.equal(fn(1).merge(), 'This is small');
        assert.equal(fn(1).get(), 'This is small');
    });


    it('chaining Eithers', function() {
        function div(x, y) {
            return y === 0 ? Either.Left('Division by 0') : Either.Right(x/y);
        }

        var result = div(10, 2).chain(function(valueA) {
            return R.map(function(valueB) {
                return valueA + valueB;
            }, div(4, 2));
        });
        assert.ok(result.isRight);
        assert.equal(result.get(), 7);

        result = div(10, 0);
        assert.ok(result.isLeft);
        assert.equal(result.get(), 'Division by 0');
    });

});
