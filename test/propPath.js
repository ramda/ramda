var R = require('..');
var eq = require('./shared/eq');

describe('propPath', function() {
  var david = {
    name: 'David',
    age: 40,
    address: {
      street: '4 Yawkee Way',
      city: 'Boston',
      state: 'Massachusetts',
      zip: '02215',
      geo: {
        lat: 42.346514,
        lon: -71.097366
      }
    }
  };

  it('returns a function that fetches the appropriate property', function() {
    var lat = R.propPath(['address', 'geo', 'lat']);
    eq(typeof lat, 'function');
    eq(lat(david), 42.346514);
  });


  it('returns a function that returns undefined if path not found', function() {
    var height = R.propPath(['height']);
    eq(typeof height, 'function');
    eq(height(david), undefined);
  });
});
