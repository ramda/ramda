var assert = require('assert');
var types = require('./types');
var R = require('../../..');

var Identity = require('../Identity');

describe('Identity', function() {
    var m = Identity(1);

    it('is a Functor', function() {
        var fTest = types.functor;
        assert.equal(true, fTest.iface(m));
        assert.equal(true, fTest.id(m));
        assert.equal(true, fTest.compose(m, R.multiply(2), R.add(3)));
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var appA = Identity(R.multiply(10));
        var appU = Identity(R.add(7));
        var appV = Identity(10);

        assert.equal(true, aTest.iface(appA));
        assert.equal(true, aTest.compose(appA, appU, appV));
    });

    it('is an Applicative', function() {
        var aTest = types.applicative;
        var app1 = Identity(101);
        var app2 = Identity(-123);
        var appF = Identity(R.multiply(3));

        assert.equal(true, aTest.iface(app1));
        assert.equal(true, aTest.id(app1, app2));
        assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
        assert.equal(true, aTest.interchange(app2, appF, 17));
    });

    it('is a Chain', function() {
        var cTest = types.chain;
        var f1 = function(x) {return Identity(3 * x);};
        var f2 = function(x) {return Identity(5 + x);};
        var fNull = function() {return Identity(null);};
        assert.equal(true, cTest.iface(m));
        assert.equal(true, cTest.associative(m, f1, f2));
        assert.equal(true, cTest.associative(m, fNull, f2));
        assert.equal(true, cTest.associative(m, f1, fNull));
        assert.equal(true, cTest.associative(m, fNull, fNull));
    });

    it('is a Monad', function() {
        var mTest = types.monad;
        assert.equal(true, mTest.iface(m));
    });
});

describe('Identity example', function() {

    it('returns wrapped value', function() {
        var identNumber = Identity(4);
        assert.equal(identNumber.get(), 4);

        var identArray = Identity([1, 2, 3, 4]);
        assert.deepEqual(identArray.get(), [1, 2, 3, 4]);
    });

});
