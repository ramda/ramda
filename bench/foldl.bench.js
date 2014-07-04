var _ = require('lodash');
var foldl = require('../ramda').foldl;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/foldl-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function add(acc, x) { return acc + x; }
var foldlAdd = foldl(add, 0);

suite
.add('_.reduce(nums, add, 0)', function() {
  _.reduce(nums, add, 0);
})
.add('foldl(add, 0, nums)', function() {
  foldl(add, 0, nums);
})
.add('foldl(add, 0)(nums)', function() {
  foldl(add, 0)(nums);
})
.add('foldlAdd(nums)', function() {
  foldlAdd(nums);
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

