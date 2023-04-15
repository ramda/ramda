var propEq = require('../../src/index.js').propEq;

module.exports = {
  name: 'propEq',
  tests: {
    'propEq([1, 2, 3], "value", {value: [1, 2, 3]})': function() {
      propEq([1, 2, 3], 'value', {value: [1, 2, 3]});
    }
  }
};
