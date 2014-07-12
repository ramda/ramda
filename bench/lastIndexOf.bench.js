var _ = require('lodash');
var lastIndexOf = require('../ramda').lastIndexOf;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
var lastIdxOf23 = lastIndexOf(23);

module.exports = {
  name: "lastIndexOf",
  tests: {
    "_.lastIndexOf": function() {
       _.lastIndexOf(nums, 23);
    },
    'lastIndexOf(sq, nums)': function() {
      lastIndexOf(23, nums);
    },
    'lastIndexOf(sq)(nums)': function() {
      lastIndexOf(23)(nums);
    },
    'lastIdxOf23(nums)': function() {
      lastIdxOf23(nums);
    }
  }
};

