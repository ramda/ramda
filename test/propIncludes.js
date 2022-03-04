var R = require('../source/index.js');
var eq = require('./shared/eq.js');


describe('propIncludes', function() {

  var kwabena = {name: 'Kwabena', country: 'ghana'};
  var naadei = {name: 'Naadei', country: 'ghana'};
  var bogdan = {name: 'Bogdan', country: 'romania'};

  var africanCountries = ['ghana', 'nigeria'];
  var europeanCountries = ['romania', 'ukraine'];

  it('returns false if supplied name is falsy/invalid', function() {
    eq(R.propIncludes(null, africanCountries, kwabena), false);
    eq(R.propIncludes(undefined, africanCountries, kwabena), false);
    eq(R.propIncludes('', africanCountries, kwabena), false);
    eq(R.propIncludes('eyeColor', africanCountries, kwabena), false);
  });

  it('returns false if supplied list is empty', function() {
    eq(R.propIncludes('country', [], kwabena), false);
  });

  it('determines whether a particular property is included in the supplied list for a specific object', function() {
    eq(R.propIncludes('country')(africanCountries)(kwabena), true);
    eq(R.propIncludes('country', africanCountries)(kwabena), true);
    eq(R.propIncludes('country', africanCountries, kwabena), true);

    eq(R.propIncludes('country', africanCountries, naadei), true);
    eq(R.propIncludes('country', africanCountries, bogdan), false);

    eq(R.propIncludes('country', europeanCountries, bogdan), true);
    eq(R.propIncludes('country', europeanCountries, kwabena), false);
  });
});
