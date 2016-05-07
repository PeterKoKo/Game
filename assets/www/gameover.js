/* var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){

	},

	restartGame: function(){
		this.game.state.start("GameTitle");
	}
	
}; */

var GameOver = function(game){};

GameOver.prototype = {
	
	
  preload: function () {
    //this.optionCount = 1;
    this.creditCount = 0;


  },

  addCredit: function(author, task) {
	var authorText = game.add.text(window.innerWidth/2, window.innerHeight + 50,author,{font: '16px Arial', fill: '#fff', align: 'center' , stroke: "#535353", strokeThickness: 7});//author, authorStyle);
    var taskText = game.add.text(window.innerWidth/2, window.innerHeight + 100, task, {font: '16px Arial', fill: '#ff2', align: 'center' , stroke: "#535353", strokeThickness: 7});//author, authorStyle);
     
	 
   	authorText.anchor.setTo(0.5);
   	taskText.anchor.setTo(0.5);
    game.add.tween(authorText).to( { y: game.world.height - window.innerHeight - 350 }, 30000, Phaser.Easing.Cubic.Out, true, this.creditCount * 3500);
    game.add.tween(taskText).to( { y: game.world.height - window.innerHeight -300 }, 30000, Phaser.Easing.Cubic.Out, true, this.creditCount * 3500);
    this.creditCount++;
  },

 

	create: function(){
		
		backToTitleBtn = game.add.button(100, window.innerHeight - 50, 'level_arrows', null, this, 0, 0, 0, 0);
    	backToTitleBtn.anchor.setTo(0.5, 0.5);
       	backToTitleBtn.fixedToCamera = true;
       	backToTitleBtn.events.onInputUp.add(function(){game.state.start("GameTitle"); alpha = 0.8;});
		backToTitleBtn.alpha = 1;
		
	this.stage.disableVisibilityChange = true;
   
    var bg = game.add.sprite(window.innerWidth / 2 - 200, window.innerHeight / 2, 'dude');
	bg.anchor.setTo(0.5,0.5);
	bg.scale.setTo(2.5,2.5);
	bg.animations.add('walk', [0,1,2,3,4], 5, true);  // (key, framesarray, fps,repeat)
	bg.animations.play('walk');
	
    this.addCredit('MK GAME ZONE', 'Powered By');
    this.addCredit('ကိုမ်ိဳး', 'Developed By');
    this.addCredit('KO MYO', 'MUSIC');
    this.addCredit('ထုတ္လုပ္သူ','မ်ိဳးကို');
    this.addCredit('', '');
    
    //game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 1000);
  
		
	},
	
	
	
};
