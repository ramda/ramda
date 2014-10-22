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

describe('propEq', function() {
    var obj1 = {name: 'Abby', age: 7, hair: 'blond'};
    var obj2 = {name: 'Fred', age: 12, hair: 'brown'};
    var obj3 = {name: 'Rusty', age: 10, hair: 'brown'};
    var obj4 = {name: 'Alois', age: 15, disposition: 'surly'};

    it('determines whether a particular property matches a given value for a specific object', function() {
        assert.equal(R.propEq('name', 'Abby', obj1), true);
        assert.equal(R.propEq('hair', 'brown', obj2), true);
        assert.equal(R.propEq('hair', 'blond', obj2), false);
    });

    it('is automatically curried', function() {
        var kids = [obj1, obj2, obj3, obj4];
        var hairMatch = R.propEq('hair');
        assert.equal(typeof hairMatch, 'function');
        var brunette = hairMatch('brown');
        assert.deepEqual(R.filter(brunette, kids), [obj2, obj3]);
        // more likely usage:
        assert.deepEqual(R.filter(R.propEq('hair', 'brown'), kids), [obj2, obj3]);
    });

});

describe('union', function() {
    var M = [1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('combines two lists into the set of all their elements', function() {
        assert.deepEqual(R.union(M, N), [1, 2, 3, 4, 5, 6]);
    });

    it('does not work for non-primitives (use `unionWith`)', function() {
        assert.equal(R.union(Mo, No).length, 8);
    });
});

describe('unionWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.unionWith(eqA, Ro, So), [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}]);
    });
});

describe('intersection', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('combines two lists into the set of common elements', function() {
        assert.deepEqual(R.intersection(M, N), [3, 4]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.intersection(M2, N2), [3, 4]);
    });

    it('does not work for non-primitives (use `intersectionWith`)', function() {
        assert.equal(R.intersection(Mo, No).length, 0);
    });
});

describe('intersectionWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.intersectionWith(eqA, Ro, So), [{a: 3}, {a: 4}]);
    });
});

describe('difference', function() {
    var M = [1, 2, 3, 4];
    var M2 = [1, 2, 3, 4, 1, 2, 3, 4];
    var N = [3, 4, 5, 6];
    var N2 = [3, 3, 4, 4, 5, 5, 6, 6];
    var Z = [3, 4, 5, 6, 10];
    var Z2 = [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8];
    var Mo = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var No = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    it('finds the set of all elements in the first list not contained in the second', function() {
        assert.deepEqual(R.difference(M, N), [1, 2]);
    });

    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.difference(M2, N2), [1, 2]);
    });

    it('does not work for non-primitives (use `differenceWith`)', function() {
        assert.equal(R.difference(Mo, No).length, 4);
    });

    it('works for arrays of different lengths', function() {
        assert.deepEqual(R.difference(Z, Z2), [10]);
        assert.deepEqual(R.difference(Z2, Z), [1, 2, 7, 8]);
    });

    it('returns an empty array if there are no different elements', function() {
        assert.deepEqual(R.difference(M2, M), []);
        assert.deepEqual(R.difference(M, M2), []);
        assert.deepEqual(R.difference([], M2), []);
    });

    it('is curried', function() {
        assert(typeof R.difference([1, 2, 3]) === 'function');
        assert.deepEqual(R.difference([1, 2, 3])([1, 3]), [2]);
    });
});

describe('differenceWith', function() {
    var Ro = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var Ro2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}, {a: 2}, {a: 3}, {a: 4}];
    var So = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var So2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 3}, {a: 4}, {a: 5}, {a: 6}];
    var eqA = function(r, s) { return r.a === s.a; };
    it('combines two lists into the set of all their elements based on the passed-in equality predicate', function() {
        assert.deepEqual(R.differenceWith(eqA, Ro, So), [{a: 1}, {a: 2}]);
    });
    it('does not allow duplicates in the output even if the input lists had duplicates', function() {
        assert.deepEqual(R.differenceWith(eqA, Ro2, So2), [{a: 1}, {a: 2}]);
    });
});

