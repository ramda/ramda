function createNode(key, value) {
  return {
    newer: null,
    older: null,
    key: key,
    value: value
  };
}

function LRU(size) {
  this.size = size;

  this.length = 0;
  this.head = null;
  this.last = this.head;

  this.map = new Map();
}

LRU.prototype.has = function(key) {
  return this.map.has(key);
};

LRU.prototype._hoistNode = function(node) {
  if (this.head === node) {
    return;
  }

  if (this.last === node) {
    this.last = node.newer || node;
    this.last.older = null;
  }

  if (node.older) {
    node.older.newer = node.newer;
  }
  if (node.newer) {
    node.newer.older = node.older;
  }

  node.older = this.head;
  node.newer = null;

  if (this.head) {
    this.head.newer = node;
  }

  if (!this.last) {
    this.last = node;
  }
  this.head = node;
};

LRU.prototype.get = function(key) {
  if (!this.has(key)) {
    return undefined;
  }

  var node = this.map.get(key);

  this._hoistNode(node);

  return node.value;
};

LRU.prototype.set = function(key, value) {
  var node;
  if (this.has(key)) {
    node = this.map.get(key);
    node.value = value;
  } else if (this.length < this.size) {
    node = createNode(key, value);
    this.map.set(key, node);
    this.length += 1;
  } else {
    node = this.last;
    this.map.delete(node.key);
    node.value = value;
    node.key = key;
    this.map.set(key, node);
  }
  this._hoistNode(node);
};

export default LRU;
