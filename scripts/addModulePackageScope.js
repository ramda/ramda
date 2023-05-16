const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const PACKAGE_SCOPE_PATH = path.join(__dirname, '..', 'es', 'package.json');

fs.writeFileSync(PACKAGE_SCOPE_PATH, JSON.stringify({ type: 'module', version }));
