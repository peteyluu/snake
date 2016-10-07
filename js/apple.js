const Coord = require('./coord.js');

class Apple {
  constructor(board) {
    this.board = board;
    this.coord = new Coord(
      (Math.floor(Math.random() * this.board.dim)),
      (Math.floor(Math.random() * this.board.dim))
    );

    const snakeCoord = this.board.snake.segments[0];
    while (snakeCoord.equals(this.coord)) {
      this.coord = new Coord(
        (Math.floor(Math.random() * this.board.dim)),
        (Math.floor(Math.random() * this.board.dim))
      );
    }
  }
}

module.exports = Apple;
