var R = require('../source');
var eq = require('./shared/eq');


describe('ifElseP', function() {
  var t = function(a) { return a + 1; };
  var identity = function(a) { return a; };
  var isArray = function(a) { return Object.prototype.toString.call(a) === '[object Array]'; };

  it('calls the truth case function if the validator returns a truthy value', function() {
    var v = function(a) { return Promise.resolve(typeof a === 'number'); };
    R.ifElseP(v, t, identity)(10).then(p => eq(p, 11))
  });

});
