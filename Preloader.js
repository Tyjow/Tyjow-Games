Game.Preloader = function(game){

	this.preloadBar = null;
};

Game.Preloader.prototype = {
	preload:function(){

		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5,0.5);

		this.time.advancedTimming = true;

		this.load.setPreloadSprite(this.preloadBar);

		//Load all assets (Charge tous les assets)
        
        this.load.tilemap('map', 'assets/map01.csv');
        
        this.load.image('tileset', 'assets/tileset.png');

        this.load.image('purple_ball', 'assets/purple_ball.png');
        
        this.load.spritesheet('player', 'assets/player.png',32,48);

        this.load.spritesheet('buttons', 'assets/buttons.png',193,71);

        this.load.spritesheet('coin', 'assets/coin.png',32,32);

        this.load.spritesheet('mob', 'assets/mob.png',64,64);

        this.load.image('titlescreen', 'assets/titlescreen.png');

        this.load.image('main-button', 'assets/main-button.png');
        
        
	},


	create:function(){

		this.state.start('MainMenu');

	}
};