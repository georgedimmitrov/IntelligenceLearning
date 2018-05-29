function Graph() {
  this.nodes = [];
  this.graph = {};
  this.end = null;
  this.start = null;
}

Graph.prototype.setStart = function(actor) {
  this.start = this.graph[actor];

  return this.start;
};

Graph.prototype.setEnd = function(actor) {
  this.end = this.graph[actor];

  return this.end;
};

// Add a new node to the graph
Graph.prototype.addNode = function(n) {
  // Node into array
  this.nodes.push(n);

  let title = n.value;

  // Node into "hash table"
  this.graph[title] = n;
};

Graph.prototype.getNode = function(actor) {
  let n = this.graph[actor];

  return n;
};

Graph.prototype.reset = function() {
  for (let i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
};