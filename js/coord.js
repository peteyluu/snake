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
