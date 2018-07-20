var R = require('../source');
var eq = require('./shared/eq');


describe('project', function() {
  var kids = [
    {name: 'Abby', age: 7, hair: 'blond'},
    {name: 'Fred', age: 12, hair: 'brown'},
    {name: 'Rusty', age: 10, hair: 'brown'},
    {name: 'Alois', age: 15, disposition: 'surly'}
  ];

  it('selects the chosen properties from each element in a list', function() {
    eq(R.project(['name', 'age'], kids), [
      {name: 'Abby', age: 7},
      {name: 'Fred', age: 12},
      {name: 'Rusty', age: 10},
      {name: 'Alois', age: 15}
    ]);
  });

  it('has an undefined property on the output tuple for any input tuple that does not have the property', function() {
    eq(R.project(['name', 'hair'], kids), [
      {name: 'Abby', hair: 'blond'},
      {name: 'Fred', hair: 'brown'},
      {name: 'Rusty', hair: 'brown'},
      {name: 'Alois', hair: undefined}
    ]);
  });

});
