var Game = function(game) {};

// create a fly mob
EnemyMob = function(game,x,y) {

  var mob = enemyGroup.create(x,y, 'mob');
  mob.anchor.setTo(0.5,0.5);
  mob.name = 'flymob';
  game.physics.enable(mob, Phaser.Physics.ARCADE);
  mob.body.immovable = true;
  mob.body.collideWorldBounds = true;
  mob.body.setSize(48, 48, 0, 0);
  mob.scale.x = 0.9;
    mob.scale.y = 0.9;
  mob.body.allowGravity = false;
  mob.animations.add('monster',[2,3],10,true);
  mob.animations.play('monster');
    mob.healthBar = new HealthBar(game, {x: mob.body.x + 30, y: mob.body.y - 10});
  mob.enemyHP = 3;
  mob.healthValue = 100;

  mob.mobTween = game.add.tween(mob).to({
    // 100 veut dire 100 pixel
    y: mob.y + 100

  }, 2000,'Linear',true,0,100,true);
}

// create a land mob
EnemyMob2 = function(game,x,y) {

  var mob2 = enemyGroup2.create(x,y, 'mob2');
  mob2.anchor.setTo(0.5,0.5);
  mob2.name = 'mobland';
  game.physics.enable(mob2, Phaser.Physics.ARCADE);
  mob2.body.immovable = true;
  mob2.body.collideWorldBounds = true;
  mob2.body.setSize(48, 48, 0, 0);
  mob2.scale.x = 0.7;
    mob2.scale.y = 0.7;
  mob2.body.allowGravity = false;
  mob2.animations.add('monster2',[2,3],5,true);
  mob2.animations.play('monster2');
    mob2.healthBar = new HealthBar(game, {x: mob2.body.x + 30, y: mob2.body.y - 10});

    mob2.mobTween = game.add.tween(mob2).to({

    x: mob2.x + 75

  }, 2000,'Linear',true,0,100,true);

  mob2.enemyHP = 2;
  mob2.healthValue = 100;
}

// jewel bonus speed
addTempoJump = function(game,x,y){

    var bJump = bJumpS.create(x,y,'bJump');
    bJump.anchor.setTo(0.5,0.5);
    bJump.body.allowGravity = false;
    bJump.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    bJump.animations.play('spin');
}

// add coin..
addCoin = function(game,x,y){

    var coin = coins.create(x,y,'coin');
    coin.anchor.setTo(0.5,0.5);
    coin.body.allowGravity = false;
    coin.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    coin.animations.play('spin');
}
addCoinSilver = function(game,x,y){

    var coinSilver = coinsSilvers.create(x,y,'coinSilver');
    coinSilver.anchor.setTo(0.5,0.5);
    coinSilver.body.allowGravity = false;
    coinSilver.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    coinSilver.animations.play('spin');
}
// variable group for fly mob
var enemyGroup;

// variable group for land mob
var enemyGroup2;

var enemy;
var enemy2;
var enemyHP;
var healthValue;

// variable map level1
var map;
var layer;
var layer2;
var layer3;
var layer4;
var layer5;
var layer6;
var layer7;
var layer8;


var bJumpS;
var somebJump;
var imgbJump;
var bg;
var score = 0;
var scoreSilver = 0;
var getCoin;
var getCoinSilver;
var coins;
var coinsSilvers;
var someCoin;
var someCoinSilver;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var facing;
var imgCoin;
var imgCoinSilver;
var bush1;

var shootTime = 0;
var purple_ball;
var boom;
var menu;
var choiseLabel;
var w = 800, h = 600;
var bodyVelocity = -500;
var bodyGravity = 0;

