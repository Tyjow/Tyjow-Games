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
	//enemyText = game.add.text(this.mob.body.x, this.mob.body.y - 30, enemyHP, { font: "20px Arial", fill: "red" });
	enemyText = new HealthBar(game, {x: this.mob.body.x + 30, y: this.mob.body.y - 10, enemyHP});
    //this.myHealthBar = new HealthBar(game, enemyHP, {x: this.mob.body.x, y: this.mob.body.y});
    //var mobHP = this.myHealthBar.setPercent(100);
	//var enemyHP = mobHP;
	//var enemyText = this.myHealthBar;

	this.mobTween = game.add.tween(this.mob).to({
		// 25 veut dire 25 pixel (maintenant à 100)
		y: this.mob.y + 100

	}, 2000,'Linear',true,0,100,true);
}

addCoin = function(game,x,y){

    coin = coins.create(x,y,'coin');
    coin.anchor.setTo(0.5,0.5);
    coin.body.allowGravity = false;
    coin.animations.add('spin',[0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    coin.animations.play('spin');
}


var enemy1;
var enemyHP = 1;

Game.Level1 = function(game) {};

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

//var fireRate = 100;
var shootTime = 0;
var purple_ball;
//var mobDies;
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

        // set those box top tiles to only collide from above
	    setTileCollision(layer, [0,1,2,3,4,5,6,7,8,9,10], {
	        top: true,
	        bottom: false,
	        left: false,
	        right: false
	    });

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
        addCoin(game,615,530);
        addCoin(game,665,530);
        addCoin(game,935,330);
        addCoin(game,985,330);

        enemy1 = new EnemyMob(0,game,550,340);
        //EnemyMob(0,game,650,280);

        //mobDies = new enemyDies(game);



        //var piece = this.add.sprite('coin'); piece + 

        getCoin = game.add.text(75, 35, "x 0", { font: "25px Arial", fill: "#000" });
        getCoin.fontWeight = 'bold';
        getCoin.stroke = "#d6d6c2";
        getCoin.strokeThickness = 8;
        //getCoin.setShadow(2, 2, "#66ee99", 2, false, true);

        (getCoin).fixedToCamera = true;

        purple_ball = game.add.group();
        game.physics.enable(purple_ball, Phaser.Physics.ARCADE);
        /*purple_ball.enableBody = true;
        purple_ball.physicsBodyType = Phaser.Physics.ARCADE;
        purple_ball.createMultiple(5,'purple_ball');

        purple_ball.setAll('anchor.x', 0.5);
        purple_ball.setAll('anchor.y', 0.5);

        purple_ball.setAll('scale.x', 0.5);
        purple_ball.setAll('scale.y', 0.5);

        purple_ball.setAll('outOfBoundsKill', true);
        purple_ball.setAll('checkWorldBounds', true);*/
        this.game = game;
	},

	update:function(){
        
		//bg.tilePosition.x += 1;

        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,enemy1.mob,this.resetPlayer);

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
	        player.body.velocity.y = -500;
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

        /*if(checkOverlap(player,enemy1.mob)) {
        	this.resetPlayer();

        }*/

        if(controls.shoot.isDown) {
        	this.shootBall();
        }

        /*if(checkOverlap(purple_ball, enemy1.mob)) {
        	enemy1.mob.kill();
        }*/

        this.physics.arcade.overlap(player, coins, collectCoin, null, this);
        this.physics.arcade.collide(purple_ball, enemy1.mob, hitEnemy, null, this);

        if (enemyHP <= 0 && gameState) {
		    enemyDies(this.game);
		    gameState = false;
		}

        updateEnemyHP(this.game);

	},

	resetPlayer:function(){
		player.reset(100,560);
		enemy1.mob.revive();
        enemyHP = 1;
        gameState = true;
		
        for (var i = 0; i < coins.children.length; i++){
        	//for (var i in coins.children)
		  	coins.children[i].revive();
        }

        score = 0;
        getCoin.text = "x " + score;


	},

	/*getCoin:function(){
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
	}*/

	shootBall:function(){

		if (shootTime < this.time.now) {
		    shootTime = this.time.now + 900;
		    var bullet = purple_ball.getFirstExists(false);

		    if (facing == 'right') {
		      bullet = purple_ball.create(player.x, player.y, 'purple_ball');
		      //bullet = purple_ball.create(player.body.x + player.body.width / 2 + 20, player.body.y + player.body.height / 2 - 4, 'purple_ball');
		    } 

		    else {
		      bullet = purple_ball.create(player.x, player.y, 'purple_ball');
		      //bullet = purple_ball.create(player.body.x + player.body.width / 2 + 20, player.body.y + player.body.height / 2 - 4, 'purple_ball');
		    }

		    this.physics.enable(bullet, Phaser.Physics.ARCADE);

		    bullet.outOfBoundsKill = true;
		    bullet.anchor.setTo(0.5, 0.5);
		    purple_ball.setAll('scale.x', 0.7);
        	purple_ball.setAll('scale.y', 0.7);
		    bullet.body.velocity.y = 0;
		    bullet.body.allowGravity = false;

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






		/*if(this.time.now > shootTime){
			//shootTime = this.time.now + fireRate;
			shootTime = this.time.now + 950;
			bally = purple_ball.getFirstExists(false);

			if(bally){
				bally.reset(player.x, player.y);

				bally.body.velocity.x = 600;
				bally.body.allowGravity = false;
		
			}
		}*/
	}
}

function collectCoin (player, coins) {

    coins.kill();
    score ++;
    getCoin.text = "x " + score;
}

/*function checkOverlap(spriteA, spriteB){

	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA,boundsB);
}*/

function hitEnemy(enemy,purple_ball) {
  purple_ball.kill();
  //enemy1.mob.kill();
  enemyHP --;
}

function updateEnemyHP(game) {
  enemyText.kill();
  if (enemyHP != 0){
    //enemyText = game.add.text(enemy1.mob.body.x + 20, enemy1.mob.body.y - 20, enemyHP, { font: "20px Arial", fill: "red" });
    enemyText = new HealthBar(game, {x: enemy1.mob.body.x + 30, y: enemy1.mob.body.y - 10, enemyHP});
  }
}

gameState = true;
function enemyDies (game){
  	enemy1.mob.kill();
  	boom = game.add.sprite(enemy1.mob.body.x, enemy1.mob.body.y, 'explosion');
	game.physics.enable(boom, Phaser.Physics.ARCADE);
	boom.animations.add('death', null, 25);
	boom.animations.play('death');
	boom.body.allowGravity = false;
  	setTimeout(function() {game.world.remove(boom);},1000);
  //winText = game.add.text(game.width / 2 - 50, game.height / 2, "YOU WIN!", {font: "30px Arial", fill: "#FF0000"});
}

function setTileCollision(mapLayer, idxOrArray, dirs) {
 
    var mFunc; // tile index matching function
    if (idxOrArray.length) {
        // if idxOrArray is an array, use a function with a loop
        mFunc = function(inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {
        // if idxOrArray is a single number, use a simple function
        mFunc = function(inp) {
            return inp === idxOrArray;
        };
    }
 
    // get the 2-dimensional tiles array for this layer
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