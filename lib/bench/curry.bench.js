var curry = require('../..').curry;

function mult(x, y) { return x * y; }
var mult4 = curry(mult)(4);
function manmult(x) {
  return function(y) {
    return x * y;
  };
}
var manual = manmult(4);

module.exports = {
  name: 'curry',
  tests: {
    'mult4(100)': function() {
      mult4(100);
    },
    'manual(100)': function() {
      manual(100);
    }
  }
};
