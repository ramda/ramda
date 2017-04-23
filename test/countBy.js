var R = require('..');
var eq = require('./shared/eq');


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
    Metal: 'Rock'  /*  etc */
  };
  return function(album) {
    var genre = R.prop('genre', album);
    return remap[genre] || genre;
  };
}());


describe('countBy', function() {
  it('counts by a simple property of the objects', function() {
    eq(R.countBy(R.prop('genre'), albums), {
      Baroque: 2, Rock: 2, Jazz: 2, Romantic: 1, Metal: 1, Modern: 1, Broadway: 1, Folk: 1, Classical: 1
    });
  });

  it('counts by a more complex function on the objects', function() {
    eq(R.countBy(derivedGenre, albums), {
      Classical: 5, Rock: 3, Jazz: 2, Broadway: 1, Folk: 1
    });
  });

  it('ignores inherited properties', function() {
    var result = R.countBy(R.identity, ['abc', 'toString']);
    eq(result.abc, 1);
    eq(result.toString, 1);
  });

  it('can act as a transducer', function() {
    var transducer = R.compose(
      R.countBy(R.prop('genre')),
      R.map(R.adjust(R.toString, 1)));
    eq(R.into({}, transducer, albums), {
      Baroque: '2', Rock: '2', Jazz: '2', Romantic: '1', Metal: '1', Modern: '1', Broadway: '1', Folk: '1', Classical: '1'
    });
  });

});
