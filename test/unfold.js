var R = require('..');
var eq = require('./shared/eq');


describe('unfold', function() {
  it('unfolds simple functions with a starting point to create a list', function() {
    eq(R.unfold(function(n) { return n > 0 ? [[n, n - 1]] : []; }, 5), [5, 4, 3, 2, 1]);
  });

  it('is cool!', function() {
    var fib = function(n) {
      var count = 0;
      return function(pair) {
        count += 1;
        if (count <= n) {
          var head = pair[0];
          var tail = [pair[1], pair[0] + pair[1]];
          return [[head, tail]];
        } else {
          return [];
        }
      };
    };
    eq(R.unfold(fib(10), [0, 1]), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

});
