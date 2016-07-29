EnemyMob = function(game,x,y) {

	var mob = enemyGroup.create(x,y, 'mob');
	mob.anchor.setTo(0.5,0.5);
	mob.name = 'flymob';
	game.physics.enable(mob, Phaser.Physics.ARCADE);
	mob.body.immovable = true;
	mob.body.collideWorldBounds = true;
	mob.body.setSize(50, 50, 0, 0);
	mob.body.allowGravity = false;
	mob.animations.add('monster',[0,1,2,3],10,true);
	mob.animations.play('monster');
    mob.healthBar = new HealthBar(game, {x: mob.body.x + 30, y: mob.body.y - 10, enemyHP});

	//this.myHealthBar.setPercent(100);

	mob.mobTween = game.add.tween(mob).to({
		// 25 veut dire 25 pixel (maintenant à 100)
		y: mob.y + 100

	}, 2000,'Linear',true,0,100,true);
}

addCoin = function(game,x,y){

    var coin = coins.create(x,y,'coin');
    coin.anchor.setTo(0.5,0.5);
    coin.body.allowGravity = false;
    coin.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    coin.animations.play('spin');
}

Game.Level1 = function(game) {};

var enemyGroup;
var enemy;
var enemyHP = 1;

var map;
var layer;
var layer2;
var layer3;
var layer4;
var layer5;
var layer6;
var layer7;
var layer8;

var bg;
var score = 0;
var getCoin;
var coins;
var someCoin;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var facing;
var imgCoin;
var bush1;

var shootTime = 0;
var purple_ball;
var boom;

