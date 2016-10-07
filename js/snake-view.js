const Board = require('./board.js');

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setUpGrid();
    this.bindEvents();
    this.intervalId = window.setInterval(this.step.bind(this), 100);
  }

  setUpGrid() {
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
          const currCoordApple = this.board.getApple();
          if (currCoordApple.x === i && currCoordApple.y === j) {
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
    this.board.snake.turn(SnakeView.CODES[event.keyCode]);
  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
    this.render();
  }

  render() {
    const $snake = $(".snake-game");
    $snake.children().remove();
    this.setUpGrid();
  }
}

SnakeView.CODES = {
  87: "N",
  65: "W",
  68: "E",
  83: "S"
}

module.exports = SnakeView;
