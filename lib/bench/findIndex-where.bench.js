var _ = require('lodash');
var R = require('../..');

var objs = [
  {x: [1, 2], y: true}, {x: [1, 3], y: true}, {x: [], y: false}, {x: [2], y: false},
  {x: [3], y: true}, {x: [1], y: true}, {x: [1, 2, 3], y: true}, {x: [], y: true},
  {x: [1, 2], y: false}, {x: [1, 3], y: true}
];
var findIndexEmptyX = R.findIndex(R.where({x: R.isEmpty}));
var findIndexFalseY = R.findIndex(R.whereEq({y: false}));

module.exports = {
  name: 'findIndex where',
  tests: {
    '_.findIndex(objs, {x: []})': function() {
      _.findIndex(objs, {x: []});
    },
    'findIndex(where({x: isEmpty}), objs)': function() {
      R.findIndex(R.where({x: R.isEmpty}), objs);
    },
    'findIndex(where({x: isEmpty}))(objs)': function() {
      R.findIndex(R.where({x: R.isEmpty}))(objs);
    },
    'findIndexEmptyX(objs)': function() {
      findIndexEmptyX(objs);
    },
    '_.findIndex(objs, {y: false})': function() {
      _.findIndex(objs, {y: false});
    },
    'findIndex(whereEq({y: false}), objs)': function() {
      R.findIndex(R.whereEq({y: false}), objs);
    },
    'findIndex(whereEq({y: false}))(objs)': function() {
      R.findIndex(R.whereEq({y: false}))(objs);
    },
    'findIndexFalseY(objs)': function() {
      findIndexFalseY(objs);
    }
  }
};
