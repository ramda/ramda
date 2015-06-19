var R = require('../..');

var objs = [
    {x: [1, 2], y: true}, {x: [1, 3], y: true}, {x: [], y: false}, {x: [2], y: false},
    {x: [3], y: true}, {x: [1], y: true}, {x: [1, 2, 3], y: true}, {x: [], y: true},
    {x: [1, 2], y: false}, {x: [1, 3], y: true}
];
var filterEmptyX = R.filter(R.where({x: R.isEmpty}));
var filterFalseY = R.filter(R.whereEq({y: false}));

module.exports = {
  name: 'filter where',
  tests: {
    'filter(where({x: isEmpty}), objs)': function() {
      R.filter(R.where({x: R.isEmpty}), objs);
    },
    'filter(where({x: isEmpty}))(objs)': function() {
      R.filter(R.where({x: R.isEmpty}))(objs);
    },
    'filterEmptyX(objs)': function() {
      filterEmptyX(objs);
    },
    'filter(whereEq({y: false}), objs)': function() {
      R.filter(R.whereEq({y: false}), objs);
    },
    'filter(whereEq({y: false}))(objs)': function() {
      R.filter(R.whereEq({y: false}))(objs);
    },
    'filterFalseY(objs)': function() {
      filterFalseY(objs);
    }
  }
};
