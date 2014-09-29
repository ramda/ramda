var assert = require('assert');
var R = require('../../..');
var STRef = require('../STRef');

describe('impure', function() {

    describe('Global Mutable Reference', function() {

        it('global state object', function() {
            var stateRef = STRef({});

            stateRef.modify(function() {
                return {name: 'Joe'};
            });
            assert.deepEqual(stateRef.read(), {name: 'Joe'});

            stateRef.modify(function(o) {
                return {name: o.name + ' Doe'};
            });
            assert.deepEqual(stateRef.read(), {name: 'Joe Doe'});

            stateRef.write({address: 'Foo'});
            assert.deepEqual(stateRef.read(), {address: 'Foo'});
        });

        it('partial update', function() {
            var bigObject = STRef({person:{name: 'Joe', age: 22}});

            bigObject.write('Doe', 'person.name');
            assert.deepEqual(bigObject.read(), {person:{name: 'Doe', age: 22}});
        });

        it('creates reference to object path', function() {
            var bigObject = STRef({person:{name: 'Joe', age: 22}});

            var link = bigObject.linkTo('person.name');
            STRef.writeLink('Doe', link);

            assert.deepEqual(bigObject.read(), {person:{name: 'Doe', age: 22}});
        });

        xit('state is private', function() {
            var bigObject = STRef({person:{name: 'Joe', age: 22}});

            assert.throws(function() {
                bigObject.person.name = 'fail';
            });

            var clone = bigObject.read();
            assert.deepEqual(clone, {person:{name: 'Joe', age: 22}});

            clone.person.name = 'fail';
            assert.deepEqual(clone, {person:{name: 'fail', age: 22}});
            assert.deepEqual(bigObject.read(), {person:{name: 'Joe', age: 22}});

        });

    });
});
