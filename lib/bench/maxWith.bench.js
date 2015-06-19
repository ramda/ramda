var R = require('../..');
var maxBy = R.maxBy;
var computer = R.prop('val');
var maxVal = maxBy(computer);
var vals = R.map(function(n) { return {key: n * 5, val: String.fromCharCode(n * 5)}; }, R.range(1, 100));

module.exports = {
  name: 'maxBy',
  tests: {
    'maxBy(computer, nums)': function() {
      maxBy(computer, vals);
    },
    'maxBy(computer)(vals)': function() {
      maxBy(computer)(vals);
    },
    'maxVal(vals)': function() {
      maxVal(vals);
    }
  }
};
