var assert = require('assert');
var R = require('../../..');
var STRef = require('../STRef');

describe('impure', function() {

    describe('Global Mutable Reference', function() {

        it('global counter', function() {
            var counterRef = STRef.new(0)();

            STRef.modify(counterRef, function(x) { return x + 1;})();
            assert.equal(STRef.read(counterRef)(), 1);

            STRef.write(counterRef, 3)();
            assert.equal(STRef.read(counterRef)(), 3);
        });

        it('global state object', function() {
            var stateRef = STRef.new({})();

            STRef.modify(stateRef, function(o) {
                return {name: 'Joe'};
            })();
            assert.deepEqual(STRef.read(stateRef)(), {name: 'Joe'});

            STRef.modify(stateRef, function(o) {
                return {name: o.name + ' Doe'};
            })();
            assert.deepEqual(STRef.read(stateRef)(), {name: 'Joe Doe'});

            STRef.write(stateRef, {address: 'Foo'})();
            assert.deepEqual(STRef.read(stateRef)(), {address: 'Foo'});
        });

        it('rewriting global variable', function() {
            var pokes = STRef.new(0)();

            R.range(1, 1000).forEach(function(i) {
                STRef.write(pokes, i)();
            });

            assert.deepEqual(STRef.read(pokes)(), 999);
        });
    });
});
