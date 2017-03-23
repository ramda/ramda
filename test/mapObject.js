var R = require('..');
var eq = require('./shared/eq');


describe('mapObject', function() {
  it('returns a dictionary from two lists', function() {
    var a = ['a', 'b', 'c'];
    var b = [100, 200, 300];


    eq(R.mapObject(a, b), {a:100,b:200,c:300});
  });

});
