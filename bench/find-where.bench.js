var _ = require('lodash');
var R = require('../ramda');
var find = R.find;
var where = R.where;
var isEmpty = R.isEmpty;

var objs = [
  {x: [1,2], y: true}, {x: [1,3], y: true}, {x: [], y: false}, {x: [2], y: false},
  {x: [3], y: true}, {x: [1], y: true}, {x: [1,2,3], y: true}, {x: [], y: true},
  {x: [1,2], y: false}, {x: [1,3], y: true}
];
var findEmptyX = find(where({x: R.isEmpty}));
var findFalseY = find(where({y: false}));

module.exports = {
  name: "find where",
  tests: {
    '_.find(objs, {x: []})': function() {
      _.find(objs, {x: []});
    },
    'find(where({x: isEmpty}), objs)': function() {
      find(where({x: isEmpty}), objs);
    },
    'find(where({x: isEmpty}))(objs)': function() {
      find(where({x: isEmpty}))(objs);
    },
    'findEmptyX(objs)': function() {
      findEmptyX(objs);
    },
    '_.find(objs, {y: false})': function() {
      _.find(objs, {y: false});
    },
    'find(where({y: false}), objs)': function() {
      find(where({y: false}), objs);
    },
    'find(where({y: false}))(objs)': function() {
      find(where({y: false}))(objs);
    },
    'findFalseY(objs)': function() {
      findFalseY(objs);
    }
  }
};
