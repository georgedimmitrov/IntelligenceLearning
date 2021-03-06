function Tree() {
  // Just store the root
  this.root = null;
}

// Start by visiting the root
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
};

// Start by searching the root
Tree.prototype.search = function(val) {
  return this.root.search(val);
};

// Add a new value to the tree
Tree.prototype.addValue = function(val) {
  let n = new Node(val);

  if (this.root === null) {
    this.root = n;
    // An initial position for the root node
    this.root.x = width / 2;
    this.root.y = 16;
  } else {
    this.root.addNode(n);
  }
};