
function Either(left, right) {
  if (!(this instanceof Either)) {
    return new Either(left, right);
  }
  this.left = left;
  this.right = right;
}

Either.of = function(value, err) {
  return new Either(err, value);
};

Either.prototype.map = function(f) {
  return this.right == null ? this : new Either(this.left, f(this.right));
};

Either.prototype.ap = function(app) {
  return this.right == null ? this : app.map(this.right);
};

// `f` must return a new Either; not sure if this impl is sufficient
Either.prototype.chain = function(f) {
  return this.right == null ? this : f(this.right);
};

Either.prototype.of = Either.of;

Either.prototype.equals = function(that) {
  return this.right === that.right;
};

Either.equals = function(e1, e2) {
  return e1.equals(e2);
};

module.exports = Either;



