var indexOf = require('../..').indexOf;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
var idxOf23 = indexOf(23);

module.exports = {
  name: 'indexOf',
  tests: {
    'indexOf(sq, nums)': function() {
      indexOf(23, nums);
    },
    'indexOf(sq)(nums)': function() {
      indexOf(23)(nums);
    },
    'idxOf23(nums)': function() {
      idxOf23(nums);
    },
    'native indexOf': function() {
      nums.indexOf(23);
    }
  }
};
