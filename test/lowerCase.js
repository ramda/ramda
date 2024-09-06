var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('lowerCase', function() {
  it('converts camelCase to space-separated lower case', function() {
    eq(R.lowerCase('helloWorld'), 'hello world');
    eq(R.lowerCase('HelloWorld'), 'hello world');
  });

  it('converts snake_case to space-separated lower case', function() {
    eq(R.lowerCase('hello_world'), 'hello world');
  });

  it('converts kebab-case to space-separated lower case', function() {
    eq(R.lowerCase('hello-world'), 'hello world');
  });

  it('handles multiple spaces, underscores, or hyphens', function() {
    eq(R.lowerCase('hello  world'), 'hello world');
    eq(R.lowerCase('hello__world'), 'hello world');
    eq(R.lowerCase('hello--world'), 'hello world');
  });

  it('converts uppercase words to lowercase', function() {
    eq(R.lowerCase('HELLO WORLD'), 'hello world');
  });
});
