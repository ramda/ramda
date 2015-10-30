module.exports = function(a) {
  return a != null ? a.constructor.name === 'GeneratorFunction' : false;
};
