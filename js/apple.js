const Coord = require('./coord.js');

class Apple {
  constructor() {
    this.coord = new Coord([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
  }
}

module.exports = Apple;
