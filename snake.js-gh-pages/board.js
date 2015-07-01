(function () {
  if (window.SnakeGame === undefined) {
    window.SnakeGame = {}
  }

  var Board = window.SnakeGame.Board = function(){
    this.snake = new SnakeGame.Snake();
    this.grid = this.generateGrid();
  };

  Board.prototype.generateGrid = function(){
    var tempGrid = [];

    for (var i = 0; i < 10; i++){
      var temp = [];
      for (var j = 0; j < 10; j++){
        temp.push(".");
      }

      tempGrid.push(temp);
    }

    return tempGrid;
  };

  Board.prototype.render = function () {
    this.grid = this.generateGrid()

    this.snake.segments.forEach(function(segment){
      var pos = segment.pos;
      this.grid[pos[0]][pos[1]] = 'S';
    }.bind(this))

    for (var i = 0; i < 10; i++){
      console.log(i, JSON.stringify(this.grid[i]));
    }
  };


})();
