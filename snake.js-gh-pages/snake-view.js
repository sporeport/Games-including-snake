(function () {
  if (window.SnakeGame === undefined) {
    window.SnakeGame = {}
  }

  var View = window.SnakeGame.View = function($el){
    this.board = new window.SnakeGame.Board();
    this.snake = this.board.snake;
    this.boardSize = this.board.BOARD_SIZE;

    this.lastSegment = null;
    this.apple = null;

    this.$el = $el;
    this.$grid = this.$el.find(".grid");

    this.bindListener();
    this.buildCanvasBoard();
    this.canvasRender();
    this.startGame();
  }

  View.prototype.buildCanvasBoard = function () {
    for (var i = 0; i < this.boardSize * this.boardSize; i++){
      this.$grid.append("<section class='cell'>" + i + "</section>");
    }
  }

  View.prototype.canvasRender = function () {
    var snakeSegs = this.snake.segments;

    if (this.lastSegment != null) {
      this.$grid.find(".cell").eq(this.lastSegment).removeClass("snake");
    }

    for (var i = 0; i < snakeSegs.length; i++) {
      var pos = snakeSegs[i].pos;
      var child = (pos[0] * (this.boardSize)) + pos[1];

      this.$grid.find(".cell").eq(child).addClass("snake");

      if (i === snakeSegs.length - 1) {
        this.lastSegment = child;
      }
    }
  };

  View.prototype.startGame = function () {
    this.plantApple();
    this.step();
  };

  View.prototype.plantApple = function () {
    var planted = false, taken = false;
    var snakeSegments = this.snake.segments;

    while (planted === false) {
      var row = Math.floor(Math.random() * 10);
      var col = Math.floor(Math.random() * 10);

      for (var i = 0; i < snakeSegments.length; i++) {
        if (snakeSegments[i].pos[0] === row ||
            snakeSegments[i].pos[1] === col) {
          taken = true;
        }
      }

      if (taken === false) {
        this.apple = [row, col];
        planted = true;
      }
    }
    var child = (row * (this.boardSize)) + col;

    this.$grid.find(".cell").eq(child).addClass("apple");
  };

  View.prototype.checkApple = function (coord) {
    if (coord[0] === this.apple[0] && coord[1] === this.apple[1]) {
      return true;
    }

    return false;
  };

  View.prototype.step = function () {
    window.setTimeout(function () {
      var apple = false;

      if (this.board.checkValidMove()) {
        if (this.checkApple(this.snake.nextMove())) {
          apple = true;
          this.removeAndAddApple();
        }

        this.snake.move(apple);
        this.canvasRender();
        console.log("Snake Head: ", this.snake.segments[0].pos)

        this.step();
      } else {
        alert("Game Over");
      };
    }.bind(this), 1000);
  };

  View.prototype.removeAndAddApple = function () {
    var child = (this.apple[0] * (this.boardSize)) + this.apple[1];

    this.$grid.find(".cell").eq(child).removeClass("apple");
    this.plantApple();
  }

  View.prototype.bindListener = function () {
    this.$el.on("keydown", function(event){
      this.handleKeyEvent(event);
    }.bind(this))
  };

  View.prototype.handleKeyEvent = function (event) {
    switch (event.keyCode) {
      case 38:
        this.snake.turn("N")
        break;
      case 39:
        this.snake.turn("E")
        break;
      case 40:
        this.snake.turn("S")
        break;
      case 37:
        this.snake.turn("W")
        break;
    }
  };

})();