Game.Level1.prototype = {
	create:function(game){

		//bg = this.add.tileSprite(0, 0, 1500, 600, "bg-nuit");
		bg = this.add.tileSprite(0, 0, 2700, 750, "bg");

		/*var backgroundScaleWidth = 1500 / bg.texture.frame.width;
		var backgroundScaleHeight = backgroundScaleWidth/16 * 9;*/

		//bg.scale.setTo(1, 1.1);

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
        //map.setTileIndexCallback(22, this.resetPlayer,this);

	    setTileCollision(layer, [0,1,2,3,4,5,6,7,8,9,10], {
	        top: true,
	        bottom: false,
	        left: false,
	        right: false
	    });

        player = this.add.sprite(100,560,'player');
        player.anchor.setTo(0.5,0.5);
        player.frame = 9;
        
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);
        //player.animations.add('idle', [0], 1, true);
        player.animations.add('left', [8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
        player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
        //player.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 10, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;
	    player.body.checkCollision.up = false;
	    //player.body.checkCollision.left = false;
	    //player.body.checkCollision.right = false;
        player.body.bounce.y = 0.2;
        player.body.setSize(20, 32, 5, 16);

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
            up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        imgCoin = this.add.sprite(30,30, 'coin');

        imgCoin.fixedToCamera = true;
        imgCoin.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        imgCoin.animations.play('spin');

        coins = game.add.group();
        coins.enableBody = true;

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
        
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        //enemyText = new HealthBar(game, {x: enemyGroup.x, y: enemyGroup, enemyHP});

        enemy = new EnemyMob(game,550,340);
        EnemyMob(game,850,240);
        EnemyMob(game,1380,240);



        getCoin = game.add.text(75, 35, "x 0", { font: "25px Arial", fill: "#000" });
        getCoin.fontWeight = 'bold';
        getCoin.stroke = "#d6d6c2";
        getCoin.strokeThickness = 8;
        //getCoin.setShadow(2, 2, "#66ee99", 2, false, true);

        (getCoin).fixedToCamera = true;

        purple_ball = game.add.group();
        purple_ball.enableBody = true;
        purple_ball.physicsBodyType = Phaser.Physics.ARCADE;

        /*for (var i = 0; i < 2; i++){

            var b = purple_ball.create(0, 0, 'purple_ball');
            b.name = 'purple_ball' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(resetBullet, this);
        }*/

        this.game = game;

        boom = game.add.group();
        boom.createMultiple(25, 'explosion');
        boom.forEach(setupGame, this);
	},

	update:function(){

        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,enemyGroup,this.resetPlayer);
        this.physics.arcade.overlap(purple_ball, enemyGroup, collisionHandler, null, this);

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
	            //facing = 'idle';
	        }
    	}

    	if (controls.up.isDown && player.body.onFloor() && this.time.now > jumpTimer){
	        player.body.velocity.y = -500;
	        jumpTimer = this.time.now + 650;
	        //player.animations.play('jump');
	    }

        if(controls.shoot.isDown) {
        	this.shootBall();
        }

        this.physics.arcade.overlap(player, coins, collectCoin, null, this);
        //this.physics.arcade.overlap(purple_ball, enemyGroup, enemyDies, null, this);

        /*if (enemyHP <= 0 && gameState) {
		    enemyDies(this.game);
		    gameState = false;
		}*/

        //updateEnemyHP(this.game);

        enemyGroup.forEach(function(mob){
        mob.healthBar.setPosition(mob.body.x + 30, mob.body.y - 10);
        }, this);

	},

	resetPlayer:function(){
		player.reset(100,560);
		//enemy1.mob.revive();

		for (var i = 0; i < enemyGroup.children.length; i++){
		  	enemyGroup.children[i].revive();
        }

        //enemyHP = 1;
        //gameState = true;
		
        for (var i = 0; i < coins.children.length; i++){
        	//for (var i in coins.children)
		  	coins.children[i].revive();
        }

        score = 0;
        getCoin.text = "x " + score;


	},

    /*shootBall:function(){

        if (this.time.now > shootTime){

            bullet = purple_ball.getFirstExists(false);

            if (bullet){

                bullet.reset(player.x + 6, player.y - 8);
                bullet.body.velocity.y = 0;
                bullet.body.allowGravity = false;
                purple_ball.setAll('scale.x', 0.7);
                purple_ball.setAll('scale.y', 0.7);
                shootTime = this.time.now + 150;
            }
            if (facing == 'right') {
              bullet.body.velocity.x = 600;
            }

            else {
              bullet.body.velocity.x = -600;
            }

            if (facing == 'idle') {
                bullet.body.velocity.x = 600;
            }
        }
    },*/

	shootBall:function(){

		if (shootTime < this.time.now) {
		    shootTime = this.time.now + 900;
		    var bullet = purple_ball.getFirstExists(false);

		    if (facing == 'right') {
		      bullet = purple_ball.create(player.x, player.y, 'purple_ball');
		    } 

		    else {
		      bullet = purple_ball.create(player.x, player.y, 'purple_ball');
		    }

		    this.physics.enable(bullet, Phaser.Physics.ARCADE);

		    //bullet.outOfBoundsKill = true;
            bullet.events.onOutOfBounds.add(resetBullet, this);
		    bullet.anchor.setTo(0.5, 0.5);
		    purple_ball.setAll('scale.x', 1.2);
        	purple_ball.setAll('scale.y', 1.2);
		    bullet.body.velocity.y = 0;
		    bullet.body.allowGravity = false;

		    if (facing == 'right') {
		      bullet.body.velocity.x = 600;
		    }

		    else {
		      bullet.body.velocity.x = -600;
		    }

		    /*if (facing == 'idle') {
                bullet.body.velocity.x = 600;
		    }*/
		}

	},
}

function collectCoin (player, coins) {

    coins.kill();
    score ++;
    getCoin.text = "x " + score;
}

function resetBullet (bullet) {

    bullet.kill();

}

function collisionHandler (bullet, flymob) {

    bullet.kill();
    flymob.healthBar.kill();
    flymob.kill();
    enemyHP --;

    var explosion = boom.getFirstExists(false);
    explosion.reset(flymob.body.x + 30, flymob.body.y + 20);
    explosion.play('explosion', 25, false, true);
}

function setupGame (baddies) {

    baddies.anchor.x = 0.5;
    baddies.anchor.y = 0.5;
    baddies.animations.add('explosion');

}

/*function hitEnemy(enemy,purple_ball) {
  purple_ball.kill();
  enemyHP --;
}*/

/*function updateEnemyHP(game) {
    enemyText.kill();
    //enemyText = new HealthBar(game, {x: mob.body.x + 30, y: mob.body.y - 10, enemyHP});
}*/

/*gameState = true;
function enemyDies (game){
  	enemyGroup.kill();
  	boom = game.add.sprite(mob.body.x, mob.body.y, 'explosion');
	game.physics.enable(boom, Phaser.Physics.ARCADE);
	boom.animations.add('death', null, 25);
	boom.animations.play('death');
	boom.body.allowGravity = false;
  	setTimeout(function() {game.world.remove(boom);},1000);
}*/

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