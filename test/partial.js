var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('partial', function() {
  var disc = function(a, b, c) {
    // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partial(disc, [3]);
    eq(f(7, 4), 1);
    var g = R.partial(disc, [3, 7]);
    eq(g(4), 1);
  });

  it('correctly reports the arity of the new function', function() {
    var f = R.partial(disc, [3]);
    eq(f.length, 2);
    var g = R.partial(disc, [3, 7]);
    eq(g.length, 1);
  });

  it('correctly processes rest of the arguments', function() {
    function greet(salutation, title, firstName, lastName) {
      return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
    }
    var sayHello = R.partial(greet, ['Hello']);
    var sayHelloToMs = R.partial(sayHello, ['Ms.']);
    eq(sayHelloToMs('Jane', 'Jones', '&', 'Green'), 'Hello, Ms. Jane Jones!');
  });
});
