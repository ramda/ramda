var assert = require('assert');

var R = require('..');


describe('propOr', function() {
    var fred = {name: 'Fred', age: 23};
    var anon = {age: 99};

    var nm = R.propOr('Unknown', 'name');

    it('returns a function that fetches the appropriate property', function() {
        assert.strictEqual(typeof nm, 'function');
        assert.strictEqual(nm(fred), 'Fred');
    });

    it('returns the default value when the property does not exist', function() {
        assert.strictEqual(nm(anon), 'Unknown');
    });

    it('does not return properties from the prototype chain', function() {
        var Person = function() {};
        Person.prototype.age = function() {};

        var bob = new Person();
        assert.strictEqual(R.propOr(100, 'age', bob), 100);
    });
});
