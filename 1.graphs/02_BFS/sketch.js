let data;
let graph;
let dropdown;

function preload() {
  data = loadJSON('kevinbacon.json');
}

function setup() {
  graph = new Graph();
  dropdown = createSelect();

  // add event listener with p5
  dropdown.changed(bfs);

  noCanvas();

  const movies = data.movies;

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i].title;
    const cast = movies[i].cast;

    const movieNode = new Node(movie);

    graph.addNode(movieNode);

    for (let j = 0; j < cast.length; j++) {
      const actor = cast[j];
      let actorNode = graph.getNode(actor);

      if (actorNode === undefined) {
        actorNode = new Node(actor);

        // add new actors to dropdown in DOM
        dropdown.option(actor);
      }

      graph.addNode(actorNode);

      movieNode.addEdge(actorNode);
    }
  }


}

function bfs() {
  graph.reset();

  let start = graph.setStart(dropdown.value());
  // let start = graph.setStart('Kevin Bacon');
  let end = graph.setEnd('Kevin Bacon');

  const queue = [];

  // flag it as searched
  start.searched = true;

  // add to queue
  queue.push(start);

  // keep going as long as queue has stuff in it
  while (queue.length > 0) {
    const current = queue.shift();

    console.log(current.value);

    if (current === end) {
      console.log('Found ' + current.value);
      break;
    }

    const edges = current.edges;

    for (let i = 0; i < edges.length; i++) {
      const neighbor = edges[i];

      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  const path = [];

  path.push(end);

  let next = end.parent;

  while (next !== null) {
    path.push(next);
    next = next.parent;
  }

  let txt = '';

  for (let i = path.length - 1; i >= 0; i--) {
    const n = path[i];

    txt += n.value

    if (i !== 0) {
      txt += ' --> ';
    }
  }

  createP(txt);
}
