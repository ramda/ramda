var assert = require('assert');

var R = require('..');


describe('project', function() {
    var kids = [
        {name: 'Abby', age: 7, hair: 'blond'},
        {name: 'Fred', age: 12, hair: 'brown'},
        {name: 'Rusty', age: 10, hair: 'brown'},
        {name: 'Alois', age: 15, disposition: 'surly'}
    ];

    it('selects the chosen properties from each element in a list', function() {
        assert.deepEqual(R.project(['name', 'age'], kids), [
            {name: 'Abby', age: 7},
            {name: 'Fred', age: 12},
            {name: 'Rusty', age: 10},
            {name: 'Alois', age: 15}
        ]);
    });

    it('has an undefined property on the output tuple for any input tuple that does not have the property', function() {
        assert.deepEqual(R.project(['name', 'hair'], kids), [
            {name: 'Abby', hair: 'blond'},
            {name: 'Fred', hair: 'brown'},
            {name: 'Rusty', hair: 'brown'},
            {name: 'Alois', hair: undefined}
        ]);
    });

    it('is automatically curried', function() {
        var myFields = R.project(['name', 'age']);
        assert.deepEqual(myFields(kids), [
            {name: 'Abby', age: 7},
            {name: 'Fred', age: 12},
            {name: 'Rusty', age: 10},
            {name: 'Alois', age: 15}
        ]);
    });
});
