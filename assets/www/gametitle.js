var GameTitle = function(game){};


	
GameTitle.prototype = {
	
 
	create: function(){
		
	game.stage.backgroundColor = "#12A9AF";
	var txt = game.add.text(window.innerWidth / 2 - 100, window.innerHeight/2 , 'ကစားမယ္',{ fontSize: '10px', align:'center', fill: '#fff', stroke: "#535353", strokeThickness: 15 });
	txt.inputEnabled = true;
	txt.events.onInputOver.add(function(){ game.state.start("Main"); });
	txt.events.onInputOut.add(function(){ game.state.start("Main"); });
	txt.events.onInputDown.add(function(){ game.state.start("Main"); });
	txt.events.onInputUp.add(function(){ game.state.start("Main"); });
	
	var music = game.add.audio('myo');
	music.play();
	
	var player = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'dude');
	player.animations.add('walk', [1,2,3,4], 10, true);  // (key, framesarray, fps,repeat)
	player.animations.play('walk');
	
	
	this.stage.disableVisibilityChange = true;
   
    
  
    //game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 1000);
  
		
	},
	
	update: function(){
		
		
	},

	
};
