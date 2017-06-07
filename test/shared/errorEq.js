var curry = require('../../src/curry');


//  errorEq :: TypeRep a -> String -> Error -> Boolean
module.exports = curry(function(type, message, error) {
  return error.constructor === type && error.message === message;
});
