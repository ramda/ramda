var R = require('../source');
var eq = require('./shared/eq');

describe('allThen', function() {
  it('invokes then on the Promise.all with the function passed to it', function(done) {
    R.allThen(function(arr) {
      eq(arr, [1]);
      done();
    },
    [Promise.resolve(1)]
    );
  });

  it('invokes then on the promise.all with the function passed to it', function(done) {
    R.allThen(function(arr) {
      eq(arr, [1, 2]);
      done();
    },
    [Promise.resolve(1), Promise.resolve(2)]
    );
  });
});
