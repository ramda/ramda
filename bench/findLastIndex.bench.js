var _ = require('lodash');
var findLastIndex = require('../ramda').findLastIndex;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function isZero(x) { return x === 0; }
var findLastIndexZero = findLastIndex(isZero);

module.exports = {
  name: "findLastIndex",
  tests: {
    "_.findLastIndex(nums, isZero)": function() {
      _.findLastIndex(nums, isZero);
    },
    'findLastIndex(isZero, nums)': function() {
      findLastIndex(isZero, nums);
    },
    'findLastIndex(isZero)(nums)': function() {
      findLastIndex(isZero)(nums);
    },
    'findLastIndexZero(nums)': function() {
      findLastIndexZero(nums);
    }
  }
};