Game.prototype = {

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Chargement...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {

        game.add.sprite(0, 0, 'nuit');
        game.add.existing(this.logo).scale.setTo(0.8);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);


    
        this.load.tilemap('map', 'assets/map/map01.json',null, Phaser.Tilemap.TILED_JSON);

        this.load.image('purple_ball', 'assets/sprites/purple_ball.png',20,20);
        
        this.load.spritesheet('player', 'assets/sprites/player.png',48,64);

        this.load.spritesheet('buttons', 'assets/sprites/buttons.png',193,71);

        this.load.spritesheet('pause', 'assets/sprites/pause.png',64,64);

        this.load.spritesheet('menu-pause', 'assets/sprites/menu-pause.png',450,450);

        this.load.spritesheet('coin', 'assets/sprites/coin.png',40,40);

        this.load.spritesheet('bJump', 'assets/sprites/tempocristblue.png',16,16);

        this.load.spritesheet('coinSilver', 'assets/sprites/coinSilver.png',40,40);

        this.load.spritesheet('mob', 'assets/sprites/mob.png',48,48);

        this.load.spritesheet('mob2', 'assets/sprites/mob2.png',48,48);

        this.load.spritesheet('explosion', 'assets/sprites/explosion.png',67,67);
  },

  create: function () {

    bg = this.add.tileSprite(0, 0, 2700, 750, "bg");

    this.stage.backgroundColor = '#16cad0';

        this.physics.arcade.gravity.y = 1400;
        
        map = this.add.tilemap('map');
        
        map.addTilesetImage('tileset', 'tileset');
        
        layer8 = map.createLayer('Roc');
        layer6 = map.createLayer('ArbreBig');
        layer7 = map.createLayer('TeteArbre');
        layer = map.createLayer('Principal');
        layer5 = map.createLayer('BackMush');
        layer3 = map.createLayer('FrontBack');
        layer2 = map.createLayer('Front');
        layer4 = map.createLayer('FrontMush');
        
        layer.resizeWorld();
      
        map.setCollisionBetween(0,10);

        setTileCollision(layer, [0,1,2,3,4,5,6,7,8,9,10], {
            top: true,
            bottom: false,
            left: false,
            right: false
        });


        // Initialize and create player

        player = this.add.sprite(100,560,'player');
        player.anchor.setTo(0.5,0.5);
        player.frame = 9;
        
        player.animations.add('left', [8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
        player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        player.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;
        player.body.checkCollision.up = false;
        player.body.bounce.y = 0.2;
        player.body.setSize(20, 32, 5, 16);


        // set controls
        
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
            up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        // Initialize img coins

        imgCoin = this.add.sprite(140,1, 'coin');
        imgCoin.scale.x = 0.8;
        imgCoin.scale.y = 0.8;
        imgCoin.fixedToCamera = true;
        imgCoin.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 6, true);
        imgCoin.animations.play('spin');

        imgCoinSilver = this.add.sprite(270,1, 'coinSilver');
        imgCoinSilver.scale.x = 0.8;
        imgCoinSilver.scale.y = 0.8;
        imgCoinSilver.fixedToCamera = true;
        imgCoinSilver.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 6, true);
        imgCoinSilver.animations.play('spin');


        // Create coins Icon

        getCoin = game.add.text(175,1, "x 0", { font: "25px Arial", fill: "#000" });
        getCoin.fontWeight = 'bold';
        getCoin.stroke = "#d6d6c2";
        getCoin.strokeThickness = 8;
        (getCoin).fixedToCamera = true;


        getCoinSilver = game.add.text(305, 1, "x 0", { font: "25px Arial", fill: "#000" });
        getCoinSilver.fontWeight = 'bold';
        getCoinSilver.stroke = "#d6d6c2";
        getCoinSilver.strokeThickness = 8;
        (getCoinSilver).fixedToCamera = true;

        // Jewel bonus jump

        bJumpS = game.add.group();
        bJumpS.enableBody = true;

        somebJump = new addTempoJump(game,480,100);


        // Initialize coins group

        coins = game.add.group();
        coins.enableBody = true;

        coinsSilvers = game.add.group();
        coinsSilvers.enableBody = true;


        // Create coins (addCoin : is copper coins, addCoinSilver : is silver coins)

        someCoin = new addCoin(game,250,420);
        addCoin(game,300,420);
        addCoin(game,350,420);
        addCoin(game,400,420);
        addCoin(game,615,530);
        addCoin(game,665,530);
        addCoin(game,935,330);
        addCoin(game,985,330);
        addCoin(game,1130,400);
        addCoin(game,1180,400);
        addCoin(game,1550,400);
        addCoin(game,1600,400);
        addCoin(game,1830,270);
        addCoin(game,1880,270);
        addCoin(game,1670,100);
        addCoin(game,1720,100);


        someCoinSilver = new addCoinSilver(game,30,90);


        // Initialize enemies group

        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        enemyGroup2 = game.add.group();
        enemyGroup2.enableBody = true;
        enemyGroup2.physicsBodyType = Phaser.Physics.ARCADE;


        // Create ennemies (EnemyMob : is fly mob, EnemyMob2 : is land mob)

        enemy = new EnemyMob(game,550,340);
        EnemyMob(game,850,240);
        EnemyMob(game,1380,240);

        enemy2 = new EnemyMob2(game,1050,560);
        EnemyMob2(game,1550,560);
        EnemyMob2(game,1850,496);
        EnemyMob2(game,2250,560);
        EnemyMob2(game,2160,240);
        EnemyMob2(game,445,112);



        this.SHOT_DELAY = 300; // 300 milliseconds (10 bullets/second)

        // you can set the speed (pixels/second) : this.BULLET_SPEED = 500; 
        this.NUMBER_OF_BULLETS = 10;


        // Initialize bullets group

        purple_ball = game.add.group();
        purple_ball.setAll('scale.x', 0.3);
        purple_ball.setAll('scale.y', 0.3);

      for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {

          // Create each bullet and add it to the group.
          var bullet = game.add.sprite(0, 0, 'purple_ball');
          purple_ball.add(bullet);

          // Set its pivot point to the center of the bullet
          bullet.anchor.setTo(0.5, 0.3);

          // Enable physics on the bullet
          this.physics.enable(bullet, Phaser.Physics.ARCADE);

          // Set its initial state to "dead".
          bullet.kill();
      }

        // this.game = (param) to the function create
        this.game = game;

        boom = game.add.group();
        boom.createMultiple(32, 'explosion');
        boom.forEach(setupGame, this);

        // Create a label to use as a button
      pause_label = game.add.sprite(750,5, 'pause');
      pause_label.fixedToCamera = true;
      pause_label.inputEnabled = true;
      pause_label.scale.x = 0.7;
        pause_label.scale.y = 0.7;
      pause_label.events.onInputUp.add(function () {
          // When the paus button is pressed, we pause the game
          game.paused = true;

          // Then add the menu
          menu = game.add.sprite(game.camera.x+400, game.camera.y+275, 'menu-pause');
          menu.anchor.setTo(0.5, 0.5);
          menu.scale.x = 0.8;
          menu.scale.y = 0.8;

          // And a label to illustrate which menu item was chosen. (This is not necessary)
          choiseLabel = game.add.text(game.camera.x+400, game.camera.y+520, 'Cliquez pour continuer', { font: '25px Arial', fill: '#fff' });
          choiseLabel.anchor.setTo(0.5, 0.5);
      });

      // Add a input listener that can help us return from being paused
      game.input.onDown.add(unpause, self);

      function unpause (event){

        // Only act if paused
        if(game.paused){

            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

            }
            else {
              // Remove the menu and the label
              menu.destroy();
              choiseLabel.destroy();

              // Unpause the game
              game.paused = false;
          }
        }   
    }

  },

  update:function(){

        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,enemyGroup,this.restartLevel, null, this);
        this.physics.arcade.collide(player,enemyGroup2,this.restartLevel, null, this);
        this.physics.arcade.overlap(purple_ball, enemyGroup, collisionHandler, null, this);
        this.physics.arcade.overlap(purple_ball, enemyGroup2, collisionHandler2, null, this);

        player.body.velocity.x = 0;

        if(controls.left.isDown){
            player.scale.setTo(1,1);
            player.body.velocity.x -= playerSpeed;

            if(facing !== 'left'){
              player.animations.play('left');
              facing = 'left';
            }
        }
        
        else if(controls.right.isDown){
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
            if(facing !== 'right'){
              player.animations.play('right');
              facing = 'right';
            }
        }

        else{

          if (facing !== 'idle'){
              player.animations.play("idle");
              if (facing == 'left'){
                  player.frame = 8;
              }
              else if (facing == 'right'){
                  player.frame = 9;
              }
          }
      }

      if (controls.up.isDown && player.body.onFloor() && this.time.now > jumpTimer){
          player.body.velocity.y = bodyVelocity;
          player.body.gravity.y = bodyGravity;
          jumpTimer = this.time.now + 650;
      }

        if(controls.shoot.isDown) {
          this.shootBall();
        }

        this.physics.arcade.overlap(player, coins, collectCoin, null, this);
        this.physics.arcade.overlap(player, coinsSilvers, collectCoinSilver, null, this);
        this.physics.arcade.overlap(player, bJumpS, collectbJump, null, this);

        enemyGroup.forEach(function(mob){
        mob.healthBar.setPosition(mob.body.x + 20, mob.body.y - 10);
        }, this);

        enemyGroup2.forEach(function(mob2){
        mob2.healthBar.setPosition(mob2.body.x + 20, mob2.body.y - 10);
        }, this);

  },

  resetPlayer:function(player){
    player.reset(100,560);
    //enemy1.mob.revive();

    for (var i = 0; i < enemyGroup.children.length; i++){
        enemyGroup.children[i].revive();
        }

        for (var i = 0; i < enemyGroup2.children.length; i++){
        enemyGroup2.children[i].revive();
        }

        for (var i = 0; i < coins.children.length; i++){
        coins.children[i].revive();
        }

        for (var i = 0; i < coinsSilvers.children.length; i++){
            coinsSilvers.children[i].revive();
        }

        score = 0;
        getCoin.text = "x " + score;

        scoreSilver = 0;
        getCoinSilver.text = "x " + scoreSilver;


  },

  restartLevel: function(){
    score = 0;
        scoreSilver = 0;
    this.game.state.restart();
  },

    shootBall:function(){

    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.

    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.time.now;

    // Get a dead bullet from the pool
    var bullet = purple_ball.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.

    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    if (facing == 'right') {
      bullet.reset(player.x, player.y);
    } 
    else {
      bullet.reset(player.x, player.y);
    }

    bullet.events.onOutOfBounds.add(resetBullet, this);
    bullet.body.allowGravity = false;
    bullet.lifespan=1000;

    // Shoot it

    bullet.body.velocity.y = 0;

    if (facing == 'right') {
        bullet.body.velocity.x = 400;
        bullet.scale.x = 1;
      }

      else {
        bullet.body.velocity.x = -400;
        bullet.scale.x = -1;
      }
    },
}

