var assert = require("assert");
var Lib = require("./../ramda");

describe('select', function() {
    var select = Lib.select;
    var kids = [
        {name: 'Abby', age: 7, hair: 'blond'},
        {name: 'Fred', age: 12, hair: 'brown'}
    ];

    it('should select the chosen properties from each element in a list', function() {
        assert.deepEqual(select(['name', 'age'], kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });

    it('should be aliased by `project`', function() {
        assert.deepEqual(Lib.project(['name', 'age'], kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
        assert.strictEqual(Lib.project, select);
    });


    it('should be automatically curried', function() {
        var myFields = select(['name', 'age']);
        assert.deepEqual(myFields(kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });
});

