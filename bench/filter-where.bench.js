var _ = require('lodash');
var R = require('../ramda');
var filter = R.filter;
var where = R.where;
var isEmpty = R.isEmpty;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/filter-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var objs = [
  {x: [1,2]}, {x: [1,3]}, {x: []}, {x: [2]}, {x: [3]}, {x: [1]}, {x: [1,2,3]}, {x: []}, {x: [1,2]}, {x: [1,3]} 
];
var filterEmpty = filter(where({x: R.isEmpty}))

suite.add('_.filter(objs, {x: []})', function() {
  _.filter(objs, {x: []});
})
.add('filter(where({x: isEmpty}), objs)', function() {
  filter(where({x: isEmpty}), objs);
})
.add('filter(where({x: isEmpty}))(objs)', function() {
  filter(where({x: isEmpty}))(objs);
})
.add('filterEmpty(objs)', function() {
  filterEmpty(objs);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  fs.writeFile(out, JSON.stringify(this), function(err) {
    if (err) { console.log('failed to write ' + out); }
    else { console.log('saved ' + out); }
  });
})
.run();


