module.exports = function(x) {
  return x && x.__transducers_reduced__ ? x : {value: x, __transducers_reduced__: true};
};
