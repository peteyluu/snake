const Coord = require('./coord.js');

class Snake {
  constructor(board) {
    this.board = board;
    this.direction = "N";
    const center = new Coord((Math.floor(board.dim / 2)), (Math.floor(board.dim / 2)));
    this.segments = [center];
  }

  eatsApple() {
    if (this.head().equals(this.board.getApple())) {
      return true;
    } else {
      return false;
    }
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  move() {
    // move the snake towards the `this.direction`
    // this essentially generates a new Snake Head Coord
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));

    // check if the Snake's head Coord eats Apple
    if (this.eatsApple()) {
      this.board.newApple();
    } else {
      this.segments.shift();
    }

    // destroy snake if it runs off grid
    if (this.board.isOutOfBounds(this.head())) {
      this.segments = [];
    }
  }

  turn(direction) {
    this.direction = direction;
  }
}

Snake.MOVES = {
  "N": new Coord(-1, 0),
  "W": new Coord(0, -1),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0)
}

module.exports = Snake;
