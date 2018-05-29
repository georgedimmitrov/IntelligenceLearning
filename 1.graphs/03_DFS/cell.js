// Cell in the grid, each one drawn with lines to easily make a maze
//
// Coordinates of walls
// (x, y)        (x + w, y)
//        _________
//        |       |
//        |       |
//        ---------
// (x, y + w)    (x + w, y + w)

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  /**
   * Neighbors are at coordinates
   *          (i, j - 1)
   *              X
   * (i - 1, j) X X X (i + 1, j)
   *              X
   *          (i, j + 1)
   */
  this.checkNeighbors = function() {
    const neighbors = [];

    const top = grid[index(i, j - 1)];
    const right = grid[index(i + 1, j)];
    const bottom = grid[index(i, j + 1)];
    const left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }

    if (right && !right.visited) {
      neighbors.push(right);
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      const r = floor(random(0, neighbors.length));

      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;

    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };

  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;

    stroke(255);

    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  };
}
