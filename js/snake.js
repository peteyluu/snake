const Coord = require('./coord.js');

class Snake {
  constructor(board) {
    this.board = board;
    this.direction = "N";
    const center = new Coord((Math.floor(board.dim / 2)), (Math.floor(board.dim / 2)));
    this.segments = [center];
  }

  move() {
    const coordDelta = Snake.MOVES[this.direction];
    const currCoord = this.segments.shift();

    const newCoord = currCoord.plus(coordDelta);

    if (this.board.isOutOfBounds(newCoord)) {
      return false;
    } else {
      this.segments.push(currCoord.plus(coordDelta));
      return true;
    }
  }

  turn(direction) {
    this.direction = direction;
  }
}

Snake.MOVES = {
  "N": [-1,  0],
  "W": [ 0, -1],
  "E": [ 0,  1],
  "S": [ 1,  0]
}

module.exports = Snake;
