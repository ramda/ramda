var assert = require('assert');

var R = require('..');


describe('hasIn', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    it('returns a function that checks the appropriate property', function() {
        var nm = R.hasIn('name');
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), true);
        assert.strictEqual(nm(anon), false);
    });

    it('checks properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.strictEqual(R.hasIn('age', bob), true);
    });

    it('works properly when called with two arguments', function() {
        assert.strictEqual(R.hasIn('name', fred), true);
        assert.strictEqual(R.hasIn('name', anon), false);
    });
});
