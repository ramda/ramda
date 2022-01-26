var windows = require('./windows.js');
var apple = require('./apple.js');
var linux = require('./linux.js');
var android = require('./android.js');
var ios = require('./ios.js');

module.exports = windows.concat(apple, android, ios, linux);
