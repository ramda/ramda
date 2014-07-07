var _ = require('lodash');
var curry = require('../ramda').curry;
var Benchmark = require('benchmark');
var fs = require('fs');
var out = './report/curry-' + (new Date()).toISOString() + '.json';
var suite = new Benchmark.Suite;

var nums = [8,2,85,2,34,3,23,247,57,8,0,6,5,46,54,643];
function mult(x, y) { return x * y; }
var mult4 = curry(mult)(4);
var _x4 = _.partial(mult, 4);
function manmult(x) {
  return function(y) {
    return x* y;
  };
}
var manual = manmult(4);

suite
.add('_x4(100)', function() {
  _x4(100);
})
.add('mult4(100)', function() {
  mult4(100);
})
.add('manual(100)', function() {
  manual(100);
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

