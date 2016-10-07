const Board = require('./board.js');

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setUpBoard();
    this.bindEvents();
    this.intervalId = window.setInterval(this.step.bind(this), 500);
  }

  setUpBoard() {
    for (let i = 0; i < this.board.dim; i++) {
      const $ul = $('<ul>');

      for (let j = 0; j < this.board.dim; j++) {
        const $li = $('<li>');


        for (let k = 0; k < this.board.snake.segments.length; k++) {
          const currCoord = this.board.snake.segments[k];
          if (currCoord.x === i && currCoord.y === j) {
            $li.addClass("snake");
          }
        }

        if (this.board.apples.length > 0) {
          const currCoordApple = this.board.apples[0];
          if (currCoordApple.coord.x === i && currCoordApple.coord.y === j) {
            $li.addClass("apple");
          }
        }

        $ul.append($li);
      }
      this.$el.append($ul);
    }
  }

  bindEvents() {
    $(window).on("keydown", event => {
      this.handleKeyEvent(event);
    });
  }

  handleKeyEvent(event) {
    const direction = SnakeView.CODES[event.keyCode];
    if (this.isValidKeyEvent(direction)) {
      this.board.snake.turn(direction);
    }
  }

  isValidKeyEvent(direction) {
    if ( (this.board.snake.direction === "N" && direction === "S") ||
         (this.board.snake.direction === "S" && direction === "N") ||
         (this.board.snake.direction === "W" && direction === "E") ||
         (this.board.snake.direction === "E" && direction === "W") ) {
      return false;
    }
    return true;
  }

  step() {
    if (this.board.getSnakeSegments().length > 0) {
      this.board.snake.move();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
    this.renderBoard();
  }

  renderBoard() {
    const $snake = $(".snake-game");
    $snake.children().remove();
    this.setUpBoard();
  }
}

SnakeView.CODES = {
  87: "N",
  65: "W",
  68: "E",
  83: "S"
}

module.exports = SnakeView;
