var assert = require('assert');
var Lib = require('./../ramda');

describe('maybe', function() {
    var maybe = Lib.maybe;
    var undef;
    function f(a, b, c) {
        return 1 + a + b + c;
    }

    it('prevents null arguments', function() {
        assert.equal(isNaN(f()), true);
        assert.equal(typeof maybe(f)(), 'undefined');
        assert.equal(maybe(f)(2, 3, 4), 10);
    });

    it('ensures all required arguments are present', function() {
        assert.equal(maybe(f)(), undef);
        assert.equal(maybe(f)(1), undef);
        assert.equal(maybe(f)(1, 2), undef);
        assert.equal(maybe(f)(1, 2, 3), 7);
    });

    it('does not allow intermediate undefined or null arguments', function() {
        var person = {
            first: 'Scott',
            last: 'Sauyet',
            name: function() {return this.first + ' ' + this.last;},
            setName: maybe(function(f, l) {this.first = f; this.last = l;})
        };
        assert.equal(person.name(), 'Scott Sauyet');
        person.setName('Mike', 'Hurley');
        assert.equal(person.name(), 'Mike Hurley');
        person.setName('Scott');
        assert.equal(person.name(), 'Mike Hurley');
        person.setName('Scott', null);
        assert.equal(person.name(), 'Mike Hurley');
        person.setName(undef, 'Sauyet');
        assert.equal(person.name(), 'Mike Hurley');
        person.setName('Scott', 'Sauyet');
        assert.equal(person.name(), 'Scott Sauyet');
    });
});


