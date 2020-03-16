export default value =>
  value && typeof value[Symbol.iterator] === 'function';
