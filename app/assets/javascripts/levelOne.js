var Heist = Heist || {};


Heist.LevelOne = function(game) {
  this.player;
  this.totalLives;
  this.health = 3;
  this.platforms;
  this.cursors
  this.x;
  this.g;
  this.stars;
  this.diamonds;
  this.extractLocation;
  this.score = 0;
  this.totalScore = 0;
  this.scoreText;
  this.promptText;
  this.promptText2;
  this.style1 = { font: '25px Nothing You Could Do', fill: '#00FFFF' };
  this.style2 = { font: '25px Nothing You Could Do', fill: '#00FFFF', align: 'centerY' };
  this.opaqimg;
  this.timer;
  this.timerEvent;
  this.text;
  this.maxPossibleScore;
  this.badguy;
  this.cop;
  this.count
  this.outerWall;
  this.outerwalls;
  this.lasers;

  //Weight limit variable
  this.maxWeight = 0;
  this.playerCarryValue = 0;
};

Heist.LevelOne.prototype = {
  create: function () {
    //centre the game on the browser page
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();


      this.timer = this.time.create();

      // // Start the timer!
      this.timer.start();

      //  We're going to be using physics, so enable the Arcade Physics system
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.startSystem(Phaser.Physics.BODY);

      //  Background sprite and bounds for the game
      this.add.tileSprite(0, 0, 1920, 1920, 'background');
      this.world.setBounds(0, 0, 1920, 1920);

      //  The platforms group contains the walls to contain the sprite
      platforms = this.add.group();

      //  We will enable physics for any object that is created in this group
      platforms.enableBody = true;

      // Game walls in via a loop function
      this.outerWall = this.game.add.group();
      this.outerWall.enableBody = true;
      this.innerWall = this.game.add.group();
      this.innerWall.enableBody = true;
      this.kWall = this.game.add.group();
      this.kWall.enableBody = true;
      this.diamonds = this.game.add.group();
      this.diamonds.enableBody = true;
      this.cops = this.game.add.group();
      this.cops.enableBody = true;

      var level = [
          '# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #',
          '                                                                                     ',
          '#        *       *                                                                  #',
          '         *       B                                                                   ',
          '#        *       B                                                                  #',
          '         *       B                                                                   ',
          '#        *       B                                ****************************    **#',
          '         *       *                                *                                  ',
          '#        *       *                                *                                 #',
          '         a       *                                *                                  ',
          '#        a       *                                *                                 #',
          '         a       *                                *                                  ',
          '#        a       *                                *                                 #',
          '         *       **bbbb******************cccc******             **************dddd** ',
          '#        *       B                                C                         *       #',
          '         *       B                                C                         *        ',
          '#        *       B                                C                         *       #',
          '         *       B                                C                         *        ',
          '#        *       *                                *******eeee*********      *       #',
          '         *       *                                *           *             *        ',
          '# **    **       *                                *           *             *       #',
          '         *       *      *********llll**************           *             *        ',
          '#        *       *      *     *                   *           E             *       #',
          '         *       *      *     *                   *           E             ***DDDD* ',
          '#        *       b      *     *                   *           E                     #',
          '         *       b      *     *                   *           E                      ',
          '#        *       b      *     *        *          *           *                     #',
          '         *       b      *     *        *          *           *                      ',
          '#        A       *      *              *          *           *                     #',
          '         A       *      L              *          *           *                      ',
          '#        A       *      L              *          *           *                     #',
          '         A       *      L     *        *    ^     *           *                      ',
          '#        *       *      L     *        *   ^^^    *           *                     #',
          '         *       *      *     *        *  ^^^^^   *           *                      ',
          '#        *       *      *******        ************           *                     #',
          '         *       *            *                               *                      ',
          '#        *       *            *                               *                     #',
          '         *       *            *                               *                      ',
          '#        *       *            *                               g                     #',
          '  ****************            *                               g                      ',
          '#                             *                               g                     #',
          '                              *                               g           ***FFFF*** ',
          '#                             *                               *           *         #',
          '                              *                               *           *          ',
          '# *****hhhh*******            *                               *           *         #',
          '                 *            G                               *           *          ',
          '#                *            G                               *           *         #',
          '                 *            G                               *           f          ',
          '#                *            G                               *           f         #',
          '                 *            *                               *           f          ',
          '#                *            *                               *           f         #',
          '                 *            *                               *           *          ',
          '#                *            *                               *           *         #',
          '                 *            *********************************           *          ',
          '#                *                                                        *         #',
          '                 *                                                        *          ',
          '#                *                                                        *         #',
          '                 H                                                        *          ',
          '# ********       H                                                        *         #',
          '         *       H                                                        *          ',
          '#        *       H                                                        *         #',
          '         *       *                                                        *          ',
          '#        *       *                                                        *         #',
          '         *       *                                                        *          ',
          '#        *       *                                                        *         #',
          '         *       *                                                        *          ',
          '#        *       ****************                                         *         #',
          '         *       *                                         ****************          ',
          '#        *       *                                         *              *         #',
          '                 *                                         *              *          ',
          '#                *                                         *              *         #',
          '                 *                                         *              K          ',
          '#                *                                         *              K         #',
          '         *       *                                         *              K          ',
          '#        *       *                                         k              K         #',
          '         *       *                                         k              *          ',
          '#        *       *                                         k              *         #',
          '         *       *                                         k              *          ',
          '# # # # # # # # # # # # # # # # # # # #         # # # # # # # # # # # # # # # # # # #',
          '                                                                                     ',
          '                                      #         #,                                   ',
          '                                                                                     ',
          '                                      #         #,                                   '
      ];


        var isLetter = function( c ) {
          return c.toLowerCase() != c.toUpperCase();
        }

        // wallDrawLookup stores a hash of keys which are letters of the alphabet, corresponding to wall groups
        // Uppercase and lowercase letter belong to the same group but are mutually exclusive
        // i.e. if the 'r' group is drawn, the 'R' group should not be drawn
        var wallDrawLookup = {};

        // testWallBlock checks whether a coin toss has been made for this letter, and if not does a coin
        // toss and remembers the result, and also toggles the toss value for the opposite-cased same letter
        var testWallBlock = function ( letter ) {

          if( typeof wallDrawLookup[letter] == 'undefined' ) {

              // first time seeing this key, so do coin toss, and save result
              var toss = Math.random() < 0.5;
              var oppositeGroup;

              // remember coin toss for this letter
              wallDrawLookup[letter] = toss;

              if( letter === letter.toLowerCase() ){
                // letter is lowercase, so oppositeGroup must be the uppercase version
                oppositeGroup = letter.toUpperCase();
              } else {
                // letter is uppercase, so oppositeGroup must be the lowercase version
                oppositeGroup = letter.toLowerCase();
              }

              wallDrawLookup[oppositeGroup] = !toss;
          }
          // else: if the key is already defined, we just return it below

          return wallDrawLookup[letter];
        };

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create exterior bank walls and add the to the 'walls' group
                if (level[i][j] == '#') {
                    var wall = this.outerWall.create(30+20*j, 30+20*i, 'outerWall');
                    wall.body.immovable = true;
                }
                // Create interior bank walls and add them to the 'walls' group
                if (level[i][j] == '*') {
                    var wall = this.innerWall.create(30+20*j, 30+20*i, 'innerWall');
                    wall.body.immovable = true;
                }
                if (level [i][j] == '^'){
                    var diamonds = this.diamonds.create(i * 70, 1550, 'diamonds');
                    diamonds.body.immovable = false;
                }

                // Check if current cell is an alphabet letter, and decide whether to draw the
                // wall for that letter group
                if (isLetter( level[i][j] ) && testWallBlock( level[i][j] )){
                    // draw the wall section if our lookup function returns true
                    var wall = this.kWall.create(30+20*j, 30+20*i, 'innerWall');
                     wall.body.immovable = true;
                }// if isLetter
            }// for j
        }// for i

      this.outerWall.scale.setTo(1,1);

      opaqimg = this.add.sprite(1000, 600, 'opacity');
      opaqimg.fixedToCamera = true;
      opaqimg.cameraOffset.setTo(0, 0);

      keyimg = this.add.sprite(150, 95, 'key');
      keyimg.fixedToCamera = true;
      keyimg.cameraOffset.setTo(20, 20);


      var intervalID = window.setInterval(myCallback, 500);

      function myCallback() {
        // console.log('hello');
      }

      // Code for guard(s) TODO: Get sprites to work. Animate.
      this.badguy = this.game.add.group();
      this.badguy = this.add.sprite(400, 1500, 'guard');
      this.physics.arcade.enable(this.badguy);
      this.badguy.body.collideWorldBounds = true;
      this.badguy.animations.add('walk');
      this.badguy.animations.play('walk', 8, true)

      // this.cop = this.add.sprite(600, 1500, 'cop');
      // this.physics.arcade.enable(this.cop);
      // this.cop.body.collideWorldBounds = true;
      // this.cop.anchor.setTo(0.5, 0.5);
      // // this.cop.body.velocity.x=120;
      // // this.badguy.animations.add('moveLeft', [0, 1], 4, true )
      // // this.badguy.animations.add('moveRight', [2, 3], 4, true )
      // this.cop.animations.add('walk');
      // // this.cop.animations.play('walk', 8, true)


      // The player and its settings
      player = this.add.sprite(this.world.centerX, this.world.height - 390, 'dude')
      // player.body.setSize(20, 30, 0, 0)

      //  We need to enable physics on the player
      this.physics.arcade.enable(player);

      // player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;

      //  Our two animations, walking left and right.
      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);

      //  Our controls.
      cursors = this.input.keyboard.createCursorKeys();
      x = this.input.keyboard.addKey(Phaser.Keyboard.X);
      v = this.input.keyboard.addKey(Phaser.Keyboard.V);
      s = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      g = this.input.keyboard.addKey(Phaser.Keyboard.G);

      this.heart = this.add.sprite(this.world.centerX, this.world.height - 450, 'heart')
      this.physics.arcade.enable(this.heart);
      this.heart.body.collideWorldBounds = true;


      // stars and diamonds added to group.
      stars = this.add.group();
      diamonds = this.add.group();
      cops = this.add.group();


      //  We will enable physics for any star that is created in this group
      stars.enableBody = true;
      diamonds.enableBody = true;
      cops.enableBody = true;

      //  Here we'll create 12 of them evenly spaced apart
      for (var i = 1; i < 13; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 1500, 'star');

      }

      for (var i = 1; i < 4; i++) {
        var cop = cops.create(i * 150, 1500, 'cop');
        cop.body.velocity.x = 120;
      }



      // this.cop = this.add.sprite(600, 1500, 'cop');
      // this.physics.arcade.enable(this.cop);
      // this.cop.body.collideWorldBounds = true;
      // this.cop.anchor.setTo(0.5, 0.5);
      // // this.cop.body.velocity.x=120;
      // // this.badguy.animations.add('moveLeft', [0, 1], 4, true )
      // // this.badguy.animations.add('moveRight', [2, 3], 4, true )
      // this.cop.animations.add('walk');
      // // this.cop.animations.play('walk', 8, true)




      //
      // for (var i = 1; i < 7; i++) {
      //     //  Create a star inside of the 'stars' group
      //     var diamond = diamonds.create(i * 70, 1550, 'diamond');
      //
      // }

      // Defines maximum possible score, please put all new 'diamonds', 'stars' etc. above
      // Used to define end of game and determine final score with timer bonus etc.
      // Meggan and Shaila know what's goin on
      // Don't delete
      maxPossibleScore = ((diamonds.length * 50) + (stars.length * 10));

      //  The current level score controls
      scoreText = this.add.text(100, 67, '$0', this.style1);
      scoreText.fixedToCamera = true;

      // promptText variable
      promptText = this.add.text(480, 506, 'Press (key) to (action)', this.style2);
      promptText.anchor.setTo(0.5, 0.5);
      promptText.fixedToCamera = true;

      //PrompteText2
      promptText2 = this.add.text(480, 520, 'PRINT ME', this.style2);
      promptText2.anchor.setTo(0.5, 0.5);
      promptText2.fixedToCamera = true;

      // NotificationText varaible
      notificationText = this.add.text(480, 480, '', this.style2);
      notificationText.anchor.setTo(0.5, 0.5);
      notificationText.fixedToCamera = true;

      // timerText variable to display the time
      timerText = this.add.text(900, 20, '', this.style1);
      timerText.fixedToCamera = true;

      this.camera.follow(player);
      this.camera.deadzone = new Phaser.Rectangle(450, 250, 10, 10);

      // Appearing Text
      // var fadeText1 = game.time.events.add(2000, function() {    game.add.tween("myTex").to({y: 0}, 1500, Phaser.Easing.Linear.None, true); game.add.tween("myText").to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
      // fadeText1.fixedToCamera = true;
      // fadeText2.fixedToCamera = true;

      extractLocation = this.add.group();
      extractLocation.enableBody = true;
      // extractLocation.body.immovable = true;
      var extract = extractLocation.create(this.world.centerX + 100, this.world.height - 390, 'firstaid')

      lasers = this.game.add.group();
      lasers.enableBody = true;

      for (var i = 1; i < 13; i++) {

        var laser = lasers.create(i * 30, 1500, 'laser');
        laser.anchor.setTo(0.5, 0.5);
        laser.body.immovable = true
        laser.angle = i++;
      }

      this.physics.enable(lasers, Phaser.Physics.ARCADE);
      this.physics.arcade.enable([player, lasers]);

      this.clearText(promptText);
      // this.clearText(promptText2);
      this.fadeText(notificationText);

      var spawnTimer = Math.round(this.time.totalElapsedSeconds());

      if (spawnTimer % 15 === 0) {
        this.createBadGuy(480, 550);
      }


  },

  update: function () {

      var timeYay = this.time.now

      // var updateTime = function() {
        // this.paused = true;
        // console.log(this.timer.duration * 0.001 + " seconds left on timer");
      // }

       //  Collision for things.
      this.physics.arcade.collide(player, platforms);
      this.physics.arcade.collide(player, this.innerWall);
      this.physics.arcade.collide(player, this.outerWall);
      this.physics.arcade.collide(player, this.badguy);
      this.physics.arcade.collide(player, cops);
      this.physics.arcade.collide(cops, this.innerWall, this.copHitWallInner);
      this.physics.arcade.collide(cops, this.outerWall, this.copHitWallOuter);
      this.physics.arcade.collide(stars, platforms);
      this.physics.arcade.collide(this.heart, platforms);


      //this.physics.arcade.collide(diamonds, platforms);
      this.physics.arcade.collide(this.badguy, platforms);
      this.physics.arcade.collide(this.cop, platforms);
      // random generated walls
      this.physics.arcade.collide(player, this.kWall);
      // add diamonds to be used in the map as ^
      this.physics.arcade.collide(this.diamonds, platforms);
      this.physics.arcade.collide(lasers, player);

      // this.physics.arcade.collide(heart, player);


      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      this.physics.arcade.overlap(player, stars, this.collectStar, null, this);
      this.physics.arcade.overlap(player, this.diamonds, this.collectDiamond, null, this);
      //this.physics.arcade.overlap(player, diamonds, this.collectDiamond, null, this);
      this.physics.arcade.overlap(player, this.heart, this.heartPrompt, null, this);


      var overlap = this.physics.arcade.overlap(player, this.cop, this.moveCop, null, this)
      var extrct = this.physics.arcade.overlap(player, extractLocation, this.dropOff, null, this)
      var heartOverlap = this.physics.arcade.overlap(player, this.heart, this.dropOffHeart, null, this)


      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;


      if (cursors.left.isDown) {
          //  Move to the left
          player.body.velocity.x = -250;

          player.animations.play('left');
      } else if (cursors.right.isDown) {
          //  Move to the right
          player.body.velocity.x = 250;

          player.animations.play('right');
      } else {
          //  Stand still
          player.animations.stop();

          player.frame = 4;
      }

      if (cursors.up.isDown) {
          player.body.velocity.y = -250;
      } else if (cursors.down.isDown) {
          player.body.velocity.y = 250;
      }

      // Diagonal controller ///////////////////////////////////////////
      // if ( cursors.left.isDown && cursors.down.isDown ) {
      //   player.body.velocity.x = -550;
      //   player.body.velocity.y = 550;
      // } else if ( cursors.right.isDown && cursors.down.isDown ) {
      //   player.body.velocity.x = 550;
      //   player.body.velocity.y = 550;
      // } else if ( cursors.left.isDown && cursors.up.isDown ) {
      //   player.body.velocity.x = -550;
      //   player.body.velocity.y = -550;
      // } else if ( cursors.right.isDown && cursors.up.isDown ) {
      //   player.body.velocity.x = 550;
      //   player.body.velocity.y = -550;
      //   player.animations.play('upRight');
      // } else {
      //       //  Stand still
      //   player.animations.stop();
      //
      //   player.frame = 4;
      // }


      // Guard takeout action.
      if (overlap === true && s.isDown) {
          this.killCop();
      }

      if (extrct === true && x.isDown) {
        this.pressedV();
        // promptText2.text = "YOU GOT AWAY"
        Heist.levelScore += this.score;
        Heist.totalScore += this.score;
        this.paused = true;
        this.state.start('LevelOneSummary')
        this.state.add('LevelTwo', Heist.LevelTwo)

        // Capture time:
        //   var printTime = Math.round(this.time.totalElapsedSeconds());
        //   someVariable = printTime;
      }
      if (extrct === true && v.isDown) {
        if (this.playerCarryValue > 0 && this.maxWeight > 0) {
          this.printSecureMessage();
          this.pressedV();
          this.pause = this.time.now + 1200
        } else if (this.pause < this.time.now && this.score === maxPossibleScore) {
          this.getAll();
        } else if (this.pause < this.time.now && this.maxWeight === 0) {
          notificationText.text = "You don't have anything to secure."
          this.fadeText(notificationText)
          return;
        }
      }

      if (heartOverlap === true && g.isDown) {
        lasers.destroy();
        notificationText.text = "You disabled all lasers."
        this.fadeText(notificationText)
        return;
        }


      if (g.isDown) {
        this.health =- 1
      }

      if (this.health < 1) {
        if ( Heist.playerLives === 0){
          this.state.add('Ded', Heist.Ded)
          this.state.start('Ded')

        } else {
          this.state.add('LevelOneRetry', Heist.LevelOneRetry)
          this.state.start('LevelOneRetry')
          Heist.playerLives -= 1
        }
      }

  },


  render: function () {

    var secondsElapsed = Math.round(this.time.totalElapsedSeconds());

      // var timeInSeconds = (Math.round(timeYay / 1000)).toString()
      var minutes = Math.round(secondsElapsed / 60);
      var seconds = Math.round(secondsElapsed % 60);

      // if (this.timer.running) {
      //   promptText2.text = Math.round(secondsElapsed)
      // }

      if (secondsElapsed < 10 ) {
        promptText2.text = "0:0" + secondsElapsed;
      } else if ( secondsElapsed < 60) {
        promptText2.text = "0:" + secondsElapsed;
      } else if ( secondsElapsed > 60 && seconds < 10) {
        promptText2.text = minutes + ":0" + seconds;
      } else if ( secondsElapsed > 60 && seconds >= 10) {
        promptText2.text = minutes + ":" + seconds;
      }
    // if (timer.running) {
    //     timerText.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
    // }
    // else {
    //   var endGameTime = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
    //   timerText.text = "Done!" + endGameTime ;
    //
    //   //this.timeOut();
    //   return this.timeOut();
    //
    //   //TODO  Make the game end.
    // }

    // For camera debugging only. Plz don't delete.
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteCoords(player, 32, 500);
  },


  endTimer: function () {
    // Stop the timer when the delayed event triggers
    timer.stop();
  },
  formatTime: function (s) {
    // Convert into seconds.
    this.minutes = "0" + Math.floor(s/ 60);
    this.seconds = "0" + Math.floor(s - minutes * 60);
    return this.minutes.substr(-2) + ":" + this.seconds.substr(-2)
  },
  dropOff: function(player, extract) {
    promptText.text = 'Press V to secure money.';
    this.clearText(promptText);
  },

  dropOffHeart: function(player, extractHeart) {
    promptText.text = 'Press SPACEBAR to disable lasers.';
    this.clearText(promptText);
  },

  pressedV: function() {
    this.score += this.playerCarryValue;
    this.playerCarryValue = 0;
    this.maxWeight = 0;
    scoreText.text = '$' + this.score;
  },
  printSecureMessage: function () {
    this.fadeText(notificationText)
    notificationText.text = "You secured $" + this.playerCarryValue
  },
  collectStar: function (player, star) {
    if (this.maxWeight <= 11) {
      this.maxWeight += 1;
      console.log(this.maxWeight);
      // Removes the star from the screen
      star.kill();

      this.playerCarryValue += 10;
      this.fadeText(promptText);
      promptText.text = '+$10'
      this.getAll();
    } else {
      this.fadeText(notificationText);
      notificationText.text = 'You are already carrying too much.'
      return;
    }

  },

  collectDiamond: function(player, diamond) {
    if (this.maxWeight <= 10) {
      this.maxWeight += 2;
      console.log(this.maxWeight);
      // Removes the diamond from the screen
      diamond.kill();

      this.playerCarryValue += 50
      this.fadeText(promptText);
      promptText.text = '+$50'
      this.getAll();
    } else {
      this.fadeText(notificationText);
      notificationText.text = 'You are already carrying too much.'
      return;
    }
  },
  createBadGuy: function(x, y) {
    // this.badguy.create(x, y, 'guard');
  },

  killCop: function(player, cop) {
      // Removes the cop from the screen
      this.cop.kill();

      //  Add and update the score
      this.fadeText(promptText);
      promptText.text = 'Fuck da police!'
      // this.getAll();
  },
  moveCop: function(player, cop) {

    // Removes the cop from the screen
    this.cop.animations.play('walk', 8, true)

    //  Add and update the score
    this.fadeText(promptText);
    promptText.text = 'He is gonna get ya!'
    // this.getAll();
  },

  copHitWallInner: function(cop, innerWall){
    cop.body.velocity.x = (cop.body.velocity.x + 1) * -120;
  },

  copHitWallOuter: function(cop, outerWall){
    cop.body.velocity.x*= -1*(120);
  },

  fadeText: function(textName) {
    textName.alpha = 0;
    this.add.tween(textName).from( { alpha: 1 }, 500, Phaser.Easing.easeOut, true, 800);
  },

  clearText: function(textName) {
    textName.alpha = 0;
    this.add.tween(textName).from( { alpha: 1 }, 200, Phaser.Easing.default, true, 100);
  },

   timeOut: function () {
    promptText.alpha = 1;
    promptText.text = "TIME UP!";
  },
  getAll: function() {
    if (this.score === maxPossibleScore) {
        promptText.text = "You've collected all the money, now get out!"
        this.fadeText(promptText);
      }
  },

  killLasers: function(player, lasers) {
    console.log('this should kill lasers');
  //  this.paths.kill();
  },

  heartPrompt: function(player, heart) {
    console.log('you are over the heart');
  }

}; // End of LevelOne
