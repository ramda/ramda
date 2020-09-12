var fs = require('fs');
var path = require('path');
var pkg = require('../package.json');

var readme_path = path.resolve('./README.md');

fs.readFile(readme_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    var dataWithNewVersion = data.replace(
      /((?:libs|npm)\/ramda[\/@])(\d+\.\d+(?:\.\d+)?)/g,
      function (v, p1, p2) {
        return p1 + pkg.version;
      }
    );
    fs.writeFileSync(readme_path, dataWithNewVersion, { encoding: 'utf8' });
  }
});
