var R = require('../..');

var setProp = R.curry (function(prop, value, obj) {
    obj[prop] = value;
    return obj;
});

void setProp;
