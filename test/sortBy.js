var assert = require('assert');

var R = require('..');


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


describe('sortBy', function() {
    it('sorts by a simple property of the objects', function() {
        var sortedAlbums = R.sortBy(R.prop('title'), albums);
        assert.strictEqual(sortedAlbums.length, albums.length);
        assert.strictEqual(sortedAlbums[0].title, 'A Farewell to Kings');
        assert.strictEqual(sortedAlbums[11].title, 'Timeout');
    });

    it('is automatically curried', function() {
        var sorter = R.sortBy(R.prop('title'));
        var sortedAlbums = sorter(albums);
        assert.strictEqual(sortedAlbums.length, albums.length);
        assert.strictEqual(sortedAlbums[0].title, 'A Farewell to Kings');
        assert.strictEqual(sortedAlbums[11].title, 'Timeout');
    });

    it('preserves object identity', function() {
        var a = {value: 'a'};
        var b = {value: 'b'};
        var result = R.sortBy(R.prop('value'), [b, a]);
        assert.strictEqual(result[0], a);
        assert.strictEqual(result[1], b);
    });

    it('sorts array-like object', function() {
        var args = (function() { return arguments; }('c', 'a', 'b'));
        var result = R.sortBy(R.identity, args);
        assert.strictEqual(result[0], 'a');
        assert.strictEqual(result[1], 'b');
        assert.strictEqual(result[2], 'c');
    });
});
