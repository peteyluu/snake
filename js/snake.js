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
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));

    if (this.eatsApple()) {
      this.board.newApple();
    } else {
      this.segments.shift();
    }

    if (!this.isValidSegments()) {
      this.segments = [];
    }
  }

  isValidSegments() {
    if (this.board.isOutOfBounds(this.head()) || this.eatsItself()) {
      return false;
    }
    return true;
  }

  turn(direction) {
    if (!this.isValidDirection(direction)) {
      this.direction = direction;
    }
  }

  eatsItself() {
    const head = this.head();
    for (let i = 0; i < this.segments.length - 1; i++) {
      if (head.equals(this.segments[i])) {
        return true;
      }
    }
    return false;
  }

  isValidDirection(direction) {
    return Snake.MOVES[this.direction].isOpposite(Snake.MOVES[direction]);
  }
}

Snake.MOVES = {
  "N": new Coord(-1, 0),
  "W": new Coord(0, -1),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0)
}

module.exports = Snake;
