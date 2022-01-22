var fs = require('fs');
var path = require('path');
var pkg = require('../package.json');

var readme_path = path.resolve('./README.md');

var readme_content = fs.readFileSync(readme_path, 'utf8');
var new_readme_content = readme_content.replace(
  /((?:libs|npm)\/ramda[\/@])(\d+\.\d+(?:\.\d+)?)/g,
  function (v, p1, p2) {
    return p1 + pkg.version;
  }
);
fs.writeFileSync(readme_path, new_readme_content, { encoding: 'utf8' });

var license_path = path.resolve('./LICENSE.txt');

var license_content = fs.readFileSync(license_path, 'utf8');
var new_license_content = license_content.replace(
  /(Copyright\ \(c\)\ 2013-)(\d{4})/g,
  function (v, p1, p2) {
    return p1 + new Date().getFullYear();
  }
);
fs.writeFileSync(license_path, new_license_content, { encoding: 'utf8' });
