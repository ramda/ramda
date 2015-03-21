module.exports = function _isTransformer(obj) {
  return typeof obj.step === 'function' && typeof obj.result === 'function';
};
