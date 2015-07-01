(function () {
  if (window.SnakeGame === undefined) {
    window.SnakeGame = {}
  }



  var Snake = window.SnakeGame.Snake = function () {
    this.segments = [new Coord([4, 5], this), new Coord([5,5], this)];
    this.dir = "N";
  }

  var DIR_KEY = { "N": [-1, 0],
              "S": [1, 0],
              "E": [0, 1],
              "W": [0, -1] }


  Snake.prototype.move = function () {
    var new_seg = []
    new_seg[0] = this.segments[0].pos[0] + DIR_KEY[this.dir][0]
    new_seg[1] = this.segments[0].pos[1] + DIR_KEY[this.dir][1]

    this.segments.unshift(new Coord(new_seg, this))
    this.segments.pop()
  }

  Snake.prototype.turn = function (direction) {
    if (this.segments[0].isOpposite(direction) === false){
      this.dir = direction;
    }
  };



  var Coord = function (coords, snake) {
    this.pos = coords;
    this.snake = snake;
  };

  Coord.prototype.equals = function (otherCoord){
    return this.pos[0] === otherCoord.pos[0] &&
           this.pos[1] === otherCoord.pos[1];
  };

  Coord.prototype.isOpposite = function (direction) {
    var dir = DIR_KEY[direction];

    var seg = [];

    seg[0] = this.snake.segments[0].pos[0] + dir[0];
    seg[1] = this.snake.segments[0].pos[1] + dir[1];

    var seg = new Coord(seg, this.snake);

    if (seg.equals(this.snake.segments[1])) {
      return true;
    } else {
      return false;
    }
  };

})();
