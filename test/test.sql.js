var assert = require("assert");
var Lib = require("./../ramda");

describe('project', function() {
    var project = Lib.project;
    var kids = [
        {name: 'Abby', age: 7, hair: 'blond'},
        {name: 'Fred', age: 12, hair: 'brown'}
    ];

    it('should select the chosen properties from each element in a list', function() {
        assert.deepEqual(project(['name', 'age'], kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });

    // TODO?
    it.skip('should be aliased by `select`', function() {
        assert.deepEqual(Lib.select(['name', 'age'], kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
        assert.strictEqual(Lib.select, project);
    });


    it('should be automatically curried', function() {
        var myFields = project(['name', 'age']);
        assert.deepEqual(myFields(kids), [{name: 'Abby', age: 7}, {name: 'Fred', age: 12}]);
    });
});

