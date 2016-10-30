var R = require('../..');

var gt10 = x => x > 10;
var even = x => x % 2 === 0;

module.exports = {
  name: 'either',
  tests: {
    'either(gt10, even)(101)': function() {
      R.either(gt10, even)(101);
    },
    'either(gt10)(even)(101)': function() {
      R.either(gt10)(even)(101);
    },
    'either(gt10, even)(8)': function() {
      R.either(gt10, even)(8);
    },
    'either(gt10)(even)(8)': function() {
      R.either(gt10)(even)(8);
    },
    'native gt10(101) || even(101)': function() {
      gt10(101) || even(101);
    },
    'native gt10(8) || even(8)': function() {
      gt10(8) || even(8);
    }
  }
};
