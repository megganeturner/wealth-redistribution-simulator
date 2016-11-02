var Heist = Heist || {};

Heist.Ded = function (game) {
};


var startButton;
Heist.Ded.prototype = {

  create: function () {
    // Align canvas to middle.
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();

    var background = this.add.tileSprite(0, 0, 1920, 1920, 'levelTwoBackground');
    startButton = this.add.sprite(600, 400, 'button') // , this.startGame(), this, 1, 0, 2);
    startButton.inputEnabled = true;
    startButton.input.pixelPerfectClick = true;
    startButton.events.onInputDown.add(this.clicked, this);
    startButton.anchor.setTo(0.5, 0.5);

    var ded = this.add.text(100, 97, 'GAME OVER', { font: '25px Nothing You Could Do', fill: '#00FFFF' });
    ded.fixedToCamera = true;


      },

      clicked: function (pointer) {
        this.state.add('MainMenu', Heist.MainMenu)
        this.state.start('MainMenu')
        Heist.levelScore = 0;
        Heist.playerLives = 3;

      }

    };


      // this.state.add('Boot', mainMenu.Boot);
      // game.state.start('Boot');