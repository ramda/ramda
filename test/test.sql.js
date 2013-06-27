var assert = require("assert");
var Lib = require("./../ramda");

describe('select', function() {
    var select = Lib.select;
    var kids = [
        {name: 'Abby', age: 7, hair: 'blond'},
        {name: 'Fred', age: 12, hair: 'brown'}
    ];

    it('should add together two numbers', function() {
        assert.deepEqual(select(['name', 'age'], kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });

    it('should be automatically curried', function() {
        var myFields = select(['name', 'age']);
        assert.deepEqual(myFields(kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });
});

