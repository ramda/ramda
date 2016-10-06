var find = require('../..').find;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function isZero(x) { return x === 0; }
var findZero = find(isZero);

module.exports = {
  name: 'find',
  tests: {
    'find(isZero, nums)': function() {
      find(isZero, nums);
    },
    'find(isZero)(nums)': function() {
      find(isZero)(nums);
    },
    'findZero(nums)': function() {
      findZero(nums);
    },
    'native find': function() {
      nums.find(isZero);
    }
  }
};