function collectbJump (player, bJumpS) {

    bJumpS.kill();
    bodyGravity = -500;
    bodyVelocity = -400;

    this.time.events.add(Phaser.Timer.SECOND * 2, function(){
      bodyGravity = 0;
      bodyVelocity = -500;
    });
}


function collectCoin (player, coins) {

    coins.kill();
    score ++;
    getCoin.text = "x " + score;
}

function collectCoinSilver (player, coinsSilvers) {

    scoreSilver ++;
    getCoinSilver.text = "x " + scoreSilver;
    coinsSilvers.kill();
}

function resetBullet (bullet) {

    bullet.kill();

}

function collisionHandler (bullet, flymob) {

  bullet.kill();

  if (flymob.enemyHP -= 1) {
    flymob.healthValue = flymob.healthValue - 33;
    flymob.healthBar.setPercent(flymob.healthValue);
    flymob.animations.add('monster',[0,1],7,true);
    flymob.animations.play('monster');
    flymob.mobTween = this.game.add.tween(flymob).to({
    y: flymob.y + 55

    }, 2000,'Linear',true,0,100,true);
  }

  if (flymob.enemyHP <= 0) {
    
      flymob.healthBar.kill();
      flymob.kill();
      addCoin(this.game,flymob.x,flymob.y);

      var explosion = boom.getFirstExists(false);
      explosion.reset(flymob.body.x + 30, flymob.body.y + 20);
      explosion.play('explosion', 32, false, true);
  }
    
}

