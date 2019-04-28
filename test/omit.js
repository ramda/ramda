var R = require('../source');
var eq = require('./shared/eq');


describe('omit', function() {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

  it('copies an object omitting the listed properties', function() {
    eq(R.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
  });

  it('includes prototype properties', function() {
    var F = function(param) {this.x = param;};
    F.prototype.y = 40; F.prototype.z = 50;
    var obj = new F(30);
    obj.v = 10; obj.w = 20;
    eq(R.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
  });
  it('pass single string prop to omit', function() {
    eq(R.omit('a', obj), { b: 2, c: 3, d: 4, e: 5, f: 6});
  })
  it('pass single string prop but undeclared', function() {
    eq(R.omit('notExist', obj), obj);
  })

});
