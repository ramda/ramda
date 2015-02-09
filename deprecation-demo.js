var mixin = require('./src/mixin');

var a = {foo: 'bar', baz: 'qux'};
var b = {foo: 'baz', qux: 'out'};

console.log(mixin(a, b));
console.log(mixin(a, b));
