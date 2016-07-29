var R = require('..');
var eq = require('./shared/eq');


describe('partial', function() {
  var disc = function(a, b, c) { // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c + R.sum(R.slice(3, Infinity, arguments));
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partial(disc, [3]);
    eq(f(7, 4), 1);
    var g = R.partial(disc, [3, 7]);
    eq(g(4), 1);
    var h = R.partial(disc, [3, 7, 4]);
    eq(h(), 1);
  });

  it('accepts @@functional/placeholder', function() {
    var f = R.partial(disc, [R.__, 7]);
    eq(f(3, 4), 1);
    var g = R.partial(f, [R.__, 4]);
    eq(g(3), 1);
    var h = R.partial(g, [R.__]);
    eq(h(3), 1);
    var i = R.partial(disc, [R.__, R.__, 4]);
    eq(i(3, 7), 1);
    var j = R.partial(i, []);
    eq(j(3, 7), 1);
  });

  it('passes along additional arguments', function() {
    var f = R.partial(disc, [3]);
    eq(f(7, 4, 1, 1), 3);
    var g = R.partial(f, [R.__, 4]);
    eq(g(7, 10), 11);
  });

  it('correctly reports the arity of the new function', function() {
    var f = R.partial(disc, [3]);
    eq(f.length, 2);
    var g = R.partial(disc, [3, 7]);
    eq(g.length, 1);
    var h = R.partial(disc, [R.__, 7]);
    eq(h.length, 2);
  });

  it('garbage in', function() {
    var f = R.partial(disc, [3, R.__]);
    eq(f(7, 4), 1);
    var g = R.partial(disc, [R.__, R.__, R.__, R.__, R.__]);
    eq(g(3, 7, 4), 1);
    var h = R.partial(disc, [R.__, R.__, R.__, R.__, 4]);
    eq(h(3, 7), 1);
    var i = R.partial(disc, [3, R.__, R.__, R.__, R.__]);
    eq(i(7, 4), 1);
    var j = R.partial(disc, [3, R.__, R.__, R.__, 4]);
    eq(j(7), 1);
    eq(j(7, 10, 20, 30), -17);
  });

  it('left vs right', function() {
    var f = R.partial(disc, [3, R.__, 4]);
    var g = R.partialRight(disc, [3, R.__, 4]);
    eq(f(7), g(7));
    eq(f(7, 1, 2, 3), g(7, 1, 2, 3));
  });

});