(function() {
    var albums = [
        {title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'},
        {title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'},
        {title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'},
        {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'},
        {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'},
        {title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'},
        {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'},
        {title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'},
        {title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'},
        {title: 'Evita', artist: 'Various', genre: 'Broadway'},
        {title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'},
        {title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}
    ];
    var derivedGenre = (function() {
        var remap = {
            Baroque: 'Classical',
            Modern: 'Classical',
            Romantic: 'Classical',
            Metal: 'Rock'  /*, etc */
        };
        return function(album) {
            var genre = R.prop('genre', album);
            return remap[genre] || genre;
        };
    }());

    describe('sortBy', function() {
        it('sorts by a simple property of the objects', function() {
            var sortedAlbums = R.sortBy(R.prop('title'), albums);
            assert.equal(sortedAlbums.length, albums.length);
            assert.equal(sortedAlbums[0].title, 'A Farewell to Kings');
            assert.equal(sortedAlbums[11].title, 'Timeout');
        });

        it('is automatically curried', function() {
            var sorter = R.sortBy(R.prop('title'));
            var sortedAlbums = sorter(albums);
            assert.equal(sortedAlbums.length, albums.length);
            assert.equal(sortedAlbums[0].title, 'A Farewell to Kings');
            assert.equal(sortedAlbums[11].title, 'Timeout');
        });
    });

    describe('countBy', function() {
        it('counts by a simple property of the objects', function() {
            assert.deepEqual(R.countBy(R.prop('genre'), albums), {
                Baroque: 2, Rock: 2, Jazz: 2, Romantic: 1, Metal: 1, Modern: 1, Broadway: 1, Folk: 1, Classical: 1
            });
        });

        it('counts by a more complex function on the objects', function() {
            assert.deepEqual(R.countBy(derivedGenre, albums), {
                Classical: 5, Rock: 3, Jazz: 2, Broadway: 1, Folk: 1
            });
        });

        it('is automatically curried', function() {
            var counter = R.countBy(R.prop('genre'));
            assert.deepEqual(counter(albums), {
                Baroque: 2, Rock: 2, Jazz: 2, Romantic: 1, Metal: 1, Modern: 1, Broadway: 1, Folk: 1, Classical: 1
            });
        });
    });

    describe('groupBy', function() {
        it('groups by a simple property of the objects', function() {
            assert.deepEqual(R.groupBy(R.prop('genre'), albums), {
                Baroque: [{title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'}, {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'}],
                Rock: [{title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'}, {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'}],
                Jazz: [{title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'}, {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'}],
                Romantic: [{title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'}],
                Metal: [{title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'}],
                Modern: [{title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'}],
                Broadway: [{title: 'Evita', artist: 'Various', genre: 'Broadway'}],
                Folk: [{title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'}],
                Classical: [{title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}]
            });
        });

        it('groups by a more complex function on the objects', function() {
            assert.deepEqual(R.groupBy(derivedGenre, albums), {
                Classical: [
                    {title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'},
                    {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'},
                    {title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'},
                    {title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'},
                    {title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}
                ],
                Rock: [
                    {title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'},
                    {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'},
                    {title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'}
                ],
                Jazz: [{title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'}, {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'}],
                Broadway: [{title: 'Evita', artist: 'Various', genre: 'Broadway'}],
                Folk: [{title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'}]
            });
        });

        it('is automatically curried', function() {
            var grouper = R.groupBy(R.prop('genre'));
            assert.deepEqual(grouper(albums), {
                Baroque: [{title: 'Art of the Fugue', artist: 'Glenn Gould', genre: 'Baroque'}, {title: 'Goldberg Variations', artist: 'Daniel Barenboim', genre: 'Baroque'}],
                Rock: [{title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock'}, {title: 'Fly By Night', artist: 'Rush', genre: 'Rock'}],
                Jazz: [{title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz'}, {title: 'Romance with the Unseen', artist: 'Don Byron', genre: 'Jazz'}],
                Romantic: [{title: 'New World Symphony', artist: 'Leonard Bernstein', genre: 'Romantic'}],
                Metal: [{title: 'Somewhere In Time', artist: 'Iron Maiden', genre: 'Metal'}],
                Modern: [{title: 'In Times of Desparation', artist: 'Danny Holt', genre: 'Modern'}],
                Broadway: [{title: 'Evita', artist: 'Various', genre: 'Broadway'}],
                Folk: [{title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk'}],
                Classical: [{title: 'The Magic Flute', artist: 'John Eliot Gardiner', genre: 'Classical'}]
            });
        });

    });
}());
