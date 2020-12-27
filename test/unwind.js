var R = require('../source');
var eq = require('./shared/eq');


describe('unwind', function() {
  var object = { name: 'alice',
    hobbies: ['Golf', 'Hacking'],
    colors: ['red', 'green']
  };
  var quiz = {
    title: 'What is the best programming language?',
    options: {0: 'Python', 1: 'Java', 2: 'JavaScript', 3: 'C++'},
    ans: 'Correct Answer is C'
  };


  it('returns list of destructed object if key is present as list in the object', function() {
    eq(R.unwind('hobbies', object), [
      {name: 'alice', hobbies: 'Golf', colors: ['red', 'green']},
      {name: 'alice', hobbies: 'Hacking', colors: ['red', 'green']}
    ]);
    eq(R.unwind('colors', object), [
      {name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'red'},
      {name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'green'}
    ]);
  });

  it('returns list of original object if key is not present in the object', function() {
    eq(R.unwind('hobby', object), [object]);
  });

  it('returns list of original object if key is present in the object but does not have iterable value to be destructed', function() {
    eq(R.unwind('passtimes', object), [object]);
    eq(R.unwind('options', quiz), [quiz]);
    eq(R.unwind('hobbies', { name: 'Berney', hobbies: NaN}), [{ name: 'Berney', hobbies: NaN}]);
  });

  it('key can be any value that can form key of the object', function() {
    // Correct: key <- String | ''
    // Correct: key <- 0 | any positive integer value
    // Correct: key <- true | false

    // Incorrect: key <- -1 | any negative integer value

    eq(R.unwind('', {
      '': ['Python', 'Java', 'JavaScript', 'C++']
    }), [
      { '': 'Python'},
      { '': 'Java'},
      { '': 'JavaScript'},
      { '': 'C++'}
    ]);
    eq(R.unwind(0, {
      0: ['Python', 'Java', 'JavaScript', 'C++']
    }), [
      { 0: 'Python'},
      { 0: 'Java'},
      { 0: 'JavaScript'},
      { 0: 'C++'}
    ]);
  });

  it('do not treat String as list', function() {
    eq(R.unwind('hobbies', { name: 'alice', hobbies:'Golf' }), [
      { name: 'alice', hobbies: 'Golf'}
    ]);
    // Incorrect: result <- [
    //     { name: 'alice', hobbies: 'G'},
    //     { name: 'alice', hobbies: 'o'},
    //     { name: 'alice', hobbies: 'l'},
    //     { name: 'alice', hobbies: 'f'},
    // ]
  });
});
