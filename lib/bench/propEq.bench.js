var propEq = require('../..').propEq;

module.exports = {
  name: 'propEq',
  tests: {
    'propEq("value", [1, 2, 3], {value: [1, 2, 3]})': function() {
      propEq('value', [1, 2, 3], {value: [1, 2, 3]});
    }
  }
};
