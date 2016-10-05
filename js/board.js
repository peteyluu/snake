const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
  constructor(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    this.grid = [];

    const apple = new Apple(dim);
    this.apples = [apple];
    this.setUpBoard();
  }

  setUpBoard() {
    for (let i = 0; i < this.dim; i++) {
      const row = [];
      for (let j = 0; j < this.dim; j++) {
        row.push(undefined);
      }
      this.grid.push(row);
    }
  }

  isOutOfBounds(coord) {
    if (coord.x < 0 || coord.y < 0 || coord.x > this.dim || coord.y > this.dim) {
      return true;
    }
    return false;
  }
}

module.exports = Board;
