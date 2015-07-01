(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game
    this.$el = $el
    this.setup();
    this.bindEvents();
    this.$from = null;
    this.$to = null;
  }

  View.prototype.setup = function () {
    var html = "<section class=\"stack\" data-stack='{ \"id\": 0}'>";
    html += "<figure class=\"disk top\" id=\"small\"></figure>";
    html += "<figure class=\"disk middle\" id=\"medium\"></figure>";
    html += "<figure class=\"disk bottom\" id=\"large\"></figure>";
    html += "</section>";
    html += "<section class=\"stack\" data-stack='{ \"id\": 1}'></section>";
    html += "<section class=\"stack\" data-stack='{ \"id\": 2}'></section>";

    this.$el.html(html);
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", ".stack", function (event) {
      var target = event.currentTarget;
      var $target = $(target);

      if (this.$from === null) {
        this.$from = $target;
        this.$from.addClass("selected");
      } else if (this.$to === null) {
        this.$to = $target;
        this.makeMove();
        this.$from.removeClass("selected");
        this.$from = null;
        this.$to = null;
      }

    }.bind(this));

  };

  View.prototype.makeMove = function () {

    var fromStack = this.$from.data("stack");
    var toStack = this.$to.data("stack");

    if (this.game.isValidMove(fromStack.id, toStack.id)){
      var $disk = this.$from.find(".disk:first-child");

      this.$to.prepend($disk);
      this.adjustBottom($disk);

      this.game.move(fromStack.id, toStack.id);
      if (this.game.isWon()){
        this.$el.append("<strong>You won, lucky I guess!</strong>");
      }
    }
  };

  View.prototype.adjustBottom = function ($disk) {
    var diskAmount = this.$to.find(".disk").length;

    $disk.removeClass("top middle bottom");

    switch (diskAmount){
      case 1:
        $disk.addClass("bottom");
        break;
      case 2:
        $disk.addClass("middle");
        break;
      case 3:
        $disk.addClass("top");
        break;
    };
  };


})();


// (function () {
//   if (typeof TTT === "undefined") {
//     window.TTT = {};
//   }
//
//   var View = TTT.View = function (game, $el) {
//     this.game = game;
//     this.$el = $el;
//     this.setupBoard();
//     this.bindEvents();
//   };
//
//   View.prototype.bindEvents = function () {
//     this.$el.find(".grid").on("click", "li", function (event) {
//       var target = event.currentTarget;
//
//       var $target = $(target);
//       console.log($target);
//
//       if ($target.hasClass("inactive")) {
//         this.makeMove($target);
//         console.log($target);
//       };
//     }.bind(this));
//   };
//
//   View.prototype.makeMove = function ($square) {
//     $square.removeClass("inactive");
//
//     var id = $square.data("square");
//     var currentPlayer = this.game.currentPlayer;
//
//     $square.addClass(currentPlayer);
//     this.game.playMove(id.pos);
//
//     if (this.game.isOver()){
//
//       var winner = this.game.winner() === null ? "nobody" : this.game.winner();
//
//       this.$el.find("p").html("The game is over. " + winner + " wins!");
//       this.$el.find(".inactive").removeClass("inactive");
//     }
//
//   };
//
//   View.prototype.setupBoard = function () {
//     var html = "<h1>Tic Tac Toe</h1>";
//     html += "<ul class=\"grid group\">";
//
//     for (var i = 0; i < 3; i++) {
//       for (var j = 0; j < 3; j++) {
//         var pos = JSON.stringify([i, j]);
//         html += "<li data-square='{ \"pos\": " + pos + " }'></li>";
//       }
//     }
//
//     html += "</ul>";
//     html += "<p></p>";
//     this.$el.append(html);
//     this.$el.find(".grid > li").addClass("inactive");
//   };
// })();
