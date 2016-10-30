var map = require('../..').map;

var nums = [8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643];
function sq(x) { return x * x; }
var mapSq = map(sq);

module.exports = {
  name: 'map',
  tests: {
    'map(sq, nums)': function() {
      map(sq, nums);
    },
    'map(sq)(nums)': function() {
      map(sq)(nums);
    },
    'mapSq(nums)': function() {
      mapSq(nums);
    },
    'native map': function() {
      nums.map(sq);
    }
  }
};
