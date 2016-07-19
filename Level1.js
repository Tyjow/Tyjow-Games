EnemyMob = function(index,game,x,y) {

	this.mob = game.add.sprite(x,y, 'mob');
	this.mob.anchor.setTo(0.5,0.5);
	this.mob.name = index.toString();
	game.physics.enable(this.mob, Phaser.Physics.ARCADE);
	this.mob.body.immovable = true;
	this.mob.body.collideWorldBounds = true;
	this.mob.body.setSize(48, 48, 0, 0);
	this.mob.body.allowGravity = false;
	this.mob.animations.add('monster',[0,1,2,3],10,true);
	this.mob.animations.play('monster');

	this.mobTween = game.add.tween(this.mob).to({
		// 25 veut dire 25 pixel (maintenant à 100)
		y: this.mob.y + 100

	}, 2000,'Linear',true,0,100,true);
}

addCoin = function(game,x,y){

    coin = coins.create(x,y,'coin');
    coin.anchor.setTo(0.5,0.5);
    coin.body.allowGravity = false;
    coin.animations.add('spin',[0, 1, 2, 3, 4, 5], 10, true);
    coin.animations.play('spin');

}

var enemy1;

Game.Level1 = function(game) {};

var map;
var layer;

var score = 0;
var getCoin;
var coins;
var someCoin;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var facing = 'left';

//var fireRate = 100;
var shootTime = 0;
var purple_ball;

Game.Level1.prototype = {
	create:function(game){

		this.stage.backgroundColor = '#16cad0';
        
        this.physics.arcade.gravity.y = 1400;
        
        map = this.add.tilemap('map',64,64);
        
        map.addTilesetImage('tileset');
        
        layer = map.createLayer(0);
        
        layer.resizeWorld();
        
        map.setCollisionBetween(0,2);

        map.setTileIndexCallback(3, this.resetPlayer,this);

        // index du tile de la piece en tile //
        //map.setTileIndexCallback(4, this.getCoin,this);
        
        player = this.add.sprite(100,560,'player');
        player.anchor.setTo(0.5,0.5);
        
        //player.animations.add('idle',[0,1],1,true);
        //player.animations.add('jump',[5],1, true);
        //player.animations.add('run',[3,4,5,6,7,8],7,true);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;
        player.body.bounce.y = 0.2;
        player.body.setSize(20, 32, 5, 16);

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
            up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        coins = game.add.group();
        coins.enableBody = true;

        /*coin = this.add.sprite(250,480,'coin');
        coin.anchor.setTo(0.5,0.5);
        this.physics.arcade.enable(coin);
        coin.body.collideWorldBounds = true;
		coin.body.allowGravity = false;

        coins = game.add.group();
	    coins.enableBody = true;

	    coin = coins.create(250,410,'coin');
	    coin.anchor.setTo(0.5,0.5);
	    coin.body.allowGravity = false;

        if (coin == coin) {

            coins.create(280,410,'coin');
            coin.anchor.setTo(0.5,0.5);
            coin.body.allowGravity = false;
        }

	    coin.animations.add('spin',[0, 1, 2, 3, 4, 5], 10, true);
	    coin.animations.play('spin');

	    //  Here we'll create 1 of them evenly spaced apart
	    /*for (var i = 0; i < 1; i++){
	        //  Create a coin inside of the 'coins' group
	        var coin = coin.create(250,480,'coin');
            coin.anchor.setTo(0.5,0.5);

	        //  Let gravity do its thing
	        coin.body.gravity.y = 300;

	        //  This just gives each coin a slightly random bounce value
	        coin.body.bounce.y = 0.2 + Math.random() * 0.2;
	    }*/

        someCoin = new addCoin(game,250,420);
        addCoin(game,300,420);
        addCoin(game,350,420);
        addCoin(game,400,420);
        addCoin(game,615,510);
        addCoin(game,665,510);
        addCoin(game,935,370);
        addCoin(game,985,370);

        enemy1 = new EnemyMob(0,game,player.x+450,player.y-280);

        //var piece = this.add.sprite('coin'); piece + 

        getCoin = game.add.text(30, 30, "Pièce : 0", { font: "25px Arial", fill: "rgba(0, 0, 77, 0.8)" });
        getCoin.fontWeight = 'bold';
        getCoin.stroke = "#9494b8";
        getCoin.strokeThickness = 8;
        getCoin.setShadow(2, 2, "#66ee99", 2, false, true);

        (getCoin).fixedToCamera = true;

        purple_ball = game.add.group();
        purple_ball.enableBody = true;
        purple_ball.physicsBodyType = Phaser.Physics.ARCADE;
        purple_ball.createMultiple(5,'purple_ball');

        purple_ball.setAll('anchor.x', 0.5);
        purple_ball.setAll('anchor.y', 0.5);

        purple_ball.setAll('scale.x', 0.5);
        purple_ball.setAll('scale.y', 0.5);

        purple_ball.setAll('outOfBoundsKill', true);
        purple_ball.setAll('checkWorldBounds', true);
        
	},

	update:function(){
        
        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,enemy1.mob,this.reset);

        player.body.velocity.x = 0;
        
        if(controls.left.isDown){
            player.scale.setTo(1,1);
            player.body.velocity.x -= playerSpeed;
            if(facing != 'left'){
            	player.animations.play('left');
            	facing = 'left';
            }
        }
        
        else if(controls.right.isDown){
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
            if(facing != 'right'){
            	player.animations.play('right');
            	facing = 'right';
            }
        }

        else{

	        if (facing != 'idle'){
	            player.animations.stop();
	            if (facing == 'left'){
	                player.frame = 0;
	            }
	            else{
	                player.frame = 5;
	            }
	            facing = 'idle';
	        }
    	}

    	if (controls.up.isDown && player.body.onFloor() && this.time.now > jumpTimer){
	        player.body.velocity.y = -600;
	        jumpTimer = this.time.now + 750;
	    }

        /*if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){

            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
            player.body.velocity.x == 0;

        }*/

        /*if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
            player.animations.stop();
            //player.loadTexture('player', 0);
            //player.frame = 5;
        }*/

        if(checkOverlap(player,enemy1.mob)) {
        	this.resetPlayer();

        }

        if(controls.shoot.isDown) {
        	this.shootBall();
        }

        if(checkOverlap(purple_ball, enemy1.mob)) {
        	enemy1.mob.kill();
        }

        this.physics.arcade.overlap(player, coins, collectCoin, null, this);



	},

	resetPlayer:function(){
		player.reset(100,560);
        for (var i = 0; i < coins.children.length; i++)
        //for (var i in coins.children)
		  coins.children[i].revive();

        score = 0;
        getCoin.text = "Pièce : " + score;

        enemy1.mob.revive();

	},

	/*getCoin:function(){
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
	}*/

	shootBall:function(){
		if(this.time.now > shootTime){
			//shootTime = this.time.now + fireRate; 
			bally = purple_ball.getFirstExists(false);
			if(bally){
				bally.reset(player.x, player.y);

				bally.body.velocity.x = 600;
				bally.body.allowGravity = false;

				shootTime = this.time.now + 950;
			}
		}
	}

}

function collectCoin (player, coins) {

    coins.kill();
    score ++;
    getCoin.text = "Pièces : " + score;
}

function checkOverlap(spriteA, spriteB){

	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA,boundsB);

}