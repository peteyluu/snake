const Coord = require('./coord.js');

class Apple {
  constructor(dim) {
    this.coord = new Coord(
      (Math.floor(Math.random() * dim)), (Math.floor(Math.random() * dim))
    );
  }
}

module.exports = Apple;