function collisionHandler2 (bullet, mobland) {

  bullet.kill();

  if (mobland.enemyHP -= 1) {
    mobland.healthValue = mobland.healthValue - 50;
    mobland.healthBar.setPercent(mobland.healthValue);
    mobland.animations.add('monster2',[0,1],5,true);
    mobland.animations.play('monster2');
    mobland.mobTween = this.game.add.tween(mobland).to({
      
    x: mobland.x + 30

    }, 2000,'Linear',true,0,100,true);
  }

  if (mobland.enemyHP <= 0) {
    
      mobland.healthBar.kill();
      mobland.kill();

      var explosion = boom.getFirstExists(false);
      explosion.reset(mobland.body.x + 30, mobland.body.y + 20);
      explosion.play('explosion', 32, false, true);
  }
    
}

function setupGame (baddies) {

    baddies.anchor.x = 0.5;
    baddies.anchor.y = 0.5;
    baddies.animations.add('explosion');

}

function setTileCollision(mapLayer, idxOrArray, dirs) {
 
    var mFunc;
    if (idxOrArray.length) {

        mFunc = function(inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {

        mFunc = function(inp) {
            return inp === idxOrArray;
        };
    }
 

    var d = mapLayer.map.layers[mapLayer.index].data;
     
    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].length; j++) {
            var t = d[i][j];
            if (mFunc(t.index)) {
                 
                t.collideUp = dirs.top;
                t.collideDown = dirs.bottom;
                t.collideLeft = dirs.left;
                t.collideRight = dirs.right;
                 
                t.faceTop = dirs.top;
                t.faceBottom = dirs.bottom;
                t.faceLeft = dirs.left;
                t.faceRight = dirs.right;
                 
            }
        }
    }
}

