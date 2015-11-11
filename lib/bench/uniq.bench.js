var R = require('../..');

var arr1 = R.times(function() {
  var n = (Math.random() * 100) >>> 0;
  if (n < 20) {
    // integer
    return n;
  } else if (n < 40) {
    // boolean
    return n < 30;
  } else if (n < 60) {
    // string
    return n.toString(10);
  } else if (n < 80) {
    // array
    return [n % 3, n % 7, n];
  } else {
    // object
    return {
      a: 'foo',
      n: n
    };
  }
}, 1000);

var arr2 = R.times(function() { return (Math.random() * 100) >>> 0; }, 1000);
var arr3 = R.times(function() { return [true]; }, 1000);

function id(x) {
  return x;
}

module.exports = {
  name: 'uniq',
  tests: {
    'uniqBy(id, arr1)': function() {
      R.uniqBy(id, arr1);
    },
    'uniqWith(equals, arr1)': function() {
      R.uniqWith(R.equals, arr1);
    },
    'uniq(arr1)': function() {
      R.uniq(arr1);
    },
    'uniqBy(id, arr2)': function() {
      R.uniqBy(id, arr2);
    },
    'uniqWith(equals, arr2)': function() {
      R.uniqWith(R.equals, arr2);
    },
    'uniq(arr2)': function() {
      R.uniq(arr2);
    },
    'uniqBy(id, arr3)': function() {
      R.uniqBy(id, arr3);
    },
    'uniqWith(equals, arr3)': function() {
      R.uniqWith(R.equals, arr3);
    },
    'uniq(arr3)': function() {
      R.uniq(arr3);
    }
  }
};
