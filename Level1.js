EnemyMob = function(index,game,x,y) {

	this.mob = game.add.sprite(x,y, 'mob');
	this.mob.anchor.setTo(0.5,0.5);
	this.mob.name = index.toString();
	game.physics.enable(this.mob, Phaser.Physics.ARCADE);
	this.mob.body.immovable = true;
	this.mob.body.collideWorldBounds = true;
	this.mob.body.allowGravity = false;
	this.mob.animations.add('monster',[0,1,2,3],10,true);
	this.mob.animations.play('monster');

	this.mobTween = game.add.tween(this.mob).to({
		// 25 veut dire 25 pixel (maintenant à 100)
		y: this.mob.y + 100

	}, 2000,'Linear',true,0,100,true);
}

addCoin = function(game,x,y){
    
    var coins;

    coins = game.add.group();
    coins.enableBody = true;

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

var someCoin;
var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;

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
        player.animations.add('jump',[5],1, true);
        //player.animations.add('run',[3,4,5,6,7,8],7,true);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;
        
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
            up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
        };

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

        someCoin = new addCoin(game,250,410);
        //addCoin(game,300,410);
        //addCoin(game,350,410);

        enemy1 = new EnemyMob(0,game,player.x+450,player.y-280);
        
	},

	update:function(){
        
        this.physics.arcade.collide(player,layer);

        player.body.velocity.x = 0;
        
        if(controls.left.isDown){
            player.animations.play('left');
            player.scale.setTo(1,1);
            player.body.velocity.x -= playerSpeed;
        }
        
        if(controls.right.isDown){
            player.animations.play('right');
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;

        }

        if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){

            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
            player.body.velocity.x == 0;

        }

        if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
            player.animations.stop();
            player.frame = 5;
        }

        if(checkOverlap(player,enemy1.mob)) {
        	this.resetPlayer();

        }

        this.physics.arcade.overlap(player, coin, collectCoin, null, this);



	},

	resetPlayer:function(){
		player.reset(100,560);
		coin.revive();

	},

	/*getCoin:function(){
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
	}*/


}

function collectCoin (player, coin) {

    coin.kill();
}

function checkOverlap(spriteA, spriteB){

	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA,boundsB);

}