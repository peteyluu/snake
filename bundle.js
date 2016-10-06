/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeView = __webpack_require__(1);

	$( () => {
	  const rootEl = $('.snake-game');
	  new SnakeView(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);

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

	  newApple() {
	    this.apples.push(new Apple(this.dim));
	  }
	}

	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }

	  plus(otherCoord) {
	    return new Coord(this.x += otherCoord[0], this.y += otherCoord[1]);
	  }

	  equals(otherCoord) {
	    return (this.x === otherCoord.x) && (this.y === otherCoord.y);
	  }

	  isOpposite(otherCoord) {
	    return (this.x === (-1 * otherCoord.x)) && (this.y === (-1 * otherCoord.y));
	  }
	}

	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);

	class Apple {
	  constructor(dim) {
	    this.coord = new Coord(
	      (Math.floor(Math.random() * dim)), (Math.floor(Math.random() * dim))
	    );
	  }
	}

	module.exports = Apple;


/***/ }
/******/ ]);