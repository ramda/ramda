export default function throwReduceTypeError(expectedMessage) {
  return function(err) {
    return err.constructor === TypeError && err.message === 'reduce: ' + expectedMessage;
  };
}
