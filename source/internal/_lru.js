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
    this.last = node.newer;
    this.last.older = null;
  } else {
    node.older.newer = node.newer;
    node.newer.older = node.older;
  }

  node.older = this.head;
  node.newer = null;
  this.head.newer = node;
  this.head = node;
};

LRU.prototype._appendToHead = function(node) {
  if (!this.head) {
    this.last = node;
    this.head = node;
    return;
  }

  node.older = this.head;
  this.head.newer = node;
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
    this._appendToHead(node);
    return;
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
