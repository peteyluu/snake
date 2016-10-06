const Board = require('./board.js');

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setUpBoard();

    this.bindEvents();
    this.intervalId = window.setInterval(this.step.bind(this), 1000);
  }

  setUpBoard() {
    for (let i = 0; i < this.board.dim; i++) {
      const $ul = $('<ul>');

      for (let j = 0; j < this.board.dim; j++) {
        const $li = $('<li>');

        const currCoord = this.board.snake.segments[0];
        if (currCoord.x === i && currCoord.y === j) {
          $li.addClass("snake");
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
    this.board.snake.turn(direction);
  }

  step() {
    const validMove = this.board.snake.move();

    const isAppleEaten = this.board.snake.eatsApple();

    if (isAppleEaten) {
      const $lists = $("li");
      $lists.removeClass("apple");
    }

    if (validMove) {
      this.renderBoard();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
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
