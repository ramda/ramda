var _ = require('lodash');
var R = require('..');
var findIndex = R.findIndex;
var where = R.where;
var isEmpty = R.isEmpty;

var objs = [
  {x: [1,2], y: true}, {x: [1,3], y: true}, {x: [], y: false}, {x: [2], y: false},
  {x: [3], y: true}, {x: [1], y: true}, {x: [1,2,3], y: true}, {x: [], y: true},
  {x: [1,2], y: false}, {x: [1,3], y: true}
];
var findIndexEmptyX = findIndex(where({x: R.isEmpty}));
var findIndexFalseY = findIndex(where({y: false}));

module.exports = {
  name: "findIndex where",
  tests: {
    '_.findIndex(objs, {x: []})': function() {
      _.findIndex(objs, {x: []});
    },
    'findIndex(where({x: isEmpty}), objs)': function() {
      findIndex(where({x: isEmpty}), objs);
    },
    'findIndex(where({x: isEmpty}))(objs)': function() {
      findIndex(where({x: isEmpty}))(objs);
    },
    'findIndexEmptyX(objs)': function() {
      findIndexEmptyX(objs);
    },
    '_.findIndex(objs, {y: false})': function() {
      _.findIndex(objs, {y: false});
    },
    'findIndex(where({y: false}), objs)': function() {
      findIndex(where({y: false}), objs);
    },
    'findIndex(where({y: false}))(objs)': function() {
      findIndex(where({y: false}))(objs);
    },
    'findIndexFalseY(objs)': function() {
      findIndexFalseY(objs);
    }
  }
};
