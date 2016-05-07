var GameTitle = function(game){};


	
GameTitle.prototype = {
	
 
	create: function(){
		
	game.stage.backgroundColor = "#0EB3F7";
	var letsPlayBtn = game.add.text(window.innerWidth/2 + 150, game.world.height -50 , 'ကစားမယ္',{ font: '20px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
	letsPlayBtn.inputEnabled = true;
	letsPlayBtn.events.onInputUp.add(function(){ game.state.start("LevelSelect"); });
	letsPlayBtn.anchor.setTo(0.5,0.5);
	letsPlayBtn.fixedToCamera = true;
	
	var toCreditBtn = game.add.text(window.innerWidth/2 - 150, game.world.height -50,' မွတ္တမ္း' ,  {font: '20px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
	toCreditBtn.inputEnabled = true;
	toCreditBtn.events.onInputUp.add(function(){ game.state.start("GameOver"); });
	toCreditBtn.anchor.setTo(0.5,0.5);
	//addColor("#fffccc", 6);
	toCreditBtn.fixedToCamera = true;
	
	var music = game.add.audio('myo');
	music.play();
	
	var player = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'dude');
	player.anchor.setTo(0.5, 0.5);
	player.animations.add('walk', [0,1,2,3,4,5,7,8,9,10,10,11,11,12,6,6,7,7,7,7,7,7], 5, true);  // (key, framesarray, fps,repeat)
	player.animations.play('walk');
	player.scale.setTo(2.5,2.5);
	
	this.stage.disableVisibilityChange = true;
   
    
		
	},
	
	update: function(){
		
		
	},

	
};
