var R = require('../source');
var eq = require('./shared/eq');


describe('unwindAll', function() {

  var object = {
    name: 'alice',
    hobbies: ['Golf', 'Hacking'],
    colors: ['red', 'green']
  };

  it('returns list of unwind object if keys is a list', function() {
    eq(R.unwindAll(['hobbies', 'colors'], object), [
      [
        { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
        { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
      ],
      [
        { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'red' },
        { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'green' }
      ]
    ]);
  });

  it('returns a list containing only the original object if the keys is not a list or empty list', function() {
    eq(R.unwindAll('hobby', object), [[object]]);
    eq(R.unwindAll([], object), [[object]]);
  });

});
