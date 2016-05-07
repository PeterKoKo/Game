var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
	
	game.load.image('sky', 'assets/images/sky.png');
	game.load.image('aid', 'assets/images/firstaid.png');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('infobg', 'platform.png');
	game.load.image('star', 'assets/images/star.png');
	game.load.image('diamond',  'assets/images/diamond.png');
	game.load.image('fireball','assets/images/fireball.png');
	game.load.audio('myo','assets/bgm/Dangerous.mp3');
	game.load.script('ad','assets/states/Splash.js');
    game.load.spritesheet('dude', 'assets/images/dude.png', 50, 50);
	
	game.load.spritesheet("levels", "assets/images/levels.png", game.global.thumbWidth, game.global.thumbHeight);
	game.load.spritesheet("level_arrows", "assets/images/level_arrows.png", 48, 48);
	game.load.spritesheet("game", "assets/images/game.png", 200, 80);
	
	//gamepad buttons
  	game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png',32,64);
  	game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png',64,32);
   	game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png',48,48);
  	game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png',64,64);
   	game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png',64,64);
                
    
	},

	create: function(){
		game.state.start("GameTitle");
	}
};
