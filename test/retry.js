var R = require('../source');
var eq = require('./shared/eq');

describe('retry', function() {
  var isEven = (i = 0) => {
    var count = i;
    var arr = [1, 3, 5, 4, 7];
    return function() {
      count += 1;
      return arr[count] % 2 === 0;
    };
  };

  it('test retry function to reach max retry times', function() {
    return R.retry(isEven(-1), 0, { max: 2 })
      .then((result) => {
        eq(result, false);
      });
  });

  it('test retry function to return true before reach max retry time', function() {
    return R.retry(isEven(-1), 0, { max: 5 })
      .then((result) => {
        eq(result, true);
      });
  });
});
