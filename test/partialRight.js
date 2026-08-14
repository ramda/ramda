var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('partialRight', function() {
  var disc = function(a, b, c) {
    // note disc(3, 7, 4) => 1
    return b * b - 4 * a * c;
  };

  it('caches the initially supplied arguments', function() {
    var f = R.partialRight(disc, [4]);
    eq(f(3, 7), 1);
    var g = R.partialRight(disc, [7, 4]);
    eq(g(3), 1);
  });

  it('correctly reports the arity of the new function', function() {
    var f = R.partialRight(disc, [4]);
    eq(f.length, 2);
    var g = R.partialRight(disc, [7, 4]);
    eq(g.length, 1);
  });

  it('correctly processes rest of the arguments', function() {
    function greet(salutation, title, firstName, lastName) {
      return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
    }
    var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
    eq(greetMsJaneJones('Hello', 'Mr.', 'Green'), 'Hello, Ms. Jane Jones!');
  });
});
