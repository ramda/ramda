function _CircularBuffer(size) {
  this.size = size;
  this.array = [];
  this.index = 0 % size;
}
_CircularBuffer.prototype.push = function(input) {
  this.array[this.index] = input;
  this.index += 1;
  this.index %= this.size;
};
_CircularBuffer.prototype[Symbol.iterator] = function* () {
  yield* this.array.slice(this.index);
  yield* this.array.slice(0, this.index);
};

export default _CircularBuffer;
