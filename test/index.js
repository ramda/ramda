var R = require('..');
var fs = require('fs');
var path = require('path');
var eq = require('./shared/eq');


describe('api surface', function() {
  var srcFolder = path.join(__dirname, '../src');
  var isJsFile = function(file) { return file.match(/\.js$/); }
  var removeJsEnding = function(file) { return file.replace('.js', ''); }

  var exportedApi = Object.keys(R);
  var actualApi = fs.readdirSync(srcFolder).filter(isJsFile).map(removeJsEnding);

  it('should be up to date with functions in ./src/ and vice versa', function() {
    eq(exportedApi, actualApi);
  });
});
