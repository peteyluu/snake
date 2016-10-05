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

        const currCoord = this.board.snake.segments[0];
        if (currCoord.x === i && currCoord.y === j) {
          $li.addClass("snake");
        }

        const currCoordApple = this.board.apples[0];
        if (currCoordApple.coord.x === i && currCoordApple.coord.y === j) {
          $li.addClass("apple");
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
    // How do we detect if the Snake collides with the Apple?
    // The window waits for USER input
    // The input triggers the change in "direction"
    // The SnakeView has a `setInterval` set for every half a second
    // The step function is invoked
    // Calls the move function
    // The snakes moves
    // Then, we check for collision?
    // @ DOM Level:
    // Each <li> items does not have any "data" attribute
    //

    const validMove = this.board.snake.move();
    if (validMove) {
      this.renderBoard();
    } else {
      // const $lists = $("li");
      // $lists.removeClass("snake");
      alert("You lose!")
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
