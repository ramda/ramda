var R = require('../source/index.js');
var eq = require('./shared/eq.js');


var a = {id: 1, name: 'a'};
var b = {id: 2, name: 'b'};
var c = {id: 3, name: 'c'};
var f = R.intersectionWith(function(r, id) { return r.id === id; });


describe('intersectionWith', function() {

  it('only returns elements from the first list', function() {
    eq(f([a, b, c], []), []);
    eq(f([a, b, c], [1]), [a]);
    eq(f([a, b, c], [1, 2]), [a, b]);
    eq(f([a, b, c], [1, 2, 3]), [a, b, c]);
    eq(f([a, b, c], [1, 2, 3, 4]), [a, b, c]);
  });

  it('does not remove duplicates', function() {
    eq(f([a, a, a], [1, 2, 3]), [a, a, a]);
    eq(f([a, b, c], [1, 1, 1]), [a]);
  });

});
