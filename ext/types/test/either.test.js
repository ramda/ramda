var assert = require('assert');
var types = require('./types');
var R = require('../../..');

var Either = require('../Either');

describe('Either', function() {
    var e = Either('original left', 1);

    it('is a Functor', function() {
        var fTest = types.functor;
        assert.equal(true, fTest.iface(e));
        assert.equal(true, fTest.id(e));
        assert.equal(true, fTest.compose(e, R.multiply(2), R.add(3)));
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var appA = Either('apply test fn a', R.multiply(10));
        var appU = Either('apply test fn u', R.add(5));
        var appV = Either('apply test value v', 10);

        assert.equal(true, aTest.iface(appA));
        assert.equal(true, aTest.compose(appA, appU, appV));
    });

    it('is an Applicative', function() {
        var aTest = types.applicative;
        var app1 = Either('app1', 101);
        var app2 = Either('app2', -123);
        var appF = Either('appF', R.multiply(3));

        assert.equal(true, aTest.iface(app1));
        assert.equal(true, aTest.id(app1, app2));
        assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
        assert.equal(true, aTest.interchange(app1, appF, 17));
    });

    it('is a Chain', function() {
        var cTest = types.chain;
        var f1 = function(x) {return Either('f1', (3 * x));};
        var f2 = function(x) {return Either('f2', (5 + x));};

        assert.equal(true, cTest.iface(e));
        assert.equal(true, cTest.associative(e, f1, f2));
    });

    it('is a Monad', function() {
        var mTest = types.monad;
        assert.equal(true, mTest.iface(e));
    });
});
