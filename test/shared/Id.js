var R = require('../..');


function Id(x) {
  if (!(this instanceof Id)) {
    return new Id(x);
  }
  this.value = x;
}

Id.prototype.ap = function(id) {
  return Id(this.value(id.value));
};

Id.prototype.map = function(f) {
  return Id(f(this.value));
};

Id.prototype.sequence = function(of) {
  void of;
  return this.value.map(Id);
};

Id.prototype.toString = function() {
  return 'Id(' + R.toString(this.value) + ')';
};

module.exports = Id;
