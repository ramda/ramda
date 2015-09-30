var R = require('..');
var eq = require('./shared/eq');


describe('prop', function() {
  var fred = {name: 'Fred', age: 23};

  it('returns a function that fetches the appropriate property', function() {
    var nm = R.prop('name');
    eq(typeof nm, 'function');
    eq(nm(fred), 'Fred');
  });
});
