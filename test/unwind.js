var R = require('../source');
var eq = require('./shared/eq');


describe('unwind', function() {
  var object = {
    name: 'alice',
    hobbies: ['Golf', 'Hacking'],
    colors: ['red', 'green']
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

  it('returns a list containing only the original object if the key is not present in the object', function() {
    eq(R.unwind('hobby', object), [object]);
  });

  it('returns a list containing only the original object if the the value for that key is not iterable', function() {
    eq(R.unwind('passtimes', object), [object]);
    eq(R.unwind('options',  {
      title: 'What is the best programming language?',
      options: {0: 'Python', 1: 'Java', 2: 'JavaScript', 3: 'C++'},
      ans: 'Correct Answer is 2'
    }), [{
      title: 'What is the best programming language?',
      options: {0: 'Python', 1: 'Java', 2: 'JavaScript', 3: 'C++'},
      ans: 'Correct Answer is 2'
    }]);
    eq(R.unwind('hobbies', { name: 'Berney', hobbies: NaN}), [{ name: 'Berney', hobbies: NaN}]);
  });

  it('does not treat a String as a list', function() {
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
