var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('join', function() {
  it("concatenates a list's elements to a string, with an separator string between elements", function() {
    var list = [1, 2, 3, 4];
    eq(R.join('~', list), '1~2~3~4');
  });

});
