var assert = require('assert');

var R = require('..');


describe('pluck', function() {
    var people = [
        {name: 'Fred', age: 23},
        {name: 'Wilma', age: 21} ,
        {name: 'Pebbles', age: 2}
    ];

    it('returns a function that maps the appropriate property over an array', function() {
        var nm = R.pluck('name');
        assert.strictEqual(typeof nm, 'function');
        assert.deepEqual(nm(people), ['Fred', 'Wilma', 'Pebbles']);
    });
});
