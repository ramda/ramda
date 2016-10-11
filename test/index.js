var R = require('..');
var dist = require('../dist/ramda.js');
var eq = require('./shared/eq');


describe('api surface', function() {
  var exportedApi = Object.keys(R);
  var actualApi = Object.keys(dist);

  it('exported api is in sync with an actual api', function() {
    eq(exportedApi, actualApi);
  });
});
