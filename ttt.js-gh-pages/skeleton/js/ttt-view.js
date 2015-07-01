(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.find(".grid").on("click", "li", function (event) {
      var target = event.currentTarget;

      var $target = $(target);
      console.log($target);

      if ($target.hasClass("inactive")) {
        this.makeMove($target);
        console.log($target);
      };
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    $square.removeClass("inactive");

    var id = $square.data("square");
    var currentPlayer = this.game.currentPlayer;

    $square.addClass(currentPlayer);
    this.game.playMove(id.pos);

    if (this.game.isOver()){

      var winner = this.game.winner() === null ? "nobody" : this.game.winner();

      this.$el.find("p").html("The game is over. " + winner + " wins!");
      this.$el.find(".inactive").removeClass("inactive");
    }

  };

  View.prototype.setupBoard = function () {
    var html = "<h1>Tic Tac Toe</h1>";
    html += "<ul class=\"grid group\">";

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var pos = JSON.stringify([i, j]);
        html += "<li data-square='{ \"pos\": " + pos + " }'></li>";
      }
    }

    html += "</ul>";
    html += "<p></p>";
    this.$el.append(html);
    this.$el.find(".grid > li").addClass("inactive");
  };
})();
