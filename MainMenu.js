Game.MainMenu = function(game){

};

var titlescreen;
var bg;

Game.MainMenu.prototype = {
	create:function(game){

		this.createButton(game,'Jouez',game.world.centerX,game.world.centerY + 32, 300, 100, 
		function(){
			this.state.start('Level1');
		});

		this.createButton(game,'A Propos',game.world.centerX,game.world.centerY + 192, 300, 100, 
		function(){
			console.log('About');
		});

		titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 150, 'titlescreen');
		titlescreen.anchor.setTo(0.5,0.5);

		//bg = this.add.tileSprite(0, 0, 1500, 600, "bg-nuit");
		//bg = game.add.sprite(0, 0, 'bg-moon');

		this.stage.backgroundColor = '#000';

	},

	update:function(){


	},

	createButton:function(game,string,x,y,w,h,callback){
		var button1 = game.add.button(x,y,'main-button',callback,this,2,1,0);

		button1.anchor.setTo(0.5,0.5);
		button1.width = w;
		button1.height = h;

		var txt = game.add.text(button1.x,button1.y, string, {font: '20px Comic Sans MS', fill: '#fff', align: 'center'});

		txt.anchor.setTo(0.5,0.5);


	}
};