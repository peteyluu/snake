const Coord = require('./coord.js');

class Snake {
  constructor(board) {
    this.board = board;
    this.direction = "N";
    const center = new Coord((Math.floor(board.dim / 2)), (Math.floor(board.dim / 2)));
    this.segments = [center];
  }

  eatsApple() {
    const headOfSnakeCoord = this.segments[0];
    const appleCoord = this.board.apples[0];
    if (headOfSnakeCoord.equals(appleCoord.coord)) {
      // this.evolve();
      this.board.apples.shift();
      this.board.newApple();
      return true;
    } else {
      return false;
    }
  }

  evolve() {
    const coordDelta = Snake.OPPOSITE_MOVES[this.direction];
    const currCoord = this.segments[0];
    const newCoord = currCoord.plus(coordDelta);
    this.segments.push(newCoord);
  }

  move() {
    const coordDelta = Snake.MOVES[this.direction];
    const currCoord = this.segments.shift();

    const newCoord = currCoord.plus(coordDelta);

    if (this.board.isOutOfBounds(newCoord)) {
      return false;
    } else {
      this.segments.push(newCoord);
      return true;
    }
  }

  turn(direction) {
    this.direction = direction;
  }
}

Snake.OPPOSITE_MOVES = {
  "N": [ 1,  0],
  "W": [ 0,  1],
  "E": [ 0, -1],
  "S": [-1,  0]
}

Snake.MOVES = {
  "N": [-1,  0],
  "W": [ 0, -1],
  "E": [ 0,  1],
  "S": [ 1,  0]
}

module.exports = Snake;
