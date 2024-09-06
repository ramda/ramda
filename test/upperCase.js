var R = require('../source/index.js');
var eq = require('./shared/eq.js');

describe('upperCase', function() {
  it('converts camelCase to space-separated upper case', function() {
    eq(R.upperCase('helloWorld'), 'HELLO WORLD');
    eq(R.upperCase('HelloWorld'), 'HELLO WORLD');
  });

  it('converts snake_case to space-separated upper case', function() {
    eq(R.upperCase('hello_world'), 'HELLO WORLD');
  });

  it('converts kebab-case to space-separated upper case', function() {
    eq(R.upperCase('hello-world'), 'HELLO WORLD');
  });

  it('handles multiple spaces, underscores, or hyphens', function() {
    eq(R.upperCase('hello  world'), 'HELLO WORLD');
    eq(R.upperCase('hello__world'), 'HELLO WORLD');
    eq(R.upperCase('hello--world'), 'HELLO WORLD');
  });

  it('converts lowercase words to uppercase', function() {
    eq(R.upperCase('hello world'), 'HELLO WORLD');
  });
});
