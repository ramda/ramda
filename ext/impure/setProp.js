var R = require('../../ramda.js');

var setProp = R.curry (function (prop, value, obj) {
    obj[prop] = value;
    return obj;
});
