var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('objOf', function() {

  it('creates an object containing a single key:value pair', function() {
    eq(R.objOf('foo', 42), {foo: 42});
    eq(R.objOf('foo')(42), {foo: 42});
  });

  it('creates an own __proto__ property without changing the prototype', function() {
    var value = {answer: 42};
    var obj = R.objOf('__proto__', value);
    eq(Object.keys(obj), ['__proto__']);
    eq(obj.__proto__, value);
    eq(Object.getPrototypeOf(obj), Object.prototype);
    eq(Object.getOwnPropertyDescriptor(obj, '__proto__'), {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  });

});
