Game.MainMenu = function(game){

};

Game.MainMenu.prototype = {
	create:function(){


	},

	update:function(){


	},

	createButton:function(game,string,x,y,w,h,callback){
		var button1 = game.add.button(x,y,'button',callback,this,2,1,0);

		button1.anchor.setTo(0.5,0.5);

		
	}
};