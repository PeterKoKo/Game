var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
	
	game.load.image('sky', 'assets/images/sky.png');
	game.load.image('aid', 'assets/images/firstaid.png');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('star', 'assets/images/star.png');
	game.load.image('diamond',  'assets/images/diamond.png');
	game.load.audio('music','1.mp3');
    game.load.spritesheet('dude', 'assets/images/dude.png', 50, 50);
    
	},

	create: function(){
		game.state.start("GameTitle");
	}
};
