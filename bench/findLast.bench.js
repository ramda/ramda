var _ = require('lodash');
var findLast = require('../ramda').findLast;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function isZero(x) { return x === 0; }
var findLastZero = findLast(isZero);

module.exports = {
  name: "findLast",
  tests: {
    "_.findLast(nums, isZero)": function() {
      _.findLast(nums, isZero);
    },
    'findLast(isZero, nums)': function() {
      findLast(isZero, nums);
    },
    'findLast(isZero)(nums)': function() {
      findLast(isZero)(nums);
    },
    'findLastZero(nums)': function() {
      findLastZero(nums);
    }
  }
};

