var windows = require('./windows');
var apple = require('./apple');
var linux = require('./linux');
var android = require('./android');
var ios = require('./ios');

module.exports = windows.concat(apple, android, ios, linux);
