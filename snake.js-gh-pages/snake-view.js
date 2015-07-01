(function () {
  if (window.SnakeGame === undefined) {
    window.SnakeGame = {}
  }

  var View = window.SnakeGame.View = function($el){
    this.board = new window.SnakeGame.Board();
    this.$el = $el;
    this.bindListener();
    this.board.render();
  }

  View.prototype.bindListener = function () {
    this.$el.on("keydown", function(event){
      this.handleKeyEvent(event);
    }.bind(this))
  };

  View.prototype.handleKeyEvent = function (event) {
    switch (event.keyCode) {
      case 38:
        this.board.snake.turn("N")
        break;
      case 39:
        this.board.snake.turn("E")
        break;
      case 40:
        this.board.snake.turn("S")
        break;
      case 37:
        this.board.snake.turn("W")
        break;
    };
    this.board.snake.move()
    this.board.render()
    console.log("\n")
  };

})();
